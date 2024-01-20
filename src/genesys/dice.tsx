import * as Lucide from "lucide-react"
import { titleCase } from "~/helpers/string.ts"
import { type GenesysSymbol, genesysSymbols } from "./symbols.ts"

export type GenesysDie = {
	id: string
	label: string
	faces: ReadonlyArray<
		readonly [] | [GenesysSymbol] | [GenesysSymbol, GenesysSymbol]
	>
	element: React.ReactElement
}

function defineGenesysDie({
	id,
	label = titleCase(id),
	faces,
	element,
}: {
	id: string
	label?: string
	faces: GenesysDie["faces"]
	element: React.ReactElement
}): GenesysDie {
	return { id, label, faces, element }
}

export const genesysDice = {
	boost: defineGenesysDie({
		id: "boost",
		faces: [
			[],
			[],
			[genesysSymbols.success],
			[genesysSymbols.success, genesysSymbols.advantage],
			[genesysSymbols.advantage, genesysSymbols.advantage],
			[genesysSymbols.advantage],
		],
		element: <Lucide.Square className="text-sky-300" />,
	}),
	setback: defineGenesysDie({
		id: "setback",
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
	}),
	ability: defineGenesysDie({
		id: "ability",
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
	}),
	difficulty: defineGenesysDie({
		id: "difficulty",
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
	}),
	proficiency: defineGenesysDie({
		id: "proficiency",
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
	}),
	challenge: defineGenesysDie({
		id: "challenge",
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
	}),
}

export function getGenesisDice(): GenesysDie[] {
	return Object.entries(genesysDice).map(([id, die]) => ({
		...die,
		id,
		label: titleCase(id),
	}))
}

export function getGenesysDie(id: string): GenesysDie | undefined {
	const result = (genesysDice as Record<string, GenesysDie>)[id]
	return result ? { ...result, id, label: titleCase(id) } : undefined
}
