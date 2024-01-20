import { objectFromEntries } from "~/helpers/object.ts"
import { titleCase } from "~/helpers/string.ts"

export type GenesysSymbol = {
	id: string
	label: string
	image: string
}

const genesysSymbolNames = [
	"success",
	"failure",
	"advantage",
	"threat",
	"triumph",
	"despair",
	"light-point",
	"dark-point",
] as const

export const genesysSymbols = objectFromEntries(
	genesysSymbolNames.map((id) => {
		const symbol: GenesysSymbol = {
			id,
			label: titleCase(id),
			image: new URL(`./assets/${id}.svg`, import.meta.url).href,
		}
		return [id, symbol]
	}),
)

export const genesysSymbolRules = {
	[genesysSymbols.success.id]: {
		removes: genesysSymbols.failure.id,
	},
	[genesysSymbols.failure.id]: {
		removes: genesysSymbols.success.id,
	},
	[genesysSymbols.advantage.id]: {
		removes: genesysSymbols.threat.id,
	},
	[genesysSymbols.threat.id]: {
		removes: genesysSymbols.advantage.id,
	},
	[genesysSymbols.triumph.id]: {
		removes: genesysSymbols.despair.id,
	},
	[genesysSymbols.despair.id]: {
		removes: genesysSymbols.triumph.id,
	},
}

export function getGenesysSymbols() {
	return Object.values(genesysSymbols)
}

export function getGenesysSymbol(id: string): GenesysSymbol | undefined {
	const record: Record<string, GenesysSymbol> = genesysSymbols
	return record[id]
}
