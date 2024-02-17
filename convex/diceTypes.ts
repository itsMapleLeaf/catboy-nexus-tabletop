import { v } from "convex/values"
import { query } from "./_generated/server"
import { requireDoc } from "./helpers.ts"

export const get = query({
	args: {
		diceTypeId: v.string(),
	},
	async handler(ctx, args) {
		return await requireDoc(ctx, "diceTypes", args.diceTypeId)
	},
})

export const list = query({
	async handler(ctx, args) {
		return ctx.db.query("diceTypes").collect()
	},
})
