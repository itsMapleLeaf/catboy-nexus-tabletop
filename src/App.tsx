import {
	LucideFolder,
	LucideFolderOpen,
	LucideSettings,
	LucideVenetianMask,
} from "lucide-solid"
import { Show, createSignal, type ParentProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import { button } from "~/ui/button.ts"
import { panel } from "~/ui/panel.ts"

export function App() {
	const [isBlue, setIsBlue] = createSignal(false)
	return (
		<main class="grid h-dvh grid-cols-[theme(width.48),1fr]">
			<nav
				class={panel({
					border: "right",
					class: "flex flex-col overflow-auto p-2",
				})}
			>
				<Collapse defaultOpen title="Characters">
					<button type="button" class={button()}>
						<LucideVenetianMask /> Subaru
					</button>
					<button type="button" class={button()}>
						<LucideVenetianMask /> Maple
					</button>
					<button type="button" class={button()}>
						<LucideVenetianMask /> Raguna
					</button>
					<button type="button" class={button()}>
						<LucideVenetianMask /> Cyrus
					</button>
					<Collapse defaultOpen title="Characters">
						<button type="button" class={button()}>
							<LucideVenetianMask /> Subaru
						</button>
						<button type="button" class={button()}>
							<LucideVenetianMask /> Maple
						</button>
						<button type="button" class={button()}>
							<LucideVenetianMask /> Raguna
						</button>
						<button type="button" class={button()}>
							<LucideVenetianMask /> Cyrus
						</button>
						<Collapse defaultOpen title="Characters">
							<button type="button" class={button()}>
								<LucideVenetianMask /> Subaru
							</button>
							<button type="button" class={button()}>
								<LucideVenetianMask /> Maple
							</button>
							<button type="button" class={button()}>
								<LucideVenetianMask /> Raguna
							</button>
							<button type="button" class={button()}>
								<LucideVenetianMask /> Cyrus
							</button>
						</Collapse>
					</Collapse>
				</Collapse>
				<hr class="my-2 mt-auto border-theme-border" />
				<button type="button" class={button()}>
					<LucideSettings /> Settings
				</button>
			</nav>
			<div class="relative bg-[size:40px_40px] bg-repeat bg-grid-10 bg-grid-theme-border/40">
				<button
					type="button"
					class={panel({
						class: `absolute left-10 top-10 flex size-20 flex-col items-center justify-center rounded-md transition-[filter] hover:brightness-110 active:brightness-125 active:transition-none ${isBlue() ? "bg-blue-500" : "bg-red-500"}`,
					})}
					onClick={() => {
						setIsBlue(!isBlue())
					}}
				>
					test
				</button>
			</div>
		</main>
	)
}

function Collapse(
	props: ParentProps & { title: string; defaultOpen?: boolean },
) {
	const [open, setOpen] = createSignal(props.defaultOpen)
	return (
		<details
			open={open()}
			onToggle={(event) => setOpen(event.currentTarget.open)}
		>
			<summary class={button()}>
				<Dynamic component={open() ? LucideFolderOpen : LucideFolder} />
				{props.title}
			</summary>
			<Show when={open()}>
				<div class="flex flex-col pl-4">{props.children}</div>
			</Show>
		</details>
	)
}
