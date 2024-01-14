import { ParentProps } from "solid-js"

export function Panel(props: ParentProps & { class?: string }) {
	return (
		<div
			class={`bg-theme-foreground border border-theme-border shadow shadow-black/50 ${props.class}`}
		>
			{props.children}
		</div>
	)
}
