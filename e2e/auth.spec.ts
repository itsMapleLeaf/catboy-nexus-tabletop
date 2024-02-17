import { expect, test } from "@playwright/test"
import { authStoragePath } from "./helpers/auth.ts"

test("redirects to landing when signed out", async ({ page }) => {
	await page.goto("/")
	await page.waitForURL("/")
	await expect(page.getByTestId("landing-title")).toBeVisible()

	await page.goto("/rooms")
	await page.waitForURL("/")
	await expect(page.getByTestId("landing-title")).toBeVisible()
})

test.describe("when signed in", () => {
	test.use({ storageState: authStoragePath })

	test("redirects to room list", async ({ page, context }) => {
		await page.goto("/")
		await page.waitForURL("/rooms")

		await page.goto("/rooms")
		await page.waitForURL("/rooms")
	})

	test("signing out leads to landing", async ({ page }) => {
		await page.goto("/rooms")
		await page.getByLabel("Open user button").click()
		await page.getByRole("menuitem", { name: "Sign out" }).click()
		await page.waitForURL("/")
	})
})
