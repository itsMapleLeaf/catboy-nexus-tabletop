import { Tabs } from "./ui/Tabs.tsx"
import { panel } from "./ui/panel.ts"

export function App() {
	return (
		<main class="flex h-dvh flex-col gap-2 p-2">
			<section class={panel({ class: "flex-center p-2" })}>initiative</section>
			<section class={panel({ class: "flex-center p-2" })}>positioning</section>
			<Tabs
				views={[
					{
						title: "dice rolls",
						content: () => (
							<section class="flex-center h-full">dice rolls</section>
						),
					},
					{
						title: "characters",
						content: () => (
							<section class="flex-center h-full">characters</section>
						),
					},
				]}
			/>
		</main>
	)
}
