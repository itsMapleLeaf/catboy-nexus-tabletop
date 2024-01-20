import { titleCase } from "~/helpers/string.ts"

export type GenesysSymbol = {
	id: string
	label: string
	image: string
}

function defineGenesysSymbol(id: string): GenesysSymbol {
	return {
		id,
		label: titleCase(id),
		image: new URL(`./assets/${id}.svg`, import.meta.url).href,
	}
}

export const genesysSymbols = {
	success: defineGenesysSymbol("success"),
	failure: defineGenesysSymbol("failure"),
	advantage: defineGenesysSymbol("advantage"),
	threat: defineGenesysSymbol("threat"),
	triumph: defineGenesysSymbol("triumph"),
	despair: defineGenesysSymbol("despair"),
	"light-point": defineGenesysSymbol("light-point"),
	"dark-point": defineGenesysSymbol("dark-point"),
}

export function getGenesysSymbols() {
	return Object.values(genesysSymbols)
}

export function getGenesysSymbol(id: string): GenesysSymbol | undefined {
	return (genesysSymbols as Record<string, GenesysSymbol>)[id]
}
