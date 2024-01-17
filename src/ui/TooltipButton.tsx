import { Tooltip } from "@kobalte/core"
import type { JSX, ParentProps } from "solid-js"
import { zoomFadeAnimation } from "./animations.ts"

export function TooltipButton(
	props: ParentProps<{
		class?: string
		tooltip: JSX.Element
		placement?: Tooltip.TooltipRootProps["placement"]
		onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
		onContextMenu?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
	}>,
) {
	return (
		<Tooltip.Root gutter={4} placement={props.placement}>
			<Tooltip.Trigger
				type="button"
				class={props.class}
				onClick={props.onClick}
				onContextMenu={props.onContextMenu}
			>
				{props.children}
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					class={zoomFadeAnimation(
						"pointer-events-none rounded bg-theme-copy px-1.5 py-1 text-sm font-medium leading-none text-theme-background",
					)}
				>
					<p>{props.tooltip}</p>
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	)
}
