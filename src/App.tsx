import { For, type JSX } from "solid-js"
import { twMerge } from "tailwind-merge"
import { Panel } from "./ui/Panel.tsx"
import { Tabs } from "./ui/Tabs.tsx"

type LayoutItem = {
	title: string
	content: () => JSX.Element
	primary?: boolean
}

type Layout = {
	left: LayoutItem[]
	right: LayoutItem[]
}

const layout = (): Layout => ({
	left: [
		{ title: "Destiny", content: Destiny },
		{ title: "Initiative", content: Initiative },
		{ title: "Dice", content: DiceRolls, primary: true },
	],
	right: [
		{ title: "Positions", content: Positioning },
		{ title: "Characters", content: Characters, primary: true },
		{ title: "Characters", content: Characters, primary: true },
	],
})

const allItems = () => Object.values(layout()).flat()
const nonPrimaryItems = () => allItems().filter((item) => !item.primary)
const primaryItems = () => allItems().filter((item) => item.primary)

export function App() {
	return (
		<main class="@container h-dvh gap-2 p-2">
			<div class="@2xl:hidden flex h-full flex-col gap-[inherit]">
				<For each={nonPrimaryItems()}>
					{(item) => (
						<Panel class="p-2" classList={{ "flex-1": item.primary }}>
							{item.content()}
						</Panel>
					)}
				</For>

				<div class="@lg:hidden flex-1">
					<Tabs views={primaryItems()} />
				</div>

				<div class="@lg:grid hidden flex-1 auto-cols-fr grid-flow-col gap-[inherit]">
					<div class="grid auto-rows-fr gap-[inherit]">
						<For each={layout().left.filter((item) => item.primary)}>
							{(item) => <Panel class="p-2">{item.content()}</Panel>}
						</For>
					</div>
					<div class="grid auto-rows-fr gap-[inherit]">
						<For each={layout().right.filter((item) => item.primary)}>
							{(item) => <Panel class="p-2">{item.content()}</Panel>}
						</For>
					</div>
				</div>
			</div>

			<div class="@2xl:flex hidden h-full justify-between gap-[inherit]">
				<div class="flex w-[24rem] shrink flex-col gap-[inherit]">
					<For each={layout().left}>
						{(item) => (
							<Panel class={twMerge("p-2", item.primary && "flex-1")}>
								{item.content()}
							</Panel>
						)}
					</For>
				</div>

				<div class="flex w-[24rem] shrink flex-col gap-[inherit]">
					<For each={layout().right}>
						{(item) => (
							<Panel class={twMerge("p-2", item.primary && "flex-1")}>
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

function DiceRolls() {
	return <section class="flex-center h-full">dice rolls</section>
}
