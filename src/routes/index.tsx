import {
	LucideFolder,
	LucideFolderOpen,
	LucideSettings,
	LucideVenetianMask,
} from "lucide-solid"
import { type ParentProps, createSignal } from "solid-js"
import { Button } from "~/ui/Button.tsx"
import { panel } from "~/ui/panel.ts"

export default function Index() {
	const [isBlue, setIsBlue] = createSignal(false)
	return (
		<main class="grid h-dvh grid-cols-[theme(width.48),1fr]">
			<nav
				class={panel({
					border: "right",
					class: "flex flex-col gap-2 overflow-auto p-2",
				})}
			>
				<Collapse defaultOpen title="Characters">
					<Button text="Subaru" icon={LucideVenetianMask} />
					<Button text="Maple" icon={LucideVenetianMask} />
					<Button text="Raguna" icon={LucideVenetianMask} />
					<Button text="Cyrus" icon={LucideVenetianMask} />
					<Collapse defaultOpen title="Characters">
						<Button text="Subaru" icon={LucideVenetianMask} />
						<Button text="Maple" icon={LucideVenetianMask} />
						<Button text="Raguna" icon={LucideVenetianMask} />
						<Button text="Cyrus" icon={LucideVenetianMask} />
						<Collapse defaultOpen title="Characters">
							<Button text="Subaru" icon={LucideVenetianMask} />
							<Button text="Maple" icon={LucideVenetianMask} />
							<Button text="Raguna" icon={LucideVenetianMask} />
							<Button text="Cyrus" icon={LucideVenetianMask} />
						</Collapse>
					</Collapse>
				</Collapse>
				<hr class="mt-auto border-theme-border" />
				<Button text="Settings" icon={LucideSettings} />
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
			<Button
				component="summary"
				text={props.title}
				icon={open() ? LucideFolderOpen : LucideFolder}
			/>
			<div class="flex flex-col pl-4">{props.children}</div>
		</details>
	)
}
