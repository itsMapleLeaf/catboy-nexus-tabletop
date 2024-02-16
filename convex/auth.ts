import { type WebhookEvent, createClerkClient } from "@clerk/remix/api.server"
import {
	customCtx,
	customMutation,
	customQuery,
} from "convex-helpers/server/customFunctions.js"
import { Webhook } from "svix"
import { internal } from "./_generated/api.js"
import {
	type QueryCtx,
	httpAction,
	mutation,
	query,
} from "./_generated/server.js"
import { getUser } from "./users.js"

export async function requireAuth(ctx: QueryCtx) {
	const identity = await ctx.auth.getUserIdentity()
	if (!identity) throw new Error("Not logged in")

	const user = await getUser(ctx, identity)
	if (!user) throw new Error("User not initialized")

	return { user, identity }
}

export const authQuery = customQuery(query, customCtx(requireAuth))
export const authMutation = customMutation(mutation, customCtx(requireAuth))

export const isReady = query({
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity()
		const user = identity && (await getUser(ctx, identity))
		return !!user
	},
})

export const handleClerkWebhook = httpAction(async (ctx, request) => {
	const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string)

	const event = webhook.verify(
		await request.text(),
		Object.fromEntries(request.headers),
	) as WebhookEvent

	switch (event.type) {
		case "user.created":
		case "user.updated": {
			await ctx.runMutation(internal.users.upsert, {
				clerkSubject: event.data.id,
				name: event.data.username || event.data.first_name,
			})
			break
		}

		case "session.created": {
			const client = createClerkClient({
				secretKey: process.env.CLERK_SECRET_KEY,
			})
			const user = await client.users.getUser(event.data.user_id)
			await ctx.runMutation(internal.users.upsert, {
				clerkSubject: user.id,
				name:
					user.username ||
					user.firstName ||
					`anonymous_gamer_${Math.ceil(Math.random() * 10000)}`,
			})
			break
		}

		case "user.deleted": {
			if (event.data.id) {
				await ctx.runMutation(internal.users.remove, {
					clerkSubject: event.data.id,
				})
			}
			break
		}

		default: {
			return Response.json(
				{
					message: `Unhandled event type: ${event.type}`,
					event,
				},
				{ status: 400 },
			)
		}
	}

	return new Response()
})
