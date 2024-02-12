import { NavLink, type NavLinkProps, useNavigate } from "@remix-run/react"
import { api } from "convex/_generated/api.js"
import { useMutation } from "convex/react"
import {
	LucideGamepad2,
	LucideLoader2,
	LucidePlus,
	LucideWand2,
} from "lucide-react"
import { Button } from "~/ui/Button.tsx"
import { InfiniteScrollGrid } from "~/ui/InfiniteScrollGrid"
import { PageLayout } from "~/ui/PageLayout.tsx"
import { Panel } from "~/ui/Panel.tsx"
import { PromptButton } from "~/ui/PromptButton.tsx"

export default function RoomList() {
	const upsertRoom = useMutation(api.rooms.upsert)
	const navigate = useNavigate()
	return (
		<PageLayout
			title="Your Rooms"
			headerAction={
				<PromptButton
					title="New Room"
					description="Create a new room to play your game."
					label="Room Title"
					confirmIcon={<LucideWand2 />}
					confirmText="Create"
					placeholder="Give it something cool. Or silly. Or boring."
					onSubmit={async (title) => {
						const roomId = await upsertRoom({ title })
						navigate(`/rooms/${roomId}`)
					}}
					render={<Button appearance="solid" icon={<LucidePlus />} />}
				>
					New Room
				</PromptButton>
			}
		>
			<InfiniteScrollGrid
				query={api.rooms.list}
				args={{}}
				numItems={20}
				emptyState="You have no rooms yet."
			>
				{(item) => (
					<NavLinkCard
						to={`/rooms/${item._id}`}
						title={item.title}
						icon={<LucideGamepad2 />}
					/>
				)}
			</InfiniteScrollGrid>
		</PageLayout>
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
	icon: React.ReactNode
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
