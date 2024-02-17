import { type BrowserContext, type Page, expect } from "@playwright/test"
import { serverUrl } from "../../playwright.config.ts"
import { testEnv } from "./env.ts"

export const authStoragePath = "playwright/.state/auth.json"

export async function signIn(page: Page) {
	// we need to open the website first to sign in
	if (!page.url().startsWith(serverUrl)) {
		await page.goto("/", { waitUntil: "load" })
	}

	// sign in can fail sometimes from excessive navigations,
	// so just keep retrying it
	await expect(async () => {
		// @ts-expect-error
		await page.waitForFunction(() => window.Clerk?.isReady())

		await page.evaluate(async () => {
			// @ts-expect-error
			const res = await window.Clerk.client.signIn.create({
				identifier: testEnv.TEST_USERNAME,
				password: "password",
			})
			// @ts-expect-error
			await window.Clerk.setActive({
				session: res.createdSessionId,
			})
			return true
		})
	}).toPass({ timeout: 5_000 })
}

export async function signOut(context: BrowserContext, page: Page) {
	await context.clearCookies()
	await page.evaluate(() => localStorage.clear())
}
