import * as Lucide from "lucide-react"
import { mapValues } from "~/helpers/object.ts"
import { titleCase } from "~/helpers/string.ts"
import { type GenesysSymbol, genesysSymbols } from "./symbols.ts"

export type GenesysDie = {
	id: string
	label: string
	faces: ReadonlyArray<ReadonlyArray<GenesysSymbol>>
	element: React.ReactElement
}

const genesysDiceBase = {
	boost: {
		faces: [
			[],
			[],
			[genesysSymbols.success],
			[genesysSymbols.success, genesysSymbols.advantage],
			[genesysSymbols.advantage, genesysSymbols.advantage],
			[genesysSymbols.advantage],
		],
		element: <Lucide.Square className="text-sky-300" />,
	},
	setback: {
		faces: [
			[],
			[],
			[genesysSymbols.failure],
			[genesysSymbols.failure],
			[genesysSymbols.threat],
			[genesysSymbols.threat],
		],
		element: (
			<Lucide.Square className="text-neutral-900 drop-shadow-[0_0_1px_white]" />
		),
	},
	ability: {
		faces: [
			[],
			[genesysSymbols.success],
			[genesysSymbols.success],
			[genesysSymbols.success, genesysSymbols.success],
			[genesysSymbols.advantage],
			[genesysSymbols.advantage],
			[genesysSymbols.success, genesysSymbols.advantage],
			[genesysSymbols.advantage, genesysSymbols.advantage],
		],
		element: <Lucide.Diamond className="text-green-300" />,
	},
	difficulty: {
		faces: [
			[],
			[genesysSymbols.failure],
			[genesysSymbols.failure, genesysSymbols.failure],
			[genesysSymbols.threat],
			[genesysSymbols.threat],
			[genesysSymbols.threat],
			[genesysSymbols.threat, genesysSymbols.threat],
			[genesysSymbols.failure, genesysSymbols.threat],
		],
		element: <Lucide.Diamond className="text-purple-300" />,
	},
	proficiency: {
		faces: [
			[],
			[genesysSymbols.success],
			[genesysSymbols.success],
			[genesysSymbols.success, genesysSymbols.success],
			[genesysSymbols.success, genesysSymbols.success],
			[genesysSymbols.advantage],
			[genesysSymbols.success, genesysSymbols.advantage],
			[genesysSymbols.success, genesysSymbols.advantage],
			[genesysSymbols.success, genesysSymbols.advantage],
			[genesysSymbols.advantage, genesysSymbols.advantage],
			[genesysSymbols.advantage, genesysSymbols.advantage],
			[genesysSymbols.triumph],
		],
		element: <Lucide.Pentagon className="-translate-y-0.5 text-yellow-300" />,
	},
	challenge: {
		faces: [
			[],
			[genesysSymbols.failure],
			[genesysSymbols.failure],
			[genesysSymbols.failure, genesysSymbols.failure],
			[genesysSymbols.failure, genesysSymbols.failure],
			[genesysSymbols.threat],
			[genesysSymbols.threat],
			[genesysSymbols.failure, genesysSymbols.threat],
			[genesysSymbols.failure, genesysSymbols.threat],
			[genesysSymbols.threat, genesysSymbols.threat],
			[genesysSymbols.threat, genesysSymbols.threat],
			[genesysSymbols.despair],
		],
		element: <Lucide.Pentagon className="-translate-y-0.5 text-red-300" />,
	},
} as const

export const genesysDice = mapValues(
	genesysDiceBase,
	(die, id): GenesysDie => ({
		...die,
		id,
		label: titleCase(id),
	}),
)

const genesysDiceArray = Object.values(genesysDice)

export function getGenesisDice(): GenesysDie[] {
	return genesysDiceArray
}

export function getGenesysDie(id: string): GenesysDie | undefined {
	const record: Record<string, GenesysDie> = genesysDice
	return record[id]
}
