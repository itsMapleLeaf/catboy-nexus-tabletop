import * as React from "react"

const empty = Symbol("empty")

export function defineContext<Props extends object, Value>(
	useInit: (props: Props & { children: React.ReactNode }) => Value,
) {
	const Context = React.createContext<Value | typeof empty>(empty)

	function Provider(props: Props & { children: React.ReactNode }) {
		const value = useInit(props)
		return <Context.Provider value={value}>{props.children}</Context.Provider>
	}

	function useValue() {
		const value = React.useContext(Context)
		if (value === empty) {
			throw new Error(`${useValue.name} must be used within a ${Provider.name}`)
		}
		return value
	}

	return [Provider, useValue] as const
}
