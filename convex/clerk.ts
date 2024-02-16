import { type WebhookEvent, createClerkClient } from "@clerk/remix/api.server"
import { Webhook } from "svix"
import { internal } from "./_generated/api.js"
import { httpAction } from "./_generated/server.js"

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
					`anonymous_gamer_${Math.ceil(Math.random() * 10_000)}`,
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
