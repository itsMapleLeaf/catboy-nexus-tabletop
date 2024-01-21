import { useDeferredValue, useState } from "react"
import { Panel } from "./Panel.tsx"
import { classed } from "./classed.ts"

export function Tabs(props: {
	views: { title: string; content: () => React.ReactNode }[]
}) {
	const [active, setActive] = useState(0)
	const deferredActive = useDeferredValue(active)
	return (
		<Panel appearance="translucent" className="flex h-full flex-col gap-2">
			<div className="flex items-center">
				{props.views.map((view, index) => (
					<Tab
						key={view.title}
						type="button"
						active={index === active}
						onClick={() => setActive(index)}
					>
						{view.title}
					</Tab>
				))}
			</div>
			<div className="flex-1 overflow-auto">
				{props.views[deferredActive]?.content()}
			</div>
		</Panel>
	)
}

const Tab = classed.button({
	base: "h-10 flex-1 justify-center border-b p-2",
	variants: {
		active: {
			true: "border-theme-primary-light font-medium text-theme-primary-content",
			false: "border-white/25 opacity-50 transition-opacity hover:opacity-75",
		},
	},
	defaultVariants: {
		active: false,
	},
})
