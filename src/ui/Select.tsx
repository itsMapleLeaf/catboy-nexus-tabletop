import * as Ariakit from "@ariakit/react"
import * as Lucide from "lucide-react"
import { Panel } from "~/ui/Panel.tsx"
import { Button } from "../ui/Button.tsx"
import { Label } from "./Label.tsx"

export function Select<Value extends string>({
	options,
	label,
	value,
	onChange,
	placeholder = "Choose one",
	icon,
}: {
	options: { label: string; value: string }[]
	value: Value | undefined
	onChange: (value: Value) => void
	label: string
	placeholder?: string
	icon: React.ReactNode
}) {
	return (
		<Ariakit.SelectProvider value={value} setValue={onChange}>
			<div className="w-full">
				<Ariakit.SelectLabel render={<Label as="div" />}>
					{label}
				</Ariakit.SelectLabel>
				<Ariakit.Select
					render={<Button appearance="outline" icon={icon} />}
					className="w-full"
				>
					{options.find((option) => option.value === value)?.label ??
						placeholder}
					<Lucide.ChevronDown className="ml-auto size-4" />
				</Ariakit.Select>
			</div>
			<Ariakit.SelectPopover
				render={<Panel appearance="solid-raised" />}
				className="translate-y-2 overflow-clip opacity-0 transition data-[enter]:translate-y-0 data-[enter]:opacity-100"
				gutter={4}
				sameWidth
				portal
				unmountOnHide
			>
				{options.map((option) => (
					<Ariakit.SelectItem
						value={option.value}
						key={option.value}
						render={
							<Button appearance="clear" className="w-full rounded-none" />
						}
					>
						{option.label}
					</Ariakit.SelectItem>
				))}
			</Ariakit.SelectPopover>
		</Ariakit.SelectProvider>
	)
}
