import { classed } from "@tw-classed/react"

export const Input = classed.input({
	base: "flex min-w-0 cursor-text select-none items-center rounded border border-theme-border bg-transparent leading-none transition-colors hover:border-theme-copy-lighter focus:border-theme-copy-lighter focus:outline-none",
	variants: {
		size: {
			md: "h-10 gap-1.5 p-2",
			lg: "h-12 gap-1.5 px-3 text-lg/none ",
		},
		shape: {
			default: "",
			square: "aspect-square",
		},
	},
	defaultVariants: {
		size: "md",
		shape: "default",
	},
})
