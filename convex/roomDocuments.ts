import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { mutation, query } from "./_generated/server.js"
import { requireIdentity } from "./auth.js"
import { requireValidId } from "./helpers.js"

export const get = query({
	args: {
		id: v.string(),
	},
	async handler(ctx, args) {
		return await ctx.db.get(requireValidId(ctx, "roomDocuments", args.id))
	},
})

export const list = query({
	args: {
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, { paginationOpts }) {
		return ctx.db.query("roomDocuments").paginate(paginationOpts)
	},
})

export const create = mutation({
	args: {
		roomId: v.id("rooms"),
		collectionName: v.string(),
		value: v.any(),
	},
	async handler(ctx, data) {
		await requireIdentity(ctx)
		return await ctx.db.insert("roomDocuments", data)
	},
})

export const update = mutation({
	args: {
		id: v.id("roomDocuments"),
		value: v.any(),
	},
	async handler(ctx, { id, value }) {
		await requireIdentity(ctx)
		return await ctx.db.patch(id, { value })
	},
})

export const remove = mutation({
	args: {
		id: v.string(),
	},
	async handler(ctx, args) {
		const id = requireValidId(ctx, "roomDocuments", args.id)
		await requireIdentity(ctx)
		await ctx.db.delete(id)
	},
})
