import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
	profiles: defineTable({
		clerkId: v.string(),
		name: v.string(),
	}).index("by_clerk_id", ["clerkId"]),

	rooms: defineTable({
		title: v.string(),
		owner: v.string(), // clerk user ID
	}).index("by_owner", ["owner"]),

	roomDocuments: defineTable({
		roomId: v.id("rooms"),
		collectionName: v.string(),
		value: v.any(),
	})
		.index("by_room", ["roomId"])
		.index("by_collection", ["collectionName"]),
})
