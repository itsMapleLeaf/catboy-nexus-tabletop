import { mapIterable } from "./iterable.ts"

export function objectFromEntries<K extends PropertyKey, V>(
	entries: Iterable<readonly [K, V]>,
) {
	return Object.fromEntries(entries) as Record<K, V>
}

export function mapValues<K extends PropertyKey, In, Out>(
	record: Record<K, In>,
	fn: (value: In, key: string) => Out,
) {
	return objectFromEntries(
		Object.entries<In>(record).map(([key, value]) => [key, fn(value, key)]),
	) as Record<K, Out>
}

export function pick<T, const K extends keyof T>(input: T, keys: Iterable<K>) {
	return objectFromEntries(
		mapIterable(keys, (key) => [key, input[key]]),
	) as Pick<T, K>
}
