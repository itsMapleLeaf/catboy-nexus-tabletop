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

export function PopoverContent({
	className,
	render,
	children,
	...props
}: Ariakit.PopoverProps) {
	return (
		<Ariakit.Popover
			gutter={8}
			portal
			{...props}
			className="group opacity-0 transition-opacity data-[enter]:opacity-100"
		>
			<Panel
				className={twMerge(
					"max-w-[calc(100vw-1rem)] translate-y-1 transition-transform group-data-[enter]:translate-y-0",
					className,
				)}
			>
				{children}
			</Panel>
		</Ariakit.Popover>
	)
}
