import {
	customCtx,
	customMutation,
	customQuery,
} from "convex-helpers/server/customFunctions.js"
import { type QueryCtx, mutation, query } from "./_generated/server.js"

export async function requireAuth(ctx: QueryCtx) {
	const identity = await ctx.auth.getUserIdentity()
	if (!identity) {
		throw new Error("Not logged in")
	}

	const user = await ctx.db
		.query("users")
		.withIndex("by_clerk_subject", (q) =>
			q.eq("clerkSubject", identity.subject),
		)
		.unique()

	if (!user) {
		throw new Error("User not initialized")
	}

	return { user, identity }
}

export const authQuery = customQuery(query, customCtx(requireAuth))
export const authMutation = customMutation(mutation, customCtx(requireAuth))
