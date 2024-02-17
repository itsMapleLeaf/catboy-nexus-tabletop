import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { rolledDieValidator } from "./diceRolls.types"
import { diceSymbolValidator, diceTypeValidator } from "./diceSets.types"

export default defineSchema({
	profiles: defineTable({
		clerkId: v.string(),
		name: v.string(),
	}).index("by_clerk_id", ["clerkId"]),

	rooms: defineTable({
		title: v.string(),
		owner: v.string(), // clerk user ID
	}).index("by_owner", ["owner"]),

	images: defineTable({
		slug: v.string(),
		storageId: v.id("_storage"),
	}).index("by_slug", ["slug"]),

	diceSets: defineTable({
		name: v.string(),
		symbols: v.array(diceSymbolValidator),
		dice: v.array(diceTypeValidator),
	}),

	diceRolls: defineTable({
		roomId: v.id("rooms"),
		diceSetId: v.id("diceSets"),
		caption: v.optional(v.string()),
		rolledDice: v.array(rolledDieValidator),
		rolledBy: v.string(), // clerk user ID
	})
		.index("by_room", ["roomId"])
		.index("by_rolled_by", ["rolledBy"]),
})
