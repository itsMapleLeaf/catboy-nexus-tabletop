import { Panel } from "~/ui/Panel.tsx"
import { Tooltip } from "~/ui/Tooltip.tsx"
import { RelativeTimestamp } from "../ui/RelativeTimestamp"
import type { GenesysDie } from "./dice.tsx"
import type { GenesysSymbol } from "./symbols.ts"

type RolledDie = {
	key: string
	die: GenesysDie
	face: number
}

type DiceRollOutcome = {
	key: string
	symbol: GenesysSymbol
}

export function GenesysDiceRollSummary({
	caption,
	dice,
	rolledBy,
	rolledAt,
}: {
	caption: string
	dice: RolledDie[]
	rolledBy: string
	rolledAt: string | number | Date
}) {
	const outcomes = dice.flatMap((die) =>
		(die.die.faces[die.face - 1] ?? []).map((symbol) => ({
			key: `${die.key}-${symbol.id}`,
			symbol,
		})),
	)

	return (
		<Panel as="section" className="flex flex-col gap-2 p-2">
			{caption ? (
				<h3 className="text-2xl font-light">{caption}</h3>
			) : (
				<h3 className="sr-only">
					Dice rolled at <RelativeTimestamp date={rolledAt} addSuffix />
				</h3>
			)}
			<ul className="flex flex-wrap gap-1">
				{dice.map((die) => (
					<li key={die.key}>
						<RolledDieIcon die={die} />
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
				rolled by <span className="text-theme-copy">{rolledBy}</span>{" "}
				<RelativeTimestamp date={rolledAt} addSuffix />
			</p>
		</Panel>
	)
}

function RolledDieIcon({ die }: { die: RolledDie }) {
	const symbols = die.die.faces[die.face - 1] ?? []
	return (
		<Tooltip
			tooltip={die.die.label}
			className="relative size-14 first:*:size-full"
		>
			{die.die.element}
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
