import { type ClassNameValue, twMerge } from "tailwind-merge"

export const zoomFadeAnimation = (...classes: ClassNameValue[]) =>
	twMerge(
		"data-[expanded]:animate-in data-[closed]:animate-out data-[expanded]:zoom-in-90 data-[closed]:zoom-out-90 data-[expanded]:fade-in data-[closed]:fade-out origin-[--kb-popper-content-transform-origin]",
		classes,
	)
