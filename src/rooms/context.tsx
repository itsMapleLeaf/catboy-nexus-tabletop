import type { Doc } from "convex/_generated/dataModel.js"
import type { UsePaginatedQueryResult } from "convex/react"
import { defineContext } from "~/helpers/context.tsx"

export const [RoomListProvider, useRoomList] =
	defineContext<UsePaginatedQueryResult<Doc<"rooms">>>()

export const [RoomProvider, useRoom] = defineContext<Doc<"rooms">>()
