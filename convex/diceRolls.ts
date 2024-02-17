import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"
import { query } from "./_generated/server"
import { authMutation } from "./auth.ts"
import type { RolledDie } from "./diceRolls.types.ts"
import { requireDoc, requireValidId } from "./helpers.ts"

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
		diceSetId: v.string(),
		diceInput: v.array(v.object({ typeId: v.string() })),
		caption: v.optional(v.string()),
	},
	async handler(ctx, args) {
		const room = await requireDoc(ctx, "rooms", args.roomId)
		const diceSet = await requireDoc(ctx, "diceSets", args.diceSetId)

		const diceTypes = new Map(
			diceSet.dice.map((diceType) => [diceType.id, diceType]),
		)

		const rolledDice: RolledDie[] = args.diceInput.flatMap((die) => {
			const type = diceTypes.get(die.typeId)
			if (!type) {
				console.warn(`Invalid dice type "${die.typeId}"`, args)
				return []
			}
			return {
				key: crypto.randomUUID(),
				typeId: type.id,
				face: Math.floor(Math.random() * type.faces.length),
			}
		})

		return ctx.db.insert("diceRolls", {
			roomId: room._id,
			diceSetId: diceSet._id,
			rolledBy: ctx.identity.subject,
			rolledDice,
			caption: args.caption,
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
