import { v } from "convex/values"
import { query } from "./_generated/server"
import { requireValidId } from "./helpers.ts"

export const get = query({
	args: {
		diceSetId: v.string(),
	},
	async handler(ctx, args) {
		return await ctx.db.get(requireValidId(ctx, "diceSets", args.diceSetId))
	},
})

export const getAll = query({
	async handler(ctx) {
		return await ctx.db.query("diceSets").collect()
	},
})
