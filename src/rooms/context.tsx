import type { Doc } from "convex/_generated/dataModel.js"
import { defineContext } from "~/helpers/context.tsx"

export const [RoomProvider, useRoom] = defineContext<Doc<"rooms">>()
