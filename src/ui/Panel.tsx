import type { ComponentProps } from "solid-js"
import type { VariantProps } from "tailwind-variants"
import { twVariants } from "./twVariants.ts"

export interface PanelProps
	extends ComponentProps<"div">,
		VariantProps<typeof panelStyle> {}

export function Panel(props: PanelProps) {
	return <div {...props} class={panelStyle({ ...props, class: props.class })} />
}

export const panelStyle = twVariants({
	base: "bg-theme-background/60 shadow shadow-theme-background/75 backdrop-blur-lg",
	variants: {
		border: {
			left: "border-l border-theme-border",
			right: "border-r border-theme-border",
			top: "border-t border-theme-border",
			bottom: "border-b border-theme-border",
			x: "border-x border-theme-border",
			y: "border-y border-theme-border",
			all: "rounded-md border border-theme-border",
			none: "",
		},
	},
	defaultVariants: {
		border: "all",
	},
})
