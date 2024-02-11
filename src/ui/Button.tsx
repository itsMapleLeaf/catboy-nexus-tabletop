import { type ComponentProps, deriveClassed } from "@tw-classed/react"
import { classed } from "./classed.ts"

const ButtonBase = classed.button({
	base: "flex min-w-0 cursor-default select-none items-center rounded border leading-none transition active:brightness-150 active:transition-none",
	variants: {
		appearance: {
			clear:
				"border-transparent bg-transparent opacity-70 hover:bg-theme-border hover:opacity-100",
			outline: "border-theme-border bg-transparent hover:bg-theme-border",
			solid:
				"border-theme-border bg-theme-background/75 hover:bg-theme-background",
		},
		size: {
			md: "h-10 gap-1.5 px-2 [&_svg]:size-5",
			lg: "h-12 gap-1.5 px-3 text-lg/none [&_svg]:size-6",
			xl: "h-14 gap-2 px-4 text-2xl/none [&_svg]:size-7",
		},
	},
	defaultVariants: {
		appearance: "outline",
		size: "md",
	},
})

export type ButtonProps = ComponentProps<typeof ButtonBase> & {}

export const Button = deriveClassed<typeof ButtonBase, ButtonProps>(
	({ children, ...rest }, ref) => {
		return (
			<ButtonBase type="button" {...rest} ref={ref}>
				{children}
			</ButtonBase>
		)
	},
)
