import { removeFirstWhere } from "~/helpers/array.ts"
import { Panel } from "~/ui/Panel.tsx"
import { Tooltip } from "~/ui/Tooltip.tsx"
import { RelativeTimestamp } from "../ui/RelativeTimestamp"
import type { GenesysDie } from "./dice.tsx"
import { genesysSymbolRules } from "./symbols.ts"

export type DiceRoll = {
	key: string
	caption: string
	dice: RolledDie[]
	rolledBy: string
	rolledAt: string | number | Date
}

type RolledDie = {
	key: string
	die: GenesysDie
	face: number
}

export function GenesysDiceRollSummary({ diceRoll }: { diceRoll: DiceRoll }) {
	const outcomes = diceRoll.dice.flatMap((die) =>
		(die.die.faces[die.face - 1] ?? []).map((symbol) => ({
			key: `${die.key}-${symbol.id}`,
			symbol,
		})),
	)
	for (const outcome of [...outcomes]) {
		const rules = genesysSymbolRules[outcome.symbol.id]
		if (rules?.removes) {
			removeFirstWhere(outcomes, (other) => other.symbol.id === rules.removes)
		}
	}

	return (
		<Panel as="section" className="flex flex-col gap-2 p-2">
			{diceRoll.caption ? (
				<h3 className="text-2xl font-light">{diceRoll.caption}</h3>
			) : (
				<h3 className="sr-only">
					Dice rolled at{" "}
					<RelativeTimestamp date={diceRoll.rolledAt} addSuffix />
				</h3>
			)}
			<ul className="flex flex-wrap gap-1">
				{diceRoll.dice.map((die) => (
					<li key={die.key}>
						<RolledDieIcon rolled={die} />
					</li>
				))}
			</ul>
			<ul className="flex flex-wrap gap-1">
				{outcomes.map((outcome) => (
					<li key={outcome.key}>
						<Tooltip
							tooltip={outcome.symbol.label}
							className="size-8"
							render={<img src={outcome.symbol.image} alt="" />}
						/>
					</li>
				))}
			</ul>
			<p className="text-sm text-theme-copy-lighter">
				rolled by <span className="text-theme-copy">{diceRoll.rolledBy}</span>{" "}
				<RelativeTimestamp date={diceRoll.rolledAt} addSuffix />
			</p>
		</Panel>
	)
}

function RolledDieIcon({ rolled }: { rolled: RolledDie }) {
	const symbols = rolled.die.faces[rolled.face - 1] ?? []
	const listFormat = new Intl.ListFormat(undefined, { type: "conjunction" })

	const tooltip = [
		rolled.die.label,
		listFormat.format(symbols.map((symbol) => symbol.label)) || "Blank",
	].join(": ")

	return (
		<Tooltip className="relative size-14 first:*:size-full" tooltip={tooltip}>
			{rolled.die.element}
			<div className="flex-center absolute inset-0 flex-col">
				{symbols.map((symbol, index) => (
					<img
						// biome-ignore lint/suspicious/noArrayIndexKey: some symbols might be the same
						key={index}
						src={symbol.image}
						alt={symbol.label}
						className={symbols.length > 1 ? "size-4" : "size-6"}
					/>
				))}
			</div>
		</Tooltip>
	)
}
