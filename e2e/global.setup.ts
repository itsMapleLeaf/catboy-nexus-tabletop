import { test as setup } from "@playwright/test"
import { authStoragePath, signIn } from "./helpers/auth.ts"

setup("auth", async ({ page }) => {
	await page.goto("/", { waitUntil: "load" })
	await signIn(page)
	await page.context().storageState({ path: authStoragePath })
})
