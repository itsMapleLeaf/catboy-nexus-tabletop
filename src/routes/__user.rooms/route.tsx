import { Outlet } from "@remix-run/react"
import { api } from "convex/_generated/api.js"
import { usePaginatedQuery } from "convex/react"
import { RoomListProvider } from "~/rooms/context.tsx"

export default function RoomListLayout() {
	const roomListResult = usePaginatedQuery(
		api.rooms.list,
		{},
		{ initialNumItems: 20 },
	)
	return (
		<RoomListProvider value={roomListResult}>
			<Outlet />
		</RoomListProvider>
	)
}
