import type { UserIdentity } from "convex/server"
import { v } from "convex/values"
import type { Id } from "./_generated/dataModel"
import { type QueryCtx, internalMutation } from "./_generated/server"

export const upsert = internalMutation({
	args: {
		clerkId: v.string(),
		name: v.string(),
	},
	async handler(ctx, { clerkId, ...data }) {
		const doc = await ctx.db
			.query("profiles")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
			.unique()

		let id: Id<"profiles">
		if (doc) {
			await ctx.db.patch(doc._id, data)
			id = doc._id
		} else {
			id = await ctx.db.insert("profiles", { clerkId, ...data })
		}
		return id
	},
})

export const remove = internalMutation({
	args: {
		clerkId: v.string(),
	},
	async handler(ctx, { clerkId }) {
		const doc = await ctx.db
			.query("profiles")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
			.unique()

		if (doc) {
			await ctx.db.delete(doc._id)
		}
	},
})

export async function getUser(ctx: QueryCtx, identity: UserIdentity) {
	return await ctx.db
		.query("profiles")
		.withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
		.unique()
}
