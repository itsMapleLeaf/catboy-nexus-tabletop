export function objectFromEntries<K extends PropertyKey, V>(
	entries: Iterable<readonly [K, V]>,
) {
	return Object.fromEntries(entries) as Record<K, V>
}

export function mapValues<K extends PropertyKey, In, Out>(
	obj: Record<K, In>,
	fn: (value: In, key: K) => Out,
) {
	return objectFromEntries(
		Object.entries<In>(obj).map(([key, value]) => [key, fn(value, key as K)]),
	) as Record<K, Out>
}
