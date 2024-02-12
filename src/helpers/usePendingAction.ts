import * as React from "react"
import { toast } from "react-hot-toast"

export function usePendingAction<Args extends unknown[]>(
	callback: ((...args: Args) => unknown) | undefined,
) {
	const [pending, setPending] = React.useState(false)
	const actionIdRef = React.useRef<string>()

	const handleClick = (...args: Args) => {
		const actionId = (actionIdRef.current = String(Date.now()))
		setPending(true)

		void (async () => {
			try {
				await callback?.(...args)
			} catch (error) {
				console.error(error)
				toast.error("Heck, something went wrong. Try again?")
			}

			if (actionIdRef.current === actionId) {
				setPending(false)
			}
		})()
	}

	return [handleClick, pending] as const
}
