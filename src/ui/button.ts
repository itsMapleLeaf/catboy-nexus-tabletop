import { twVariants } from "./twVariants.ts"

export const button = twVariants({
	base: "flex w-full min-w-0 cursor-pointer select-none items-center gap-1.5 rounded p-2 leading-none transition-colors hover:bg-theme-border [&>svg]:size-4",
})

export const iconButton = twVariants({
	base: "flex-center aspect-square size-10 cursor-pointer select-none rounded leading-none transition-colors hover:bg-theme-border [&>svg]:size-8",
})
