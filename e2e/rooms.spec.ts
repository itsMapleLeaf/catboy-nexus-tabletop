import test, { expect } from "@playwright/test"
import { api } from "convex/_generated/api.js"
import type { ConvexHttpClient } from "convex/browser"
import { authStoragePath } from "./helpers/auth.ts"
import { createConvexClient } from "./helpers/convex.ts"

let convex: ConvexHttpClient

test.use({
	storageState: authStoragePath,
})

test.beforeAll(async ({ page }) => {
	await page.goto("/")
	convex = await createConvexClient(page)
})

test.beforeEach(async ({ page }) => {
	await convex.mutation(api.rooms.removeAll, {})
	await page.goto("/rooms")
})

test("shows an empty state when there are no rooms", async ({ page }) => {
	await page.waitForSelector('[data-testid="empty-state"]')
})

test.describe("with existing rooms", () => {
	const mockRooms = [
		{ title: "only real gamers allowed" },
		{ title: "catboy supremacy" },
	]

	test.beforeEach(async ({ page }) => {
		for (const room of mockRooms) {
			await convex.mutation(api.rooms.create, room)
		}
	})

	test("lists rooms", async ({ page }) => {
		for (const room of mockRooms) {
			await expect
				.soft(page.getByTestId("room-list-item").getByText(room.title))
				.toBeVisible()
		}
	})

	test("creating a room navigates to the room page", async ({ page }) => {
		const roomTitle = "my awesome and amazing new room"

		await page.getByRole("button", { name: "New Room" }).click()

		await expect.soft(page.getByLabel(/room title/i)).toBeFocused()
		await page.getByLabel(/room title/i).fill(roomTitle)
		await page.getByRole("button", { name: "Create" }).click()

		await expect.soft(page).toHaveURL(/\/rooms\/\w+/)
		await expect
			.soft(page.getByRole("heading", { name: roomTitle }))
			.toBeVisible()
	})

	test("new rooms show up first in the list", async ({ page }) => {
		const roomTitle = "my awesome and amazing new room"
		await convex.mutation(api.rooms.create, { title: roomTitle })
		await expect(page.getByTestId("room-list-item").first()).toHaveText(
			roomTitle,
		)
	})
})
