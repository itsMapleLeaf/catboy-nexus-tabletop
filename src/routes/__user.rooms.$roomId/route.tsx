import { Outlet, useParams } from "@remix-run/react"
import { raise } from "~/helpers/errors.ts"
import { RoomProvider } from "~/rooms/context.tsx"

export default function RoomLayout() {
	const roomId = useParams().roomId ?? raise("roomId is not defined")
	return (
		<RoomProvider roomId={roomId}>
			<Outlet />
		</RoomProvider>
	)
}
