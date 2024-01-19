import { classed } from "./classed.ts"

export const Button = classed.button({
	base: "flex min-w-0 cursor-pointer select-none items-center rounded border leading-none transition active:brightness-150 active:transition-none",
	variants: {
		appearance: {
			clear: "border-transparent bg-transparent hover:bg-theme-border",
			outline: "border-theme-border bg-transparent hover:bg-theme-border",
		},
		size: {
			md: "h-10 gap-1.5 px-2",
			lg: "h-12 gap-1.5 px-3 text-lg/none ",
		},
	},
	defaultVariants: {
		appearance: "clear",
		size: "md",
	},
	defaultProps: {
		type: "button",
	},
})
