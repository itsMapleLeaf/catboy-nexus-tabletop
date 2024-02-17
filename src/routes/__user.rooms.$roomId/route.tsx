import { Outlet, useParams } from "@remix-run/react"
import { api } from "convex/_generated/api.js"
import { useQuery } from "convex/react"
import { raise } from "~/helpers/errors.ts"
import { RoomProvider } from "~/rooms/context.tsx"
import { QueryResult } from "~/ui/QueryResult.tsx"

export default function RoomLayout() {
	const roomId = useParams().roomId ?? raise("roomId is not defined")
	const room = useQuery(api.rooms.get, { roomId })
	return (
		<QueryResult value={room} emptyState="Room not found">
			{(room) => (
				<RoomProvider room={room}>
					<Outlet />
				</RoomProvider>
			)}
		</QueryResult>
	)
}
