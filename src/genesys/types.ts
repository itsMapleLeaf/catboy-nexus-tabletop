import { z } from "zod"

const genesysDieNameSchema = z.enum([
	"proficiency",
	"ability",
	"boost",
	"challenge",
	"difficulty",
	"setback",
])

const genesysRolledDieSchema = z.object({
	key: z.string(),
	name: genesysDieNameSchema,
	face: z.number(),
})
export type GenesysRolledDie = z.infer<typeof genesysRolledDieSchema>

export const genesysDiceRollSchema = z.object({
	key: z.string(),
	caption: z.string(),
	dice: z.array(genesysRolledDieSchema),
	rolledBy: z.string(),
	rolledAt: z.string().datetime(),
})

export type GenesysDiceRoll = z.infer<typeof genesysDiceRollSchema>
