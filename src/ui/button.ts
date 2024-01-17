import { twVariants } from "./twVariants.ts"

export const button = twVariants({
	base: "flex min-w-0 cursor-pointer select-none items-center rounded border leading-none transition duration-100 active:scale-90 active:transition-none",
	variants: {
		appearance: {
			clear: "border-transparent bg-transparent hover:bg-theme-border",
			outline: "border-theme-border bg-transparent hover:bg-theme-border",
		},
		size: {
			md: "h-10 gap-1.5 px-2",
			lg: "h-12 gap-1.5 px-3 text-lg/none ",
		},
		shape: {
			default: "",
			square: "aspect-square",
		},
	},
	defaultVariants: {
		appearance: "clear",
		size: "md",
		shape: "default",
	},
})
