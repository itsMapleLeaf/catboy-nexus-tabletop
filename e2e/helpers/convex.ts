import type { Page } from "@playwright/test"
import { ConvexHttpClient } from "convex/browser"

export async function createConvexClient(page: Page) {
	const token = await page.evaluate(
		(): Promise<string> =>
			// @ts-expect-error
			window.Clerk?.session.getToken({ template: "convex" }),
	)

	const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL as string)
	convex.setAuth(token)
	return convex
}
