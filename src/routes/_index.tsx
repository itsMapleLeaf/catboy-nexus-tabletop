import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/remix"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { LucideLogIn } from "lucide-react"
import React from "react"
import { CharactersSection } from "../characters/CharactersSection.tsx"
import { DiceRolls } from "../dice/DiceRolls.tsx"
import { useRect } from "../helpers/useRect.tsx"
import { Button } from "../ui/Button.tsx"
import { Panel } from "../ui/Panel.tsx"
import { Tabs } from "../ui/Tabs.tsx"

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

export default function GamePage() {
	const { hasMobileHint } = useLoaderData<typeof loader>()
	const containerRef = React.useRef<HTMLDivElement>(null)
	const rect = useRect(containerRef)
	const isNarrowViewport = rect ? (rect.width ?? 0) < 672 : hasMobileHint
	return (
		<div
			className="flex h-dvh flex-col gap-2 overflow-hidden p-2"
			ref={containerRef}
		>
			<header className="flex h-12 items-center">
				<div className="ml-auto">
					<SignedIn>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<SignInButton>
							<Button>
								<LucideLogIn className="size-5" /> Sign in
							</Button>
						</SignInButton>
					</SignedOut>
				</div>
			</header>
			<main className="min-h-0 flex-1 gap-2">
				{isNarrowViewport ? narrowLayout : wideLayout}
			</main>
		</div>
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