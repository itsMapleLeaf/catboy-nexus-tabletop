import { expect, test } from "@playwright/test"
import { authStoragePath, signIn } from "./helpers/auth.ts"

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
})

// use a separate session for testing signout,
// so we don't invalidate the token for other tests
test.describe("when signing out", () => {
	test("redirects to landing", async ({ page }) => {
		await expect(async () => {
			await page.goto("/", { waitUntil: "load" })
			await signIn(page)
			await page.goto("/rooms")
			await page.getByLabel("Open user button").click({ timeout: 10_000 })
			await page
				.getByRole("menuitem", { name: "Sign out" })
				.click({ timeout: 10_000 })
			await page.waitForURL("/")
		}).toPass()
	})
})
