import { type ComponentProps, deriveClassed } from "@tw-classed/react"
import { LucideLoader2 } from "lucide-react"
import type * as React from "react"
import { usePendingAction } from "~/helpers/usePendingAction.ts"
import { useFormContext } from "./Form.tsx"
import { classed } from "./classed.ts"

const ButtonBase = classed.button({
	base: "flex min-w-0 select-none items-center rounded border leading-none transition active:brightness-150 active:transition-none disabled:pointer-events-none disabled:opacity-70 [&:is(button)]:cursor-default",
	variants: {
		appearance: {
			clear: `hover-fade border-transparent bg-transparent hover:bg-theme-border`,
			outline: `border-theme-border bg-transparent hover:bg-theme-border`,
			solid: `border-theme-border bg-theme-background/75 hover:bg-theme-background`,
		},
		size: {
			md: "h-10 gap-1.5 px-2",
			lg: "h-12 gap-1.5 px-3 text-lg/none",
			xl: "h-14 gap-2 px-4 text-2xl/none",
		},
	},
	defaultVariants: {
		appearance: "outline",
		size: "md",
	},
})

const ButtonIconContainer = classed.span({
	base: "empty:hidden",
	variants: {
		size: {
			md: "*:size-5",
			lg: "*:size-6",
			xl: "*:size-7",
		},
	},
})

export interface ButtonProps extends ComponentProps<typeof ButtonBase> {
	icon?: React.ReactNode
	pending?: boolean
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => unknown
}

export const Button = deriveClassed<typeof ButtonBase, ButtonProps>(
	(
		{ children, icon, onClick, size = "md", pending: pendingProp, ...rest },
		ref,
	) => {
		const [handleClick, actionPending] = usePendingAction(onClick)
		const form = useFormContext()
		const pending = actionPending || form.pending || pendingProp
		return (
			<ButtonBase
				type="button"
				{...rest}
				size={size}
				ref={ref}
				disabled={pending || rest.disabled}
				onClick={handleClick}
			>
				<ButtonIconContainer size={size}>
					{pending ? <LucideLoader2 className="animate-spin" /> : icon}
				</ButtonIconContainer>
				{children}
			</ButtonBase>
		)
	},
)
