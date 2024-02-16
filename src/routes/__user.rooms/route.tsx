import { Outlet } from "@remix-run/react"
import { RoomListProvider } from "~/rooms/context.tsx"

export default function RoomListLayout() {
	return (
		<RoomListProvider>
			<Outlet />
		</RoomListProvider>
	)
}
