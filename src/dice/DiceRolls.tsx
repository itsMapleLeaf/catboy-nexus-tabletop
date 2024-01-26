import * as ScrollArea from "@radix-ui/react-scroll-area"
import * as Lucide from "lucide-react"
import { Virtuoso } from "react-virtuoso"
import { genesysDice } from "~/genesys/dice.tsx"
import { GenesysDiceRollForm } from "../genesys/GenesysDiceRollForm.tsx"
import { GenesysDiceRollSummary } from "../genesys/GenesysDiceRollSummary.tsx"
import { Button } from "../ui/Button.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover.tsx"

const testRolls = [...Array(100)].map((_, index) => ({
	key: `${index}`,
	caption: "test roll lol",
	dice: [
		{ die: genesysDice.proficiency, face: 1 },
		{ die: genesysDice.ability, face: 2 },
		{ die: genesysDice.boost, face: 3 },
		{ die: genesysDice.challenge, face: 4 },
		{ die: genesysDice.difficulty, face: 5 },
		{ die: genesysDice.setback, face: 6 },
	].map((die, index) => ({ ...die, key: index.toString() })),
	rolledBy: "someone",
	rolledAt: Date.now(),
}))

export function DiceRolls() {
	return (
		<div className="flex h-full flex-col gap-2 p-2">
			<ScrollArea.Root className="flex min-h-0 flex-1 flex-col">
				<Virtuoso
					data={testRolls}
					itemContent={(index, data) => (
						<div className={`animate-in fade-in ${index === 0 ? "" : "pt-2"}`}>
							<GenesysDiceRollSummary key={data.key} diceRoll={data} />
						</div>
					)}
					components={{ Scroller: ScrollArea.Viewport }}
					defaultItemHeight={200}
					// initialTopMostItemIndex={testRolls.length - 1}
					followOutput
					initialItemCount={20}
					className="[transform:translateZ(0)]"
				/>
				<ScrollArea.Scrollbar
					className="flex touch-none select-none p-1 transition-colors"
					orientation="vertical"
				>
					<ScrollArea.Thumb className="touch-area !w-2 rounded-full bg-theme-border transition-[filter] hover:brightness-125 active:brightness-150 active:transition-none" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
			<Popover placement="top-start">
				<PopoverTrigger render={<Button />} className="self-start">
					<Lucide.Dices /> Roll Dice
				</PopoverTrigger>
				<PopoverContent className="w-[28rem]">
					<GenesysDiceRollForm />
				</PopoverContent>
			</Popover>
		</div>
	)
}
