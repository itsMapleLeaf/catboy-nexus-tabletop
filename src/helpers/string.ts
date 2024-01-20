export function titleCase(name: string): string {
	return [...name.matchAll(/[a-z]+/gi)]
		.map(
			([word]) => (word[0] ?? "").toUpperCase() + word.slice(1).toLowerCase(),
		)
		.join(" ")
}
