import * as Ariakit from "@ariakit/react"

export function Tooltip({
	tooltip,
	placement,
	...props
}: Ariakit.TooltipAnchorProps & {
	tooltip: React.ReactNode
	placement?: Ariakit.TooltipProviderProps["placement"]
}) {
	return (
		<Ariakit.TooltipProvider placement={placement}>
			<Ariakit.TooltipAnchor {...props} />
			<Ariakit.Tooltip
				gutter={4}
				className="pointer-events-none translate-y-0.5 rounded bg-theme-copy px-1.5 py-1 text-sm font-medium leading-none text-theme-background opacity-0 transition data-[enter]:translate-y-0 data-[enter]:opacity-100"
			>
				{tooltip}
			</Ariakit.Tooltip>
		</Ariakit.TooltipProvider>
	)
}
