import { raise } from "~/helpers/errors.js"
import type { QueryCtx } from "./_generated/server.js"

export async function requireIdentity(ctx: QueryCtx) {
	const identity = await ctx.auth.getUserIdentity()
	if (!identity) {
		raise("Not logged in")
	}
	return identity
}
