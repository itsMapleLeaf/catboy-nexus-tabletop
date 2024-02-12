import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { twMerge } from "tailwind-merge"
import { raise } from "~/helpers/errors.ts"
import { useIsomorphicLayoutEffect } from "~/helpers/useIsomorphicLayoutEffect.tsx"
import backgroundUrl from "./bg.webp"

export function Background() {
	const imageRef = useRef<HTMLImageElement>(null)
	const [loaded, setLoaded] = useState(false)

	useIsomorphicLayoutEffect(() => {
		const image = imageRef.current ?? raise("image ref not set")
		void (async () => {
			await imageComplete(image)
			flushSync(() => {
				setLoaded(true)
			})
		})()
	}, [])

	return (
		<img
			src={backgroundUrl}
			alt=""
			className={twMerge(
				"absolute inset-x-0 -z-10 h-auto max-h-full w-full object-cover brightness-[0.3] transition duration-700",
				loaded ? "opacity-100" : "opacity-0",
			)}
			style={{
				maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, ${getExponentialGradientStops(0.5, 1, 8)})`,
			}}
			ref={imageRef}
			aria-hidden
		/>
	)
}

function imageComplete(image: HTMLImageElement): Promise<void> {
	return new Promise((resolve) => {
		if (image.complete) {
			resolve()
		} else {
			const handleLoad = () => {
				resolve()
				image.removeEventListener("load", handleLoad)
			}
			image.addEventListener("load", handleLoad)
		}
	})
}

function getExponentialGradientStops(
	start: number,
	end: number,
	steps: number,
) {
	return [
		...range(steps).map((step) => {
			const value = lerp(start, end, (step / steps) ** 3)
			return `rgba(0, 0, 0, 1) ${value * 100}%`
		}),
		`rgba(0, 0, 0, 0) ${end * 100}%`,
	].join(", ")
}

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t
}

function range(length: number) {
	return [...Array(length).keys()]
}
