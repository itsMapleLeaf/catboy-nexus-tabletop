import { Panel } from "./ui/Panel.tsx"
import { Tabs } from "./ui/Tabs.tsx"

export function App() {
	return (
		<main class="@container h-dvh gap-2 p-2">
			<div class="@2xl:hidden grid h-full grid-rows-[auto,auto,1fr] gap-[inherit]">
				<Panel class="p-2">
					<Initiative />
				</Panel>
				<Panel class="p-2">
					<Positioning />
				</Panel>

				<div class="@lg:hidden">
					<Tabs
						views={[
							{ title: "dice rolls", content: DiceRolls },
							{ title: "characters", content: Characters },
						]}
					/>
				</div>

				<div class="@lg:grid hidden auto-cols-fr grid-flow-col gap-[inherit]">
					<Panel class="p-2">
						<DiceRolls />
					</Panel>
					<Panel class="p-2">
						<Characters />
					</Panel>
				</div>
			</div>

			<div class="@2xl:flex hidden h-full justify-between gap-[inherit]">
				<div class="grid max-w-[24rem] flex-1 grid-rows-[auto,1fr] gap-[inherit]">
					<Panel class="p-2">
						<Initiative />
					</Panel>
					<Panel class="p-2">
						<Positioning />
					</Panel>
				</div>

				<div class="grid max-w-[24rem] flex-1 grid-rows-[auto,1fr] gap-[inherit]">
					<Panel class="p-2">
						<DiceRolls />
					</Panel>
					<Panel class="p-2">
						<Characters />
					</Panel>
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
