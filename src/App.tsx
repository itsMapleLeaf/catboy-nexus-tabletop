import { Tabs } from "./ui/Tabs.tsx"
import { panel } from "./ui/panel.ts"

export function App() {
	return (
		<main class="@container h-dvh gap-2 p-2">
			<div class="@2xl:hidden grid h-full grid-rows-[auto,auto,1fr] gap-[inherit]">
				<div class={panel({ class: "p-2" })}>
					<Initiative />
				</div>
				<div class={panel({ class: "p-2" })}>
					<Positioning />
				</div>
				<div class="@lg:hidden">
					<Tabs
						views={[
							{ title: "dice rolls", content: DiceRolls },
							{ title: "characters", content: Characters },
						]}
					/>
				</div>
				<div class="@lg:grid hidden auto-cols-fr grid-flow-col gap-[inherit]">
					<div class={panel({ class: "p-2" })}>
						<DiceRolls />
					</div>
					<div class={panel({ class: "p-2" })}>
						<Characters />
					</div>
				</div>
			</div>

			<div class="@2xl:flex hidden h-full justify-between gap-[inherit]">
				<div class="grid max-w-[24rem] flex-1 grid-rows-[auto,1fr] gap-[inherit]">
					<div class={panel({ class: "p-2" })}>
						<Initiative />
					</div>
					<div class={panel({ class: "p-2" })}>
						<Positioning />
					</div>
				</div>
				<div class="grid max-w-[24rem] flex-1 grid-rows-[auto,1fr] gap-[inherit]">
					<div class={panel({ class: "p-2" })}>
						<DiceRolls />
					</div>
					<div class={panel({ class: "p-2" })}>
						<Characters />
					</div>
				</div>
			</div>
		</main>
	)
}

function Initiative() {
	return <section class="flex-center h-full">initiative</section>
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
