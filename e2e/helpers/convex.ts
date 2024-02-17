import type { Page } from "@playwright/test"
import { ConvexHttpClient } from "convex/browser"

export async function createConvexClient(page: Page) {
	const token = await page.waitForFunction(
		(): Promise<string> =>
			// @ts-expect-error
			window.Clerk?.session?.getToken({ template: "convex" }),
	)

	const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL as string)
	convex.setAuth(await token.evaluate((t) => t))
	return convex
}
