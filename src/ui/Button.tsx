import { classed } from "./classed.ts"

export const Button = classed.button({
	base: "flex min-w-0 cursor-default select-none items-center rounded border leading-none transition active:brightness-150 active:transition-none",
	variants: {
		appearance: {
			clear: "border-transparent bg-transparent hover:bg-theme-border",
			outline: "border-theme-border bg-transparent hover:bg-theme-border",
			solid:
				"border-theme-border bg-theme-background/75 hover:bg-theme-background",
		},
		size: {
			md: "h-10 gap-1.5 px-2",
			lg: "h-12 gap-1.5 px-3 text-lg/none ",
			xl: "h-14 gap-2 px-4 text-2xl/none",
		},
	},
	defaultVariants: {
		appearance: "outline",
		size: "md",
	},
	defaultProps: {
		type: "button",
	},
})
