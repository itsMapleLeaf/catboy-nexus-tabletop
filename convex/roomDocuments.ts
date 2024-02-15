import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { addMinutes } from "date-fns"
import type { GenesysDiceRoll } from "~/genesys/types.js"
import { internalMutation, mutation, query } from "./_generated/server.js"
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

export const seedGenesysRolls = internalMutation({
	args: {
		roomId: v.id("rooms"),
	},
	async handler(ctx, args) {
		const now = Date.now()

		const testRolls = [...Array(50)].map(
			(_, index): GenesysDiceRoll => ({
				key: `${index}`,
				caption: `test roll ${index + 1}`,
				dice: [
					{ key: "proficiency", name: "proficiency", face: 1 },
					{ key: "ability", name: "ability", face: 2 },
					{ key: "boost", name: "boost", face: 3 },
					{ key: "challenge", name: "challenge", face: 4 },
					{ key: "difficulty", name: "difficulty", face: 5 },
					{ key: "setback", name: "setback", face: 6 },
				],
				rolledBy: "someone",
				rolledAt: addMinutes(now, -20 * index).toISOString(),
			}),
		)

		const existingRolls = ctx.db
			.query("roomDocuments")
			.fullTableScan()
			.filter((q) =>
				q.and(
					q.eq(q.field("roomId"), args.roomId),
					q.eq(q.field("collectionName"), "genesysDiceRolls"),
				),
			)

		for await (const doc of existingRolls) {
			await ctx.db.delete(doc._id)
		}

		for (const roll of testRolls) {
			await ctx.db.insert("roomDocuments", {
				roomId: args.roomId,
				collectionName: "genesysDiceRolls",
				value: roll,
			})
		}
	},
})
