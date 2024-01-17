import * as Lucide from "lucide-solid"
import { DiceRollForm } from "./DiceRollForm.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover.tsx"
import { button } from "./ui/button.ts"

export function DiceRolls() {
	return (
		<div class="flex h-full flex-col gap-2 p-2">
			<ul class="flex flex-1 flex-col">
				<li>placeholder</li>
				<li>placeholder</li>
				<li>placeholder</li>
			</ul>
			<Popover placement="top-start">
				<PopoverTrigger type="button" class={button({ class: "self-start" })}>
					<Lucide.Dices /> Roll Dice
				</PopoverTrigger>
				<PopoverContent>
					<DiceRollForm />
				</PopoverContent>
			</Popover>
		</div>
	)
}
