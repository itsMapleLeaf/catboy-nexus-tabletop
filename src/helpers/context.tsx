import * as React from "react"
import { raise } from "./errors.ts"

export function defineContext<T>() {
	const Context = React.createContext<T | undefined>(undefined)

	function useContextValue() {
		const value = React.useContext(Context)
		return value ?? raise("useContextValue must be used within a Provider")
	}

	return [Context.Provider, useContextValue] as const
}
