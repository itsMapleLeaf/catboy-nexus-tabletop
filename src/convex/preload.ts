import { useConvex } from "convex/react"
import type { FunctionArgs, FunctionReference } from "convex/server"
import { useEffect, useRef } from "react"

export function useQueryPreload<
	Query extends FunctionReference<"query", "public">,
>(query: Query, args: FunctionArgs<Query>) {
	const convex = useConvex()
	const unwatchRef = useRef<() => void>()

	const startPreload = () => {
		unwatchRef.current ??= convex.watchQuery(query, args).onUpdate(() => {})
	}

	useEffect(() => {
		return () => {
			const unwatch = unwatchRef.current
			if (unwatch) {
				// let it linger a bit so the page can latch onto the existing query
				// before we remove it
				setTimeout(() => unwatch(), 1000)
			}
		}
	}, [])

	return startPreload
}
