import { classed } from "./classed.ts"

export const Panel = classed.div({
	variants: {
		appearance: {
			solid: "bg-theme-background",
			"solid-raised":
				"bg-theme-background shadow-md shadow-theme-background/75",
			translucent:
				"bg-theme-background/75 shadow-md shadow-theme-background/75 backdrop-blur-lg",
		},
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
		appearance: "solid",
		border: "all",
	},
})
