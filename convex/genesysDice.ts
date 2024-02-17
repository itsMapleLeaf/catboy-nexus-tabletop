import { internalMutation } from "convex/_generated/server"
import type { DiceSymbol, DiceType } from "./diceSets.types.ts"

// prettier-ignore
const symbols: DiceSymbol[] = [
	{ id: "success", name: "Success", type: "image", imageSlug: "success" },
	{ id: "advantage", name: "Advantage", type: "image", imageSlug: "advantage" },
	{ id: "failure", name: "Failure", type: "image", imageSlug: "failure" },
	{ id: "threat", name: "Threat", type: "image", imageSlug: "threat" },
	{ id: "triumph", name: "Triumph", type: "image", imageSlug: "triumph" },
	{ id: "despair", name: "Despair", type: "image", imageSlug: "despair" },
	{ id: "dark-point", name: "Dark Point", type: "image", imageSlug: "dark-point" },
	{ id: "light-point", name: "Light Point", type: "image", imageSlug: "light-point" },
]

const dice: DiceType[] = [
	{
		id: "force",
		name: "Force",
		color: "white",
		faces: [
			{ symbolIds: ["dark-point"] },
			{ symbolIds: ["dark-point"] },
			{ symbolIds: ["dark-point"] },
			{ symbolIds: ["dark-point"] },
			{ symbolIds: ["dark-point"] },
			{ symbolIds: ["dark-point"] },
			{ symbolIds: ["dark-point", "dark-point"] },
			{ symbolIds: ["light-point"] },
			{ symbolIds: ["light-point"] },
			{ symbolIds: ["light-point", "light-point"] },
			{ symbolIds: ["light-point", "light-point"] },
			{ symbolIds: ["light-point", "light-point"] },
		],
	},
	{
		id: "ability",
		name: "Ability",
		color: "green",
		faces: [
			{ symbolIds: [] },
			{ symbolIds: ["success"] },
			{ symbolIds: ["success"] },
			{ symbolIds: ["success", "success"] },
			{ symbolIds: ["advantage"] },
			{ symbolIds: ["advantage"] },
			{ symbolIds: ["success", "advantage"] },
			{ symbolIds: ["advantage", "advantage"] },
		],
	},
	{
		id: "difficulty",
		name: "Difficulty",
		color: "purple",
		faces: [
			{ symbolIds: [] },
			{ symbolIds: ["failure"] },
			{ symbolIds: ["failure", "failure"] },
			{ symbolIds: ["threat"] },
			{ symbolIds: ["threat"] },
			{ symbolIds: ["threat"] },
			{ symbolIds: ["threat", "threat"] },
			{ symbolIds: ["failure", "threat"] },
		],
	},
	{
		id: "challenge",
		name: "Challenge",
		color: "red",
		faces: [
			{ symbolIds: [] },
			{ symbolIds: ["failure"] },
			{ symbolIds: ["failure"] },
			{ symbolIds: ["failure", "failure"] },
			{ symbolIds: ["failure", "failure"] },
			{ symbolIds: ["threat"] },
			{ symbolIds: ["threat"] },
			{ symbolIds: ["failure", "threat"] },
			{ symbolIds: ["failure", "threat"] },
			{ symbolIds: ["threat", "threat"] },
			{ symbolIds: ["threat", "threat"] },
			{ symbolIds: ["despair"] },
		],
	},
	{
		id: "proficiency",
		name: "Proficiency",
		color: "yellow",
		faces: [
			{ symbolIds: [] },
			{ symbolIds: ["success"] },
			{ symbolIds: ["success"] },
			{ symbolIds: ["success", "success"] },
			{ symbolIds: ["success", "success"] },
			{ symbolIds: ["advantage"] },
			{ symbolIds: ["success", "advantage"] },
			{ symbolIds: ["success", "advantage"] },
			{ symbolIds: ["success", "advantage"] },
			{ symbolIds: ["advantage", "advantage"] },
			{ symbolIds: ["advantage", "advantage"] },
			{ symbolIds: ["triumph"] },
		],
	},
	{
		id: "setback",
		name: "Setback",
		color: "black",
		faces: [
			{ symbolIds: [] },
			{ symbolIds: [] },
			{ symbolIds: ["failure"] },
			{ symbolIds: ["failure"] },
			{ symbolIds: ["threat"] },
			{ symbolIds: ["threat"] },
		],
	},
	{
		id: "boost",
		name: "Boost",
		color: "blue",
		faces: [
			{ symbolIds: [] },
			{ symbolIds: [] },
			{ symbolIds: ["success"] },
			{ symbolIds: ["success", "advantage"] },
			{ symbolIds: ["advantage", "advantage"] },
			{ symbolIds: ["advantage"] },
		],
	},
]

export const seedGenesysDice = internalMutation({
	async handler(ctx, args) {
		await ctx.db.insert("diceSets", {
			name: "Genesys",
			symbols,
			dice,
		})
	},
})
