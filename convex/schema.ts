import { defineSchema, defineTable } from "convex/server"
import { type Infer, v } from "convex/values"

const rolledDieValidator = v.object({
	key: v.string(),
	type: v.id("diceTypes"),
	face: v.number(),
})
export type RolledDie = Infer<typeof rolledDieValidator>

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

	diceTypes: defineTable({
		name: v.string(),
		color: v.optional(
			v.union(
				v.literal("red"),
				v.literal("orange"),
				v.literal("yellow"),
				v.literal("green"),
				v.literal("blue"),
				v.literal("purple"),
				v.literal("white"),
				v.literal("black"),
			),
		),
		faces: v.array(
			v.object({
				symbols: v.array(
					v.union(
						v.object({ type: v.literal("text"), value: v.string() }),
						v.object({ type: v.literal("image"), imageSlug: v.string() }),
					),
				),
			}),
		),
	}),

	diceRolls: defineTable({
		roomId: v.id("rooms"),
		caption: v.optional(v.string()),
		rolledDice: v.array(rolledDieValidator),
		rolledBy: v.string(), // clerk user ID
	})
		.index("by_room", ["roomId"])
		.index("by_rolled_by", ["rolledBy"]),
})
