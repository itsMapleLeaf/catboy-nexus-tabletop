import { type Infer, v } from "convex/values"

export const rolledDieValidator = v.object({
	key: v.string(),
	typeId: v.string(),
	face: v.number(),
})
export type RolledDie = Infer<typeof rolledDieValidator>
