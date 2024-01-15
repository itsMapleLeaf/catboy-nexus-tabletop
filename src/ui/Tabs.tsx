import { For, type JSX, createSignal } from "solid-js"
import { twMerge } from "tailwind-merge"
import { Panel } from "./Panel.tsx"

export function Tabs(props: {
	views: { title: string; content: () => JSX.Element }[]
}) {
	const [active, setActive] = createSignal(0)
	return (
		<Panel class="flex h-full flex-col gap-2">
			<div class="flex items-center ">
				<For each={props.views}>
					{(view, i) => (
						<button
							type="button"
							class={twMerge(
								"h-10 flex-1 justify-center border-b p-2 ",
								active() === i()
									? "border-theme-primary-light font-medium text-theme-primary-content"
									: "border-white/25 opacity-50 transition-opacity hover:opacity-75",
							)}
							onClick={() => setActive(i)}
						>
							{view.title}
						</button>
					)}
				</For>
			</div>
			<div class="flex-1 overflow-auto">{props.views[active()]?.content()}</div>
		</Panel>
	)
}
