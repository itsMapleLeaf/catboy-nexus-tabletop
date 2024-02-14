import * as React from "react"
import { createContext } from "react"
import { raise } from "./errors.ts"

export function defineContext<T>() {
	const Context = createContext<T | undefined>(undefined)

	function Provider(props: { children: React.ReactNode; value: T }) {
		return (
			<Context.Provider value={props.value}>{props.children}</Context.Provider>
		)
	}

	function useContextValue() {
		const value = React.useContext(Context)
		return value ?? raise("useContextValue must be used within a Provider")
	}

	return [Provider, useContextValue] as const
}
