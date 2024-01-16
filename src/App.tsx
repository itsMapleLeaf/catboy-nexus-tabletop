import { LucidePentagon, LucideSquare, LucideTriangle } from "lucide-solid"
import { For, type JSX, type ParentProps } from "solid-js"
import { twMerge } from "tailwind-merge"
import { Panel } from "./ui/Panel.tsx"
import { Tabs } from "./ui/Tabs.tsx"
import { TooltipButton } from "./ui/TooltipButton.tsx"
import { iconButton } from "./ui/button.ts"

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
		{ title: "Destiny", content: Destiny },
		{ title: "Initiative", content: Initiative },
		{ title: "Dice", content: DiceRolls, expanded: true },
	],
	right: [
		{ title: "Positions", content: Positioning },
		{ title: "Characters", content: Characters, expanded: true },
	],
})

const allItems = () => Object.values(layout()).flat()
const nonPrimaryItems = () => allItems().filter((item) => !item.expanded)
const primaryItems = () => allItems().filter((item) => item.expanded)

export function App() {
	return (
		<main class="@container h-dvh gap-2 p-2">
			<div class="@2xl:hidden flex h-full flex-col gap-[inherit]">
				<For each={nonPrimaryItems()}>
					{(item) => (
						<Panel class="p-2" classList={{ "flex-1": item.expanded }}>
							{item.content()}
						</Panel>
					)}
				</For>

				<div class="@lg:hidden flex-1">
					<Tabs views={primaryItems()} />
				</div>

				<div class="@lg:grid hidden flex-1 auto-cols-fr grid-flow-col gap-[inherit]">
					<div class="grid auto-rows-fr gap-[inherit]">
						<For each={layout().left.filter((item) => item.expanded)}>
							{(item) => <Panel class="p-2">{item.content()}</Panel>}
						</For>
					</div>
					<div class="grid auto-rows-fr gap-[inherit]">
						<For each={layout().right.filter((item) => item.expanded)}>
							{(item) => <Panel class="p-2">{item.content()}</Panel>}
						</For>
					</div>
				</div>
			</div>

			<div class="@2xl:flex hidden h-full justify-between gap-[inherit]">
				<div class="flex w-[24rem] shrink flex-col gap-[inherit]">
					<For each={layout().left}>
						{(item) => (
							<Panel class={twMerge("p-2", item.expanded && "flex-1")}>
								{item.content()}
							</Panel>
						)}
					</For>
				</div>

				<div class="flex w-[24rem] shrink flex-col gap-[inherit]">
					<For each={layout().right}>
						{(item) => (
							<Panel class={twMerge("p-2", item.expanded && "flex-1")}>
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
	return (
		<div class="flex h-full flex-col">
			<ul class="flex flex-1 flex-col">
				<li>placeholder</li>
				<li>placeholder</li>
				<li>placeholder</li>
			</ul>
			<div class="flex-center flex-wrap">
				<DieButton tooltip="Ability">
					<LucideTriangle class="text-green-300" />
				</DieButton>
				<DieButton tooltip="Difficulty">
					<LucideTriangle class="text-purple-300" />
				</DieButton>
				<DieButton tooltip="Proficiency">
					<LucidePentagon class="text-yellow-300" />
				</DieButton>
				<DieButton tooltip="Challenge">
					<LucidePentagon class="text-red-300" />
				</DieButton>
				<DieButton tooltip="Destiny">
					<LucidePentagon class="text-white" />
				</DieButton>
				<DieButton tooltip="Boost">
					<LucideSquare class="text-sky-300" />
				</DieButton>
				<DieButton tooltip="Setback">
					<div class="size-[26px] rounded border-[3px] border-white bg-black text-neutral-800" />
				</DieButton>
			</div>
		</div>
	)
}

function DieButton(props: ParentProps<{ tooltip: JSX.Element }>) {
	return (
		<TooltipButton class={iconButton()} tooltip={props.tooltip}>
			{props.children}
		</TooltipButton>
	)
}
