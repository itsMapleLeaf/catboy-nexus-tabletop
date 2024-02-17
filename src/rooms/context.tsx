import { api } from "convex/_generated/api.js"
import type { Doc } from "convex/_generated/dataModel.js"
import { usePaginatedQuery } from "convex/react"
import { defineContext } from "~/helpers/context.tsx"

export const [RoomListProvider, useRoomList] = defineContext(() =>
	usePaginatedQuery(api.rooms.list, {}, { initialNumItems: 20 }),
)

export const [RoomProvider, useRoom] = defineContext(
	({ room }: { room: Doc<"rooms"> }) => room,
)
