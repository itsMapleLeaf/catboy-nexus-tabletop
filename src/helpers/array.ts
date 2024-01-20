import type { Booleanish } from "./types.ts"

export function removeFirstWhere<T>(
	array: T[],
	predicate: (item: T) => Booleanish,
) {
	const index = array.findIndex(predicate)
	if (index >= 0) {
		array.splice(index, 1)
	}
}
