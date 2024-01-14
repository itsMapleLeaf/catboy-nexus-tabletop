import { ParentProps } from "solid-js"

export function Panel(props: ParentProps & { class?: string }) {
	return (
		<div
			class={`border border-theme-border bg-theme-foreground shadow shadow-black/50 ${props.class}`}
		>
			{props.children}
		</div>
	)
}
