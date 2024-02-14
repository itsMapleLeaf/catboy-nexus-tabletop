import type { LoaderFunctionArgs } from "@remix-run/node"
import { Link, useLoaderData, useParams } from "@remix-run/react"
import { api } from "convex/_generated/api.js"
import type { Id } from "convex/_generated/dataModel.js"
import { LucideSettings } from "lucide-react"
import React from "react"
import { CharactersSection } from "~/characters/CharactersSection.tsx"
import { DiceRolls } from "~/dice/DiceRolls.tsx"
import { useRect } from "~/helpers/useRect.tsx"
import { Button } from "~/ui/Button.tsx"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"
import { PageLayout } from "~/ui/PageLayout.tsx"
import { Panel } from "~/ui/Panel.tsx"
import { Query } from "~/ui/Query"
import { Tabs } from "~/ui/Tabs.tsx"

type LayoutItem = {
	title: string
	content: () => React.ReactNode
	expanded?: boolean
}

type Layout = {
	left: LayoutItem[]
	right: LayoutItem[]
}

const layout: Layout = {
	left: [
		{
			title: "Destiny",
			content: () => <DestinySection />,
		},
		{
			title: "Initiative",
			content: () => <InitiativeSection />,
		},
		{
			title: "Dice",
			content: () => <DiceRolls />,
			expanded: true,
		},
	],
	right: [
		{
			title: "Positions",
			content: () => <PositioningSection />,
		},
		{
			title: "Characters",
			content: () => <CharactersSection />,
			expanded: true,
		},
	],
}

const allItems = Object.values(layout).flat()

const getCollapsedItems = (items: LayoutItem[]) =>
	items.filter((item) => !item.expanded)

const getExpandedItems = (items: LayoutItem[]) =>
	items.filter((item) => item.expanded)

export async function loader({ request }: LoaderFunctionArgs) {
	const hasMobileHint = request.headers.get("sec-ch-ua-mobile") === "?1"
	return { hasMobileHint }
}

const narrowLayout = (
	<div className="flex h-full flex-col gap-[inherit]">
		{getCollapsedItems(allItems).map((item) => (
			<Panel appearance="translucent" key={item.title}>
				{item.content()}
			</Panel>
		))}
		<div className="min-h-0 flex-1">
			<Tabs storageId="app" views={getExpandedItems(allItems)} />
		</div>
	</div>
)

const wideLayout = (
	<div className="flex h-full justify-between gap-[inherit]">
		{(["left", "right"] as const).map((side) => (
			<div key={side} className="flex w-[24rem] flex-col gap-[inherit]">
				{layout[side].map((item) => (
					<Panel
						key={item.title}
						appearance="translucent"
						className={item.expanded ? "min-h-0 flex-1" : ""}
					>
						{item.content()}
					</Panel>
				))}
			</div>
		))}
	</div>
)

export default function RoomPage() {
	const { hasMobileHint } = useLoaderData<typeof loader>()
	const { roomId } = useParams()
	const [container, containerRef] = React.useState<HTMLDivElement | null>()
	const rect = useRect(container)
	const isNarrowViewport = rect ? (rect.width ?? 0) < 672 : hasMobileHint
	return (
		<Query
			query={api.rooms.get}
			args={{ id: roomId as Id<"rooms"> }}
			emptyState="Room not found."
			loading={
				<PageLayout
					title="Loading..."
					headerAction={
						<Button
							as={Link}
							to={`/rooms/${roomId}/settings`}
							icon={<LucideSettings />}
							appearance="solid"
						>
							Settings
						</Button>
					}
					breadcrumbs={[{ label: "Rooms", to: "/rooms" }]}
				>
					<LoadingPlaceholder />
				</PageLayout>
			}
		>
			{(room) => (
				<div ref={containerRef}>
					<PageLayout
						title={room.title}
						headerAction={
							<Button
								as={Link}
								to={`/rooms/${roomId}/settings`}
								icon={<LucideSettings />}
								appearance="solid"
							>
								Settings
							</Button>
						}
						breadcrumbs={[{ label: "Rooms", to: "/rooms" }]}
						className="h-dvh overflow-hidden"
					>
						<main className="min-h-0 flex-1 gap-2">
							{isNarrowViewport ? narrowLayout : wideLayout}
						</main>
					</PageLayout>
				</div>
			)}
		</Query>
	)
}

function InitiativeSection() {
	return <section className="flex-center h-full">initiative</section>
}

function DestinySection() {
	return <section className="flex-center h-full">destiny</section>
}

function PositioningSection() {
	return <section className="flex-center h-full">positioning</section>
}
