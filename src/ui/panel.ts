import { twVariants } from "./twVariants.ts"

export const panel = twVariants({
	base: "bg-black/50 shadow shadow-black/40 backdrop-blur-lg",
	variants: {
		border: {
			left: "border-l border-white/25",
			right: "border-r border-white/25",
			top: "border-t border-white/25",
			bottom: "border-b border-white/25",
			x: "border-x border-white/25",
			y: "border-y border-white/25",
			all: "rounded-md border border-white/25",
		},
	},
	defaultVariants: {
		border: "all",
	},
})
