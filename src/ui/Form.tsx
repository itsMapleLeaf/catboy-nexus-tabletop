import * as React from "react"
import { usePendingAction } from "~/helpers/usePendingAction.ts"

const FormContext = React.createContext({
	pending: false,
})

export function Form(
	props: Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit"> & {
		onSubmit?: (event: React.FormEvent<HTMLFormElement>) => unknown
	},
) {
	const [handleSubmit, pending] = usePendingAction(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			await props.onSubmit?.(event)
		},
	)

	return (
		<FormContext.Provider value={{ pending }}>
			<form {...props} onSubmit={handleSubmit} />
		</FormContext.Provider>
	)
}

export function useFormContext() {
	return React.useContext(FormContext)
}
