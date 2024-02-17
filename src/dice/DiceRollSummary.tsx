import { api } from "convex/_generated/api.js"
import type { Doc } from "convex/_generated/dataModel.js"
import { useQuery } from "convex/react"
import type { RolledDie } from "convex/schema.ts"
import { DieIcon } from "~/dice/DieIcon.tsx"
import { clientEnv } from "~/env.ts"
import { Panel } from "~/ui/Panel.tsx"
import { Tooltip } from "~/ui/Tooltip.tsx"
import { RelativeTimestamp } from "../ui/RelativeTimestamp"

export function GenesysDiceRollSummary({
	diceRoll,
}: {
	diceRoll: Doc<"diceRolls">
}) {
	console.log(diceRoll)
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
				{diceRoll.rolledDice.map((die) => (
					<li key={die.key}>
						<RolledDieIcon rolled={die} />
					</li>
				))}
			</ul>
			<p className="text-sm text-theme-copy-lighter">
				rolled by <span className="text-theme-copy">{diceRoll.rolledBy}</span>{" "}
				<RelativeTimestamp date={diceRoll._creationTime} addSuffix />
			</p>
		</Panel>
	)
}

function RolledDieIcon({ rolled }: { rolled: RolledDie }) {
	const diceType = useQuery(api.diceTypes.get, { diceTypeId: rolled.type })
	const face = diceType?.faces[rolled.face]
	const symbolSize = (face?.symbols.length ?? 0) > 1 ? "small" : "normal"

	return (
		<Tooltip
			className="relative size-14"
			tooltip={diceType?.name}
			aria-label={diceType?.name}
		>
			{diceType && <DieIcon die={diceType} className="size-full" />}
			<div className="flex-center absolute inset-0 flex-col">
				{face?.symbols.map((symbol, index) =>
					symbol.type === "text" ? (
						<span
							key={index}
							className={symbolSize === "small" ? "text-base" : "text-lg"}
						>
							{symbol.value}
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
