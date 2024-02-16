import {
	customCtx,
	customMutation,
	customQuery,
} from "convex-helpers/server/customFunctions.js"
import { type QueryCtx, mutation, query } from "./_generated/server.js"
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
