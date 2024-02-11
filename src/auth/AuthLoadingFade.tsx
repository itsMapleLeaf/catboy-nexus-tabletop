import { useUser } from "@clerk/remix"
import { useConvexAuth } from "convex/react"
import { type ReactNode, useEffect, useLayoutEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function AuthLoadingFade({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	const convexAuth = useConvexAuth()
	const clerkAuth = useUser()
	const isClient = useIsClient()
	useEffect(() => {
		console.log("convexAuth", convexAuth)
		console.log("clerkAuth", clerkAuth)
	}, [convexAuth, clerkAuth])
	return (
		<div
			className={twMerge("animate-in fade-in", className)}
			hidden={convexAuth.isLoading || !clerkAuth.isLoaded || !isClient}
		>
			{children}
		</div>
	)
}

function useIsClient() {
	const [mounted, setMounted] = useState(false)
	useIsomorphicLayoutEffect(() => {
		setMounted(true)
	}, [])
	return mounted
}

const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect
