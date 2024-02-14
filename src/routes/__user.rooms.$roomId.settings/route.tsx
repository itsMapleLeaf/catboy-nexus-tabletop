import { useRoom } from "~/rooms/context.tsx"
import { PageLayout } from "~/ui/PageLayout.tsx"

export default function RoomSettingsPage() {
	const room = useRoom()
	return (
		<PageLayout
			title={room.title}
			headerAction={undefined}
			breadcrumbs={[
				{ label: "Rooms", to: "/rooms" },
				{ label: room.title, to: `/rooms/${room._id}` },
			]}
			className="h-dvh overflow-hidden"
		>
			<main className="min-h-0 flex-1 gap-2">settings</main>
		</PageLayout>
	)
}
