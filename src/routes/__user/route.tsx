import { getAuth } from "@clerk/remix/ssr.server"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { redirect } from "@vercel/remix"
import { useConvexAuth } from "convex/react"
import { Background } from "~/ui/Background.tsx"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"

export async function loader(args: LoaderFunctionArgs) {
	const auth = await getAuth(args)
	return auth.userId ? new Response() : redirect("/")
}

export default function UserRouteLayout() {
	const auth = useConvexAuth()
	return (
		<div className="relative isolate min-h-dvh overflow-clip bg-theme-background">
			<Background />
			{auth.isLoading ? <LoadingPlaceholder /> : <Outlet />}
		</div>
	)
}
