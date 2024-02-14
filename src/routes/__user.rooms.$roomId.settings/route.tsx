import { useParams } from "@remix-run/react"
import { api } from "convex/_generated/api.js"
import type { Id } from "convex/_generated/dataModel.js"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"
import { PageLayout } from "~/ui/PageLayout.tsx"
import { Query } from "~/ui/Query"

export default function RoomSettingsPage() {
	const { roomId } = useParams()

	const breadcrumbs = (roomName: string) => [
		{ label: "Rooms", to: "/rooms" },
		{ label: roomName, to: `/rooms/${roomId}` },
	]

	return (
		<Query
			query={api.rooms.get}
			args={{ id: roomId as Id<"rooms"> }}
			emptyState="Room not found."
			loading={
				<PageLayout
					title="Loading..."
					headerAction={undefined}
					breadcrumbs={breadcrumbs("Loading...")}
				>
					<LoadingPlaceholder />
				</PageLayout>
			}
		>
			{(room) => (
				<PageLayout
					title={room.title}
					headerAction={undefined}
					breadcrumbs={breadcrumbs(room.title)}
					className="h-dvh overflow-hidden"
				>
					<main className="min-h-0 flex-1 gap-2">settings</main>
				</PageLayout>
			)}
		</Query>
	)
}
