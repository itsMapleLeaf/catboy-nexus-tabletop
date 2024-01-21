import React, { useMemo } from "react"
import { DiceRolls } from "./dice/DiceRolls.tsx"
import { useRect } from "./helpers/useRect.tsx"
import { Panel } from "./ui/Panel.tsx"
import { Tabs } from "./ui/Tabs.tsx"

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
			content: () => <Destiny />,
		},
		{
			title: "Initiative",
			content: () => <Initiative />,
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
			content: () => <Positioning />,
		},
		{
			title: "Characters",
			content: () => <Characters />,
			expanded: true,
		},
	],
}

const allItems = Object.values(layout).flat()

const getCollapsedItems = (items: LayoutItem[]) =>
	items.filter((item) => !item.expanded)

const getExpandedItems = (items: LayoutItem[]) =>
	items.filter((item) => item.expanded)

export function App() {
	const containerRef = React.useRef<HTMLDivElement>(null)
	const rect = useRect(containerRef)

	const narrowLayout = useMemo(
		() => (
			<div className="flex h-full flex-col gap-[inherit]">
				{getCollapsedItems(allItems).map((item) => (
					<Panel appearance="translucent" key={item.title}>
						{item.content()}
					</Panel>
				))}
				<Tabs views={getExpandedItems(allItems)} />
			</div>
		),
		[],
	)

	const wideLayout = useMemo(
		() => (
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
		),
		[],
	)

	return (
		<main className="h-dvh gap-2 p-2" ref={containerRef}>
			{(rect?.width ?? 0) < 672 ? narrowLayout : wideLayout}
		</main>
	)
}

function Initiative() {
	return <section className="flex-center h-full">initiative</section>
}

function Destiny() {
	return <section className="flex-center h-full">destiny</section>
}

function Positioning() {
	return <section className="flex-center h-full">positioning</section>
}

function Characters() {
	return <section className="flex-center h-full">characters</section>
}
