import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { randomInt } from "~/helpers/math.ts"
import { query } from "./_generated/server"
import { authMutation } from "./auth.ts"
import { requireDoc, requireValidId } from "./helpers.ts"
import type { RolledDie } from "./schema.ts"

export const list = query({
	args: {
		roomId: v.string(),
		paginationOpts: paginationOptsValidator,
	},
	async handler(ctx, args) {
		const roomId = requireValidId(ctx, "rooms", args.roomId)
		return ctx.db
			.query("diceRolls")
			.withIndex("by_room", (q) => q.eq("roomId", roomId))
			.order("desc")
			.paginate(args.paginationOpts)
	},
})

export const create = authMutation({
	args: {
		roomId: v.string(),
		caption: v.optional(v.string()),
		diceInput: v.array(v.object({ type: v.string() })),
	},
	async handler(ctx, args) {
		const roomId = requireValidId(ctx, "rooms", args.roomId)
		const diceTypeIds = new Set(args.diceInput.map((die) => die.type))

		const diceTypes = await Promise.all(
			[...diceTypeIds].map((id) => requireDoc(ctx, "diceTypes", id)),
		)

		const diceTypesById = new Map(
			diceTypes.flatMap((d) => d ?? []).map((type) => [type._id, type]),
		)

		const rolledDice: RolledDie[] = args.diceInput.flatMap((die) => {
			const type = diceTypesById.get(requireValidId(ctx, "diceTypes", die.type))
			if (!type) {
				console.warn(`Invalid dice type "${die.type}"`, args)
				return []
			}
			return {
				key: crypto.randomUUID(),
				type: type._id,
				face: randomInt(1, type.faces.length) - 1,
			}
		})

		return ctx.db.insert("diceRolls", {
			roomId,
			caption: args.caption,
			rolledBy: ctx.identity.subject,
			rolledDice,
		})
	},
})

export const remove = authMutation({
	args: {
		rollId: v.string(),
	},
	async handler(ctx, args) {
		const roll = await requireDoc(ctx, "diceRolls", args.rollId)
		const room = await requireDoc(ctx, "rooms", roll.roomId)
		if (
			roll.rolledBy !== ctx.identity.subject &&
			ctx.identity.subject !== room.owner
		) {
			throw new Error("You can only remove your own rolls")
		}
		return ctx.db.delete(roll._id)
	},
})
