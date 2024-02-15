import { UserButton } from "@clerk/remix"
import { getAuth } from "@clerk/remix/ssr.server"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { Link, Outlet } from "@remix-run/react"
import { redirect } from "@vercel/remix"
import { useConvexAuth } from "convex/react"
import { $path } from "remix-routes"
import logo from "~/assets/logo.svg"
import { Background } from "~/ui/Background.tsx"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"
import { Panel } from "~/ui/Panel.tsx"

export async function loader(args: LoaderFunctionArgs) {
	const auth = await getAuth(args)
	return auth.userId ? new Response() : redirect($path("/"))
}

export default function UserRouteLayout() {
	const auth = useConvexAuth()
	return (
		<div className="relative isolate flex min-h-dvh overflow-clip bg-theme-background">
			<Background />
			<Panel
				as="nav"
				className="z-1 flex w-12 flex-col items-center gap-3 py-3"
				border="right"
				appearance="translucent"
			>
				<Link to={$path("/")} className="flex-center hover-fade -m-2 p-2">
					<img src={logo} alt="Home" className="size-6" />
				</Link>
				<div className="hover-fade mt-auto">
					<UserButton />
				</div>
			</Panel>
			<div className="min-w-0 flex-1">
				{auth.isLoading ? <LoadingPlaceholder /> : <Outlet />}
			</div>
		</div>
	)
}
