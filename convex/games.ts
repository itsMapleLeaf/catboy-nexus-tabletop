import type { UserIdentity } from "convex/server"
import { v } from "convex/values"
import { raise } from "~/helpers/errors.js"
import type { Doc, Id } from "./_generated/dataModel.js"
import { type QueryCtx, mutation, query } from "./_generated/server.js"
import { requireIdentity } from "./auth.js"

export const get = query({
	args: {
		id: v.id("games"),
	},
	async handler(ctx, args) {
		return ctx.db.get(args.id)
	},
})

export const list = query({
	args: {
		numItems: v.optional(v.number()),
		cursor: v.union(v.id("games"), v.null()),
	},
	async handler(ctx, { numItems = 20, cursor }) {
		const identity = await requireIdentity(ctx)
		return ctx.db
			.query("games")
			.withIndex("by_owner", (q) => q.eq("owner", identity.subject))
			.paginate({ numItems, cursor })
	},
})

export const upsert = mutation({
	args: {
		id: v.optional(v.id("games")),
		name: v.string(),
	},
	async handler(ctx, { id, ...data }) {
		const identity = await requireIdentity(ctx)
		if (!id) {
			await ctx.db.insert("games", {
				...data,
				owner: identity.subject,
			})
		} else {
			requireOwnedGame(await requireGame(ctx, id), identity)
			await ctx.db.patch(id, data)
		}
	},
})

export const remove = mutation({
	args: {
		id: v.id("games"),
	},
	async handler(ctx, args) {
		requireOwnedGame(
			await requireGame(ctx, args.id),
			await requireIdentity(ctx),
		)
		await ctx.db.delete(args.id)
	},
})

async function requireGame(ctx: QueryCtx, id: Id<"games">) {
	const existing = await ctx.db.get(id)
	return existing ?? raise(`Gamemode with ID "${id}" not found`)
}

function requireOwnedGame(gamemode: Doc<"games">, identity: UserIdentity) {
	if (gamemode.owner !== identity.subject) {
		raise("You don't own this gamemode")
	}
}
