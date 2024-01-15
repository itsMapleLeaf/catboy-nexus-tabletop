import { twVariants } from "./twVariants.ts"

export const panel = twVariants({
	base: "bg-theme-foreground shadow shadow-black/50",
	variants: {
		border: {
			left: "border-l border-theme-border",
			right: "border-r border-theme-border",
			top: "border-t border-theme-border",
			bottom: "border-b border-theme-border",
			x: "border-x border-theme-border",
			y: "border-y border-theme-border",
			all: "rounded-md border border-theme-border",
		},
	},
	defaultVariants: {
		border: "all",
	},
})
