import { NavLink, type NavLinkProps, useNavigate } from "@remix-run/react"
import { api } from "convex/_generated/api.js"
import type { Doc } from "convex/_generated/dataModel.js"
import { useMutation } from "convex/react"
import {
	LucideGamepad2,
	LucideLoader2,
	LucidePlus,
	LucideWand2,
} from "lucide-react"
import type { ReactNode } from "react"
import { $path } from "remix-routes"
import { useQueryPreload } from "~/convex/preload"
import { useRoomList } from "~/rooms/context.tsx"
import { Button } from "~/ui/Button.tsx"
import { InfiniteScrollGrid } from "~/ui/InfiniteScrollGrid"
import { Panel } from "~/ui/Panel.tsx"
import { PromptButton } from "~/ui/PromptButton.tsx"
import { PageHeader, PageMainHeading } from "~/ui/page.tsx"

export default function RoomList() {
	const createRoom = useMutation(api.rooms.create)
	const navigate = useNavigate()
	const roomListResult = useRoomList()
	return (
		<div className="flex flex-col gap-4 p-4">
			<PageHeader>
				<PageMainHeading className="mr-auto">Your Rooms</PageMainHeading>
				<PromptButton
					title="New Room"
					description="Create a new room to play your game."
					label="Room Title"
					confirmIcon={<LucideWand2 />}
					confirmText="Create"
					placeholder="Give it something cool. Or silly. Or boring."
					onSubmit={async (title) => {
						const roomId = await createRoom({ title })
						navigate($path("/rooms/:roomId", { roomId }))
					}}
					render={<Button appearance="solid" icon={<LucidePlus />} />}
				>
					New Room
				</PromptButton>
			</PageHeader>
			<InfiniteScrollGrid
				listResult={roomListResult}
				numItems={20}
				emptyState="You have no rooms yet."
			>
				{(item) => <RoomCard room={item} />}
			</InfiniteScrollGrid>
		</div>
	)
}

function RoomCard({ room }: { room: Doc<"rooms"> }) {
	const startPreload = useQueryPreload(api.rooms.get, {
		roomId: room._id,
	})
	return (
		<NavLinkCard
			to={$path("/rooms/:roomId", { roomId: room._id })}
			title={room.title}
			icon={<LucideGamepad2 />}
			onPointerEnter={startPreload}
			data-testid="room-list-item"
		/>
	)
}

function NavLinkCard({
	title,
	description,
	icon,
	...props
}: {
	title?: string
	description?: string
	icon: ReactNode
} & NavLinkProps) {
	return (
		<NavLink
			prefetch="intent"
			className={({ isPending }) => (isPending ? "animate-pulse" : "")}
			{...props}
		>
			{({ isPending }) => (
				<Panel
					appearance="translucent"
					className="flex items-center gap-4 p-4 transition hover:brightness-125"
				>
					<div className="*:size-6">
						{isPending ? <LucideLoader2 className="animate-spin" /> : icon}
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="text-xl/tight font-light empty:hidden">{title}</h3>
						<p className="text-base/tight font-light text-theme-copy-light empty:hidden">
							{description}
						</p>
					</div>
				</Panel>
			)}
		</NavLink>
	)
}
