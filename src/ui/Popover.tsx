import * as Ariakit from "@ariakit/react"
import { twMerge } from "tailwind-merge"
import { Panel } from "./Panel.tsx"

export function Popover(props: Ariakit.PopoverProviderProps) {
	return <Ariakit.PopoverProvider {...props} />
}

export function PopoverTrigger(props: Ariakit.PopoverDisclosureProps) {
	return (
		<Ariakit.PopoverAnchor>
			<Ariakit.PopoverDisclosure {...props} />
		</Ariakit.PopoverAnchor>
	)
}

export function PopoverContent(props: Ariakit.PopoverProps) {
	return (
		<Ariakit.Popover
			gutter={8}
			portal
			{...props}
			render={<Panel />}
			className={twMerge(
				"max-w-[calc(100vw-1rem)] translate-y-1 opacity-0 transition data-[enter]:translate-y-0 data-[enter]:opacity-100",
				props.className,
			)}
		/>
	)
}
