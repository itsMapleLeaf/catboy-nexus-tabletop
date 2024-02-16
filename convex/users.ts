import { v } from "convex/values"
import type { Id } from "./_generated/dataModel"
import { internalMutation } from "./_generated/server"

export const upsert = internalMutation({
	args: {
		clerkSubject: v.string(),
		name: v.string(),
	},
	async handler(ctx, { clerkSubject, ...data }) {
		const doc = await ctx.db
			.query("users")
			.withIndex("by_clerk_subject", (q) => q.eq("clerkSubject", clerkSubject))
			.unique()

		let id: Id<"users">
		if (doc) {
			await ctx.db.patch(doc._id, data)
			id = doc._id
		} else {
			id = await ctx.db.insert("users", { clerkSubject, ...data })
		}
		return id
	},
})

export const remove = internalMutation({
	args: {
		clerkSubject: v.string(),
	},
	async handler(ctx, { clerkSubject }) {
		const doc = await ctx.db
			.query("users")
			.withIndex("by_clerk_subject", (q) => q.eq("clerkSubject", clerkSubject))
			.unique()

		if (doc) {
			await ctx.db.delete(doc._id)
		}
	},
})
