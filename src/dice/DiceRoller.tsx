import * as ScrollArea from "@radix-ui/react-scroll-area"
import { api } from "convex/_generated/api.js"
import { usePaginatedQuery } from "convex/react"
import { Virtuoso } from "react-virtuoso"
import { DiceRollForm } from "~/dice/DiceRollForm.tsx"
import { useRoom } from "~/rooms/context.tsx"
import { DiceRollSummary } from "./DiceRollSummary.tsx"

export function DiceRoller() {
	return (
		<div className="flex h-full flex-col gap-2 p-2">
			<DiceRollForm />
			<div className="flex-1">
				<DiceRollList />
			</div>
		</div>
	)
}

function DiceRollList() {
	const room = useRoom()
	const roomId = room._id

	const list = usePaginatedQuery(
		api.diceRolls.list,
		{ roomId },
		{ initialNumItems: 20 },
	)

	return (
		<ScrollArea.Root className="h-full">
			<Virtuoso
				data={list.results}
				computeItemKey={(index, item) => item._id}
				itemContent={(index, item) => (
					<div
						data-first={index === 0}
						className="pt-4 animate-in fade-in data-[first=true]:pt-0"
					>
						<DiceRollSummary diceRoll={item} />
					</div>
				)}
				components={{ Scroller: ScrollArea.Viewport }}
				defaultItemHeight={200}
				className="h-full [transform:translateZ(0)]"
				increaseViewportBy={200 * 5}
			/>
			<ScrollArea.Scrollbar
				className="flex touch-none select-none p-1 transition-colors"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="touch-area !w-2 rounded-full bg-theme-border transition-[filter] hover:brightness-125 active:brightness-150 active:transition-none" />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
	)
}
