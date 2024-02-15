import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	rooms: defineTable({
		title: v.string(),
		owner: v.string(), // identity.subject
	}).index("by_owner", ["owner"]),

	roomDocuments: defineTable({
		roomId: v.id("rooms"),
		collectionName: v.string(),
		value: v.any(),
	})
		.index("by_room", ["roomId"])
		.index("by_collection", ["collectionName"]),
})
