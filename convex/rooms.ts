import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { raise } from "~/helpers/errors.js"
import type { Doc, Id } from "./_generated/dataModel.js"
import { mutation, query } from "./_generated/server.js"
import { requireValidId } from "./helpers.js"
import { requireDoc } from "./helpers.js"
import { requireIdentityUser } from "./users.js"

export const get = query({
	args: {
		id: v.string(),
	},
	async handler(ctx, args) {
		return await ctx.db.get(requireValidId(ctx, "rooms", args.id))
	},
})

export const list = query({
	args: {
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, { paginationOpts }) {
		const user = await requireIdentityUser(ctx)
		return (
			user &&
			ctx.db
				.query("rooms")
				.withIndex("by_owner", (q) => q.eq("owner", user._id))
				.paginate(paginationOpts)
		)
	},
})

export const upsert = mutation({
	args: {
		id: v.optional(v.string()),
		title: v.string(),
	},
	async handler(ctx, { id: idArg, ...data }) {
		const user = await requireIdentityUser(ctx)
		let id: Id<"rooms">
		if (idArg) {
			id = requireValidId(ctx, "rooms", idArg)
			requireOwnedRoom(await requireDoc(ctx, "rooms", id), user)
			await ctx.db.patch(id, data)
		} else {
			id = await ctx.db.insert("rooms", {
				...data,
				owner: user._id,
			})
		}
		return id
	},
})

export const remove = mutation({
	args: {
		id: v.string(),
	},
	async handler(ctx, args) {
		const id = requireValidId(ctx, "rooms", args.id)
		requireOwnedRoom(
			await requireDoc(ctx, "rooms", id),
			await requireIdentityUser(ctx),
		)
		await ctx.db.delete(id)
	},
})

function requireOwnedRoom(gamemode: Doc<"rooms">, user: { _id: Id<"users"> }) {
	if (gamemode.owner !== user._id) {
		raise("You don't own this room")
	}
}
