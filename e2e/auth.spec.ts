import { expect, test } from "@playwright/test"
import { signIn } from "./helpers/auth"
import { signOut } from "./helpers/auth"

test("auth redirects", async ({ page, context }) => {
	await page.goto("/")

	await expect(page.getByTestId("landing-title")).toBeVisible()
	await expect(page.getByText("Sign In")).toBeVisible()

	await signIn(page)

	await page.goto("/")
	await page.waitForURL("/rooms")

	await signOut(context, page)

	await page.reload()
	await page.waitForURL("/")
})