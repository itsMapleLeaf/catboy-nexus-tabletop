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

export function getGenesysSymbols() {
	return Object.values(genesysSymbols)
}

export function getGenesysSymbol(id: string): GenesysSymbol | undefined {
	const record: Record<string, GenesysSymbol> = genesysSymbols
	return record[id]
}
