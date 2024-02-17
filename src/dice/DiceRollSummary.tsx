import { api } from "convex/_generated/api.js"
import type { Doc } from "convex/_generated/dataModel.js"
import type { RolledDie } from "convex/diceRolls.types.ts"
import type { DiceSymbol, DiceType } from "convex/diceSets.types.ts"
import { useQuery } from "convex/react"
import { DieIcon } from "~/dice/DieIcon.tsx"
import { clientEnv } from "~/env.ts"
import { Panel } from "~/ui/Panel.tsx"
import { Tooltip } from "~/ui/Tooltip.tsx"
import { RelativeTimestamp } from "../ui/RelativeTimestamp"

export function DiceRollSummary({ diceRoll }: { diceRoll: Doc<"diceRolls"> }) {
	const diceSet = useQuery(api.diceSets.get, { diceSetId: diceRoll.diceSetId })
	const symbols = new Map(diceSet?.symbols.map((symbol) => [symbol.id, symbol]))

	const rolledDiceByType = new Map<string, RolledDie[]>()
	for (const die of diceRoll.rolledDice) {
		const rolledDice = rolledDiceByType.get(die.typeId) ?? []
		rolledDice.push(die)
		rolledDiceByType.set(die.typeId, rolledDice)
	}

	return (
		<Panel as="section" className="flex flex-col gap-2 p-2">
			{diceRoll.caption ? (
				<h3 className="text-2xl font-light">{diceRoll.caption}</h3>
			) : (
				<h3 className="sr-only">
					Dice rolled at{" "}
					<RelativeTimestamp date={diceRoll._creationTime} addSuffix />
				</h3>
			)}
			<ul className="flex flex-wrap gap-1">
				{/* map over the dice so we order the rolls by the order of dice in the set */}
				{diceSet?.dice.map((diceType) => {
					const rolledDice = rolledDiceByType.get(diceType.id) ?? []
					return rolledDice.map((die) => {
						const faceSymbols =
							diceType.faces[die.face]?.symbolIds.flatMap(
								(id) => symbols.get(id) ?? [],
							) ?? []
						return (
							<li key={die.key}>
								<RolledDieIcon diceType={diceType} symbols={faceSymbols} />
							</li>
						)
					})
				})}
			</ul>
			<p className="text-sm text-theme-copy-lighter">
				rolled by <span className="text-theme-copy">{diceRoll.rolledBy}</span>{" "}
				<RelativeTimestamp date={diceRoll._creationTime} addSuffix />
			</p>
		</Panel>
	)
}

function RolledDieIcon({
	diceType,
	symbols,
}: {
	diceType: DiceType
	symbols: DiceSymbol[]
}) {
	const symbolSize = (symbols.length ?? 0) > 1 ? "small" : "normal"
	return (
		<Tooltip
			className="relative size-16"
			tooltip={diceType.name}
			aria-label={diceType.name}
		>
			{diceType && <DieIcon diceType={diceType} className="size-full" />}
			<div className="flex-center absolute inset-0 flex-col">
				{symbols.map((symbol, index) =>
					symbol.type === "text" ? (
						<span
							key={index}
							className={symbolSize === "small" ? "text-base" : "text-lg"}
						>
							{symbol.text}
						</span>
					) : (
						<img
							key={index}
							src={getImageUrl(symbol.imageSlug)}
							alt=""
							className={symbolSize === "small" ? "size-4" : "size-6"}
						/>
					),
				)}
			</div>
		</Tooltip>
	)
}

function getImageUrl(slug: string) {
	const url = new URL(`/images`, clientEnv.VITE_CONVEX_SITE_URL)
	url.searchParams.set("slug", slug)
	return url.toString()
}
