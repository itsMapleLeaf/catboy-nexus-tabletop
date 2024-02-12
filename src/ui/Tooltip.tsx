import * as Ariakit from "@ariakit/react"

export function Tooltip({
	tooltip,
	placement = "top",
	...props
}: Ariakit.TooltipAnchorProps & {
	tooltip: React.ReactNode
	placement?: Ariakit.TooltipProviderProps["placement"]
}) {
	const originClass = placement.startsWith("top")
		? "origin-bottom"
		: placement.startsWith("right")
			? "origin-left"
			: placement.startsWith("bottom")
				? "origin-top"
				: placement.startsWith("left")
					? "origin-right"
					: "origin-bottom"
	return (
		<Ariakit.TooltipProvider placement={placement}>
			<Ariakit.TooltipAnchor {...props} />
			<Ariakit.Tooltip
				className={`pointer-events-none scale-90 rounded bg-theme-copy px-1.5 py-1 text-sm font-medium leading-none text-theme-background opacity-0 transition data-[enter]:scale-100 data-[enter]:opacity-100 ${originClass}`}
				gutter={4}
				unmountOnHide
			>
				{tooltip}
			</Ariakit.Tooltip>
		</Ariakit.TooltipProvider>
	)
}
