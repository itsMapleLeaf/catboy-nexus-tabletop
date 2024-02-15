import * as ScrollArea from "@radix-ui/react-scroll-area"
import { api } from "convex/_generated/api.js"
import { usePaginatedQuery } from "convex/react"
import { Virtuoso } from "react-virtuoso"
import type { ZodError } from "zod"
import { GenesysDiceRollForm } from "./GenesysDiceRollForm.tsx"
import { GenesysDiceRollSummary } from "./GenesysDiceRollSummary.tsx"
import { genesysDiceRollSchema } from "./types.ts"

export function GenesysDiceRolls() {
	const list = usePaginatedQuery(
		api.roomDocuments.list,
		{},
		{ initialNumItems: 20 },
	)

	return (
		<div className="flex h-full flex-col gap-2 p-2">
			<GenesysDiceRollForm />
			<ScrollArea.Root className="flex min-h-0 flex-1 flex-col">
				<Virtuoso
					data={list.results}
					computeItemKey={(index, item) => item._id}
					itemContent={(index, item) => {
						const result = genesysDiceRollSchema.safeParse(item.value)
						return (
							<div
								className={`animate-in fade-in ${index === 0 ? "" : "pt-2"}`}
							>
								{result.success ? (
									<GenesysDiceRollSummary
										key={result.data.key}
										diceRoll={result.data}
									/>
								) : (
									<div className="text-theme-error">
										<p>
											Invalid dice roll data. Please contact the author!
											Problems:
										</p>
										<ZodErrorList error={result.error} />
									</div>
								)}
							</div>
						)
					}}
					components={{ Scroller: ScrollArea.Viewport }}
					defaultItemHeight={200}
					className="[transform:translateZ(0)]"
				/>
				<ScrollArea.Scrollbar
					className="flex touch-none select-none p-1 transition-colors"
					orientation="vertical"
				>
					<ScrollArea.Thumb className="touch-area !w-2 rounded-full bg-theme-border transition-[filter] hover:brightness-125 active:brightness-150 active:transition-none" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</div>
	)
}

function ZodErrorList({ error }: { error: ZodError }) {
	return (
		<ul className="list-inside list-disc pl-4">
			{error.issues.map((issue) => (
				<li key={issue.path.join(".")}>
					{issue.path.join(".")}: {issue.message}
				</li>
			))}
		</ul>
	)
}
