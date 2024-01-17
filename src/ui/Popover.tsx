import * as Kobalte from "@kobalte/core"
import { Panel } from "./Panel.tsx"
import { zoomFadeAnimation } from "./animations.ts"

export function Popover(props: Kobalte.Popover.PopoverRootProps) {
	return <Kobalte.Popover.Root gutter={8} {...props} />
}

export function PopoverTrigger(props: Kobalte.Popover.PopoverTriggerProps) {
	return <Kobalte.Popover.Trigger {...props} />
}

export function PopoverContent(props: Kobalte.Popover.PopoverContentProps) {
	return (
		<Kobalte.Popover.Portal>
			<Kobalte.Popover.Content
				{...props}
				class={zoomFadeAnimation("max-w-[calc(100vw-1rem)]", props.class)}
			>
				<Panel>{props.children}</Panel>
			</Kobalte.Popover.Content>
		</Kobalte.Popover.Portal>
	)
}
