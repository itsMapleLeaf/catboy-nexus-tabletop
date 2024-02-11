import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	games: defineTable({
		name: v.string(),
		owner: v.string(), // identity.subject
	}).index("by_owner", ["owner"]),
})
