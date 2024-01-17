import { For, type JSX } from "solid-js"
import { DiceRolls } from "./DiceRolls.tsx"
import { Panel } from "./ui/Panel.tsx"
import { Tabs } from "./ui/Tabs.tsx"

type LayoutItem = {
	title: string
	content: () => JSX.Element
	expanded?: boolean
}

type Layout = {
	left: LayoutItem[]
	right: LayoutItem[]
}

const layout = (): Layout => ({
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
})

const allItems = () => Object.values(layout()).flat()
const nonExpandedItems = () => allItems().filter((item) => !item.expanded)
const expandedItems = () => allItems().filter((item) => item.expanded)

export function App() {
	return (
		<main class="h-dvh gap-2 p-2 @container">
			<div class="flex h-full flex-col gap-[inherit] @2xl:hidden">
				<For each={nonExpandedItems()}>
					{(item) => <Panel>{item.content()}</Panel>}
				</For>

				<div class="flex-1 @lg:hidden">
					<Tabs views={expandedItems()} />
				</div>

				<div class="hidden flex-1 auto-cols-fr grid-flow-col gap-[inherit] @lg:grid">
					<div class="grid auto-rows-fr gap-[inherit]">
						<For each={layout().left.filter((item) => item.expanded)}>
							{(item) => (
								<Panel class={item.expanded ? "flex-1" : ""}>
									{item.content()}
								</Panel>
							)}
						</For>
					</div>
					<div class="grid auto-rows-fr gap-[inherit]">
						<For each={layout().right.filter((item) => item.expanded)}>
							{(item) => (
								<Panel class={item.expanded ? "flex-1" : ""}>
									{item.content()}
								</Panel>
							)}
						</For>
					</div>
				</div>
			</div>

			<div class="hidden h-full justify-between gap-[inherit] @2xl:flex">
				<div class="flex w-[24rem] shrink flex-col gap-[inherit]">
					<For each={layout().left}>
						{(item) => (
							<Panel class={item.expanded ? "flex-1" : ""}>
								{item.content()}
							</Panel>
						)}
					</For>
				</div>

				<div class="flex w-[24rem] shrink flex-col gap-[inherit]">
					<For each={layout().right}>
						{(item) => (
							<Panel class={item.expanded ? "flex-1" : ""}>
								{item.content()}
							</Panel>
						)}
					</For>
				</div>
			</div>
		</main>
	)
}

function Initiative() {
	return <section class="flex-center h-full">initiative</section>
}

function Destiny() {
	return <section class="flex-center h-full">destiny</section>
}

function Positioning() {
	return <section class="flex-center h-full">positioning</section>
}

function Characters() {
	return <section class="flex-center h-full">characters</section>
}
