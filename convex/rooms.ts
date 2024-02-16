import { customMutation } from "convex-helpers/server/customFunctions.js"
import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { raise } from "~/helpers/errors.js"
import { mutation } from "./_generated/server.js"
import { authMutation, authQuery, requireAuth } from "./auth.js"
import { requireValidId } from "./helpers.js"
import { requireDoc } from "./helpers.js"

const roomOwnerMutation = customMutation(mutation, {
	args: {
		roomId: v.string(),
	},
	async input(ctx, args) {
		const { user } = await requireAuth(ctx)
		const room = await requireDoc(ctx, "rooms", args.roomId)
		if (room.owner !== user._id) {
			raise("You don't own this room")
		}
		return { ctx: { room }, args: {} }
	},
})

export const get = authQuery({
	args: {
		roomId: v.string(),
	},
	async handler(ctx, args) {
		return await ctx.db.get(requireValidId(ctx, "rooms", args.roomId))
	},
})

export const list = authQuery({
	args: {
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, { paginationOpts }) {
		return ctx.db
			.query("rooms")
			.withIndex("by_owner", (q) => q.eq("owner", ctx.user._id))
			.paginate(paginationOpts)
	},
})

export const create = authMutation({
	args: {
		title: v.string(),
	},
	async handler(ctx, args) {
		return await ctx.db.insert("rooms", {
			...args,
			owner: ctx.user._id,
		})
	},
})

export const update = roomOwnerMutation({
	args: {
		title: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.patch(ctx.room._id, { title: args.title })
	},
})

export const remove = roomOwnerMutation({
	args: {},
	async handler(ctx) {
		await ctx.db.delete(ctx.room._id)
	},
})
