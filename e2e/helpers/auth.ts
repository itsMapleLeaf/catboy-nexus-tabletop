import { type BrowserContext, type Page, expect } from "@playwright/test"
import { testEnv } from "./env.ts"

export const authStoragePath = "playwright/.state/auth.json"

export async function signIn(page: Page) {
	// sign in can fail sometimes from excessive navigations,
	// so just keep retrying it
	await expect(async () => {
		// @ts-expect-error
		await page.waitForFunction(() => window.Clerk?.isReady())

		await page.evaluate(
			async ({ identifier }) => {
				// @ts-expect-error
				const res = await window.Clerk.client.signIn.create({
					identifier,
					password: "password",
				})
				// @ts-expect-error
				await window.Clerk.setActive({
					session: res.createdSessionId,
				})
				return true
			},
			{ identifier: testEnv.TEST_USERNAME },
		)
	}).toPass({ timeout: 5_000 })
}

export async function signOut(context: BrowserContext, page: Page) {
	await context.clearCookies()
	await page.evaluate(() => localStorage.clear())
}
