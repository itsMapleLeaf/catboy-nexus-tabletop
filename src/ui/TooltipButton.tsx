import { Tooltip } from "@kobalte/core"
import type { JSX, ParentProps } from "solid-js"

export function TooltipButton(
	props: ParentProps<{ class?: string; tooltip: JSX.Element }>,
) {
	return (
		<Tooltip.Root openDelay={100} closeDelay={0} gutter={4}>
			<Tooltip.Trigger type="button" class={props.class}>
				{props.children}
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content class="data-[expanded]:animate-in data-[closed]:animate-out data-[expanded]:zoom-in-90 data-[closed]:zoom-out-90 data-[expanded]:fade-in data-[closed]:fade-out pointer-events-none origin-[--kb-tooltip-content-transform-origin] rounded bg-theme-copy px-1.5 py-1 text-sm font-medium leading-none text-theme-background">
					<p>{props.tooltip}</p>
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	)
}
