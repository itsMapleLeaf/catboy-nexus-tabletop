import { api } from "convex/_generated/api.js"
import { usePaginatedQuery, useQuery } from "convex/react"
import { defineContext } from "~/helpers/context.tsx"

export const [RoomListProvider, useRoomList] = defineContext(() =>
	usePaginatedQuery(api.rooms.list, {}, { initialNumItems: 20 }),
)

export const [RoomProvider, useRoom] = defineContext(
	({ roomId }: { roomId: string }) => useQuery(api.rooms.get, { roomId }),
)
