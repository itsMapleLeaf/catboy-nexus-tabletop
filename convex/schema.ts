import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	rooms: defineTable({
		title: v.string(),
		owner: v.string(), // identity.subject
	}).index("by_owner", ["owner"]),
})
