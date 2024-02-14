import * as React from "react"

const empty = Symbol("empty")

export function defineContext<T>() {
	const Context = React.createContext<T | typeof empty>(empty)

	function useContextValue() {
		const value = React.useContext(Context)
		if (value === empty) {
			throw new Error("useContextValue must be used within a Provider")
		}
		return value
	}

	return [Context.Provider, useContextValue] as const
}
