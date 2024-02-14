import React from "react"

export function useRect(
	targetRef: Element | React.RefObject<Element> | null | undefined,
) {
	const [rect, setRect] = React.useState<DOMRectReadOnly>()

	React.useEffect(() => {
		const target = targetRef instanceof Element ? targetRef : targetRef?.current
		if (target == null) return

		const observer = new ResizeObserver((entries) => {
			if (entries[0]) setRect(entries[0].contentRect)
		})

		observer.observe(target)

		return () => {
			observer.disconnect()
		}
	}, [targetRef])

	return rect
}
