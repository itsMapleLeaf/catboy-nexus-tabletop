import { type UserIdentity, paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { raise } from "~/helpers/errors.js"
import type { Doc } from "./_generated/dataModel.js"
import { mutation, query } from "./_generated/server.js"
import { requireIdentity } from "./auth.js"
import { requireValidId } from "./helpers.js"
import { requireDoc } from "./helpers.js"

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
		const identity = await requireIdentity(ctx)
		return ctx.db
			.query("rooms")
			.withIndex("by_owner", (q) => q.eq("owner", identity.subject))
			.paginate(paginationOpts)
	},
})

export const upsert = mutation({
	args: {
		id: v.optional(v.string()),
		title: v.string(),
	},
	async handler(ctx, { id: idArg, ...data }) {
		const identity = await requireIdentity(ctx)

		if (idArg) {
			const id = requireValidId(ctx, "rooms", idArg)
			requireOwnedRoom(await requireDoc(ctx, "rooms", id), identity)
			return await ctx.db.patch(id, data)
		}

		return await ctx.db.insert("rooms", {
			...data,
			owner: identity.subject,
		})
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
			await requireIdentity(ctx),
		)
		await ctx.db.delete(id)
	},
})

function requireOwnedRoom(gamemode: Doc<"rooms">, identity: UserIdentity) {
	if (gamemode.owner !== identity.subject) {
		raise("You don't own this room")
	}
}
