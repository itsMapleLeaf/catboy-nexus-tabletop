import { type UserIdentity, paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { raise } from "~/helpers/errors.js"
import type { Doc, Id } from "./_generated/dataModel.js"
import { type QueryCtx, mutation, query } from "./_generated/server.js"
import { requireIdentity } from "./auth.js"

export const get = query({
	args: {
		id: v.id("rooms"),
	},
	async handler(ctx, args) {
		return ctx.db.get(args.id)
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
		id: v.optional(v.id("rooms")),
		title: v.string(),
	},
	async handler(ctx, { id, ...data }) {
		const identity = await requireIdentity(ctx)

		if (id) {
			requireOwnedGame(await requireGame(ctx, id), identity)
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
		id: v.id("rooms"),
	},
	async handler(ctx, args) {
		requireOwnedGame(
			await requireGame(ctx, args.id),
			await requireIdentity(ctx),
		)
		await ctx.db.delete(args.id)
	},
})

async function requireGame(ctx: QueryCtx, id: Id<"rooms">) {
	const existing = await ctx.db.get(id)
	return existing ?? raise(`Gamemode with ID "${id}" not found`)
}

function requireOwnedGame(gamemode: Doc<"rooms">, identity: UserIdentity) {
	if (gamemode.owner !== identity.subject) {
		raise("You don't own this room")
	}
}
