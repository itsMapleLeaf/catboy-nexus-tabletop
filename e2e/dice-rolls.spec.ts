import { expect, test } from "@playwright/test"
import { api } from "convex/_generated/api.js"
import type { ConvexHttpClient } from "convex/browser"
import { authStoragePath } from "./helpers/auth.ts"
import { createConvexClient } from "./helpers/convex.ts"

test.use({
	storageState: authStoragePath,
})

test.beforeEach(async ({ page }) => {
	await page.goto("/rooms")
})

let convex: ConvexHttpClient
test.beforeEach(async ({ page }) => {
	convex = await createConvexClient(page)
	await convex.mutation(api.rooms.removeAll, {})
	const roomId = await convex.mutation(api.rooms.create, {
		title: "catboy supremacy",
	})
	await page.goto(`/rooms/${roomId}`)
})

test("submitting the dice roll form should add a dice roll with the selected dice", async ({
	page,
}) => {
	await page.getByRole("button", { name: "Add Ability die" }).nth(1).click()
	await page.getByRole("button", { name: "Add Ability die" }).nth(1).click()
	await page.getByRole("button", { name: "Add Ability die" }).first().click()
	await page.getByRole("button", { name: "Add Proficiency die" }).nth(1).click()
	await page.getByRole("button", { name: "Add Proficiency die" }).nth(1).click()
	await page.getByRole("button", { name: "Remove Proficiency die" }).click()
	await page
		.getByRole("button", { name: "Add Difficulty die" })
		.nth(1)
		.dblclick()

	await page.getByRole("button", { name: "Roll" }).click()
	await expect(page.getByLabel("Caption")).toBeEmpty()
	await expect(page.getByText("Dice rolled at")).toBeVisible()

	await page
		.getByRole("button", { name: "Add Force die" })
		.first()
		.click({ clickCount: 3 })
	await page.getByLabel("Caption").fill("destiny roll")
	await page.getByRole("button", { name: "Roll" }).click()
	await expect(page.getByLabel("Caption")).toBeEmpty()
	await expect(
		page.locator("section", { hasText: "destiny roll" }).getByLabel("Force"),
	).toHaveCount(3)

	const rollItem = () => page.locator("section", { hasText: "Dice rolled at" })

	await expect(rollItem().getByLabel("Ability")).toHaveCount(3)
	await expect(rollItem().getByLabel("Proficiency")).toHaveCount(1)
	await expect(rollItem().getByLabel("Difficulty")).toHaveCount(2)
})
