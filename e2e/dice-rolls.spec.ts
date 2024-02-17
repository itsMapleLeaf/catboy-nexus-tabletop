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
	await page.getByRole("button", { name: "Add ability die" }).nth(1).click()
	await page.getByRole("button", { name: "Add ability die" }).nth(1).click()
	await page.getByRole("button", { name: "Add ability die" }).first().click()
	await page.getByRole("button", { name: "Add proficiency die" }).nth(1).click()
	await page.getByRole("button", { name: "Add proficiency die" }).nth(1).click()
	await page.getByRole("button", { name: "Remove proficiency die" }).click()
	await page
		.getByRole("button", { name: "Add difficulty die" })
		.nth(1)
		.dblclick()

	await page.getByRole("button", { name: "Roll" }).click()
	await expect(page.getByPlaceholder("Caption")).toBeEmpty()
	await expect(page.getByText("Dice rolled at")).toBeVisible()

	await page
		.getByRole("button", { name: "Add force die" })
		.first()
		.click({ clickCount: 3 })
	await page.getByPlaceholder("Caption").fill("destiny roll")
	await page.getByRole("button", { name: "Roll" }).click()
	await expect(page.getByPlaceholder("Caption")).toBeEmpty()
	await expect(
		page.locator("section", { hasText: "destiny roll" }).getByLabel("force"),
	).toHaveCount(3)

	const rollItem = () => page.locator("section", { hasText: "Dice rolled at" })

	await expect(rollItem().getByLabel("ability")).toHaveCount(3)
	await expect(rollItem().getByLabel("proficiency")).toHaveCount(1)
	await expect(rollItem().getByLabel("difficulty")).toHaveCount(2)
})
