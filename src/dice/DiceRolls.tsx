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
			<div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
				<Virtuoso
					data={testRolls}
					itemContent={(_index, data) => (
						<div className="pb-2">
							<GenesysDiceRollSummary key={data.key} diceRoll={data} />
						</div>
					)}
					className="[transform:translateZ(0)]"
					increaseViewportBy={2000}
					defaultItemHeight={200}
				/>
			</div>
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
