import { Panel } from "./ui/Panel.tsx"
import { Tabs } from "./ui/Tabs.tsx"

export function App() {
	return (
		<main class="@container h-dvh gap-2 p-2">
			<div class="@2xl:hidden flex h-full flex-col gap-[inherit]">
				<Panel class="p-2">
					<Destiny />
				</Panel>
				<Panel class="p-2">
					<Initiative />
				</Panel>
				<Panel class="p-2">
					<Positioning />
				</Panel>

				<div class="@lg:hidden flex-1">
					<Tabs
						views={[
							{ title: "dice rolls", content: DiceRolls },
							{ title: "characters", content: Characters },
						]}
					/>
				</div>

				<div class="@lg:grid hidden flex-1 auto-cols-fr grid-flow-col gap-[inherit]">
					<Panel class="p-2">
						<DiceRolls />
					</Panel>
					<Panel class="p-2">
						<Characters />
					</Panel>
				</div>
			</div>

			<div class="@2xl:flex hidden h-full justify-between gap-[inherit]">
				<div class="flex w-[24rem] shrink flex-col gap-[inherit] last:*:flex-1">
					<Panel class="p-2">
						<Destiny />
					</Panel>
					<Panel class="p-2">
						<Initiative />
					</Panel>
					<Panel class="p-2">
						<DiceRolls />
					</Panel>
				</div>

				<div class="flex w-[24rem] shrink flex-col gap-[inherit] last:*:flex-1">
					<Panel class="p-2">
						<Positioning />
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
