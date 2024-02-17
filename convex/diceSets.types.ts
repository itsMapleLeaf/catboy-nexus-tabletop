import { type Infer, v } from "convex/values"

const diceColorValidator = v.union(
	v.literal("red"),
	v.literal("orange"),
	v.literal("yellow"),
	v.literal("green"),
	v.literal("blue"),
	v.literal("purple"),
	v.literal("white"),
	v.literal("black"),
)

export const diceSymbolValidator = v.union(
	v.object({
		id: v.string(),
		name: v.string(),
		type: v.literal("text"),
		text: v.string(),
	}),
	v.object({
		id: v.string(),
		name: v.string(),
		type: v.literal("image"),
		imageSlug: v.string(),
	}),
)
export type DiceSymbol = Infer<typeof diceSymbolValidator>

const dieFaceValidator = v.object({
	symbolIds: v.array(v.string()),
})
export type DieFace = Infer<typeof dieFaceValidator>

export const diceTypeValidator = v.object({
	id: v.string(),
	name: v.string(),
	color: v.optional(diceColorValidator),
	faces: v.array(dieFaceValidator),
})
export type DiceType = Infer<typeof diceTypeValidator>
