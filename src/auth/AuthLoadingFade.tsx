import { useUser } from "@clerk/remix"
import { useConvexAuth } from "convex/react"
import { type ReactNode, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { useIsomorphicLayoutEffect } from "../helpers/useIsomorphicLayoutEffect"

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
