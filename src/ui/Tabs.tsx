import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Panel } from "./Panel.tsx"

export function Tabs(props: {
	views: { title: string; content: () => React.ReactNode }[]
}) {
	const [active, setActive] = useState(0)
	return (
		<Panel className="flex h-full flex-col gap-2">
			<div className="flex items-center ">
				{props.views.map((view, index) => (
					<button
						key={view.title}
						type="button"
						className={twMerge(
							"h-10 flex-1 justify-center border-b p-2 ",
							active === index
								? "border-theme-primary-light font-medium text-theme-primary-content"
								: "border-white/25 opacity-50 transition-opacity hover:opacity-75",
						)}
						onClick={() => setActive(index)}
					>
						{view.title}
					</button>
				))}
			</div>
			<div className="flex-1 overflow-auto">
				{props.views[active]?.content()}
			</div>
		</Panel>
	)
}
