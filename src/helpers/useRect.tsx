import React from "react"

export function useRect<Target extends Element>(
	targetRef: Target | React.RefObject<Target>,
) {
	const [rect, setRect] = React.useState<DOMRectReadOnly>()

	React.useEffect(() => {
		const target = targetRef instanceof Element ? targetRef : targetRef.current

		const observer = new ResizeObserver((entries) => {
			if (entries[0]) setRect(entries[0].contentRect)
		})

		if (target) {
			observer.observe(target)
		}

		return () => {
			observer.disconnect()
		}
	}, [targetRef])

	return rect
}
