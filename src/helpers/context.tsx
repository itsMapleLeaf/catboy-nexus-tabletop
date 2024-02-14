import * as React from "react"
import { createContext } from "react"

export function defineContext<T>() {
	const Context = createContext<T | undefined>(undefined)

	function Provider(props: { children: React.ReactNode; value: T }) {
		return (
			<Context.Provider value={props.value}>{props.children}</Context.Provider>
		)
	}

	function useContextValue() {
		const context = React.useContext(Context)
		if (!context) {
			throw new Error("useRoom must be used within a RoomProvider")
		}
		return context
	}

	return [Provider, useContextValue] as const
}
