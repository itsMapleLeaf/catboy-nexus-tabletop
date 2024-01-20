import * as Lucide from "lucide-react"
import { Button } from "../ui/Button.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover.tsx"
import { DiceRollForm } from "./DiceRollForm.tsx"

export function DiceRolls() {
	return (
		<div className="flex h-full flex-col gap-2 p-2">
			<ul className="flex flex-1 flex-col">
				<li>placeholder</li>
				<li>placeholder</li>
				<li>placeholder</li>
			</ul>
			<Popover placement="top-start">
				<PopoverTrigger render={<Button />} className="self-start">
					<Lucide.Dices /> Roll Dice
				</PopoverTrigger>
				<PopoverContent>
					<DiceRollForm />
				</PopoverContent>
			</Popover>
		</div>
	)
}
