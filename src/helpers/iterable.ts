export function* mapIterable<T, U>(iterable: Iterable<T>, fn: (value: T) => U) {
	for (const value of iterable) {
		yield fn(value)
	}
}
