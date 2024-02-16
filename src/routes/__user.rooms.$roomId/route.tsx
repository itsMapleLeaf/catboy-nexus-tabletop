import { Outlet, useParams } from "@remix-run/react"
import { api } from "convex/_generated/api.js"
import { raise } from "~/helpers/errors.ts"
import { RoomProvider } from "~/rooms/context.tsx"
import { Query } from "~/ui/Query.tsx"

export default function RoomLayout() {
	const roomId = useParams().roomId ?? raise("roomId is not defined")
	return (
		<Query query={api.rooms.get} args={{ roomId }} emptyState="Room not found">
			{(room) => (
				<RoomProvider value={room}>
					<Outlet />
				</RoomProvider>
			)}
		</Query>
	)
}
