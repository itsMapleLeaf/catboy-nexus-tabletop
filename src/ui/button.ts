import { twVariants } from "./twVariants.ts"

export const button = twVariants({
	base: "flex w-full min-w-0 cursor-pointer select-none items-center rounded leading-none transition-colors hover:bg-theme-border",
	variants: {
		size: {
			md: "h-10 gap-1.5 p-2 [&>svg]:size-4",
			lg: "h-12 gap-1.5 p-2 text-lg/none [&>svg]:size-6",
		},
	},
	defaultVariants: {
		size: "md",
	},
})

export const iconButton = twVariants({
	base: "flex-center aspect-square cursor-pointer select-none rounded leading-none transition-colors hover:bg-theme-border",
	variants: {
		size: {
			sm: "size-8 [&>svg]:size-6",
			md: "size-10 [&>svg]:size-8",
		},
	},
	defaultVariants: {
		size: "md",
	},
})
