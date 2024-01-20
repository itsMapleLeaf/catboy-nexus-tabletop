import * as React from "react"

export function useLocalStorageState<T>({
	key,
	deserialize,
	serialize,
}: {
	key: string
	deserialize: (storedValue: string | null) => T
	serialize: (value: T) => string
}) {
	const [value, setValue] = React.useState<T>(deserialize(null))

	const load = useEffectEvent((key: string) => {
		const storedValue = localStorage.getItem(key)
		setValue(deserialize(storedValue))
	})

	const save = useEffectEvent((key: string, value: T) => {
		localStorage.setItem(key, serialize(value))
	})

	React.useLayoutEffect(() => load(key), [key, load])
	React.useEffect(() => save(key, value), [key, value, save])

	return [value, setValue] as const
}

export function useEffectEvent<Args extends unknown[], Return>(
	callback: (...args: Args) => Return,
) {
	const ref = React.useRef((...args: Args): Return => {
		throw new Error("useEffectEvent callback called during render")
	})

	React.useInsertionEffect(() => {
		ref.current = callback
	})

	return React.useCallback((...args: Args): Return => ref.current(...args), [])
}
