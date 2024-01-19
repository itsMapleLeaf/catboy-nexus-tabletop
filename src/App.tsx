import { DiceRolls } from "./DiceRolls.tsx"
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
	return (
		<main className="h-dvh gap-2 p-2 @container">
			<div className="flex h-full flex-col gap-[inherit] @2xl:hidden">
				{getCollapsedItems(allItems).map((item) => (
					<Panel key={item.title}>{item.content()}</Panel>
				))}

				<div className="flex-1 @lg:hidden">
					<Tabs views={getExpandedItems(allItems)} />
				</div>

				<div className="hidden flex-1 auto-cols-fr grid-flow-col gap-[inherit] @lg:grid">
					<div className="grid auto-rows-fr gap-[inherit]">
						{getExpandedItems(layout.left).map((item) => (
							<Panel key={item.title}>{item.content()}</Panel>
						))}
					</div>
					<div className="grid auto-rows-fr gap-[inherit]">
						{getExpandedItems(layout.right).map((item) => (
							<Panel key={item.title}>{item.content()}</Panel>
						))}
					</div>
				</div>
			</div>

			<div className="hidden h-full justify-between gap-[inherit] @2xl:flex">
				<div className="flex w-[24rem] shrink flex-col gap-[inherit]">
					{layout.left.map((item) => (
						<Panel key={item.title} className={item.expanded ? "flex-1" : ""}>
							{item.content()}
						</Panel>
					))}
				</div>

				<div className="flex w-[24rem] shrink flex-col gap-[inherit]">
					{layout.right.map((item) => (
						<Panel key={item.title} className={item.expanded ? "flex-1" : ""}>
							{item.content()}
						</Panel>
					))}
				</div>
			</div>
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
