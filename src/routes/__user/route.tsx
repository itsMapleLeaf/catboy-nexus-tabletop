import { UserButton } from "@clerk/remix"
import { getAuth } from "@clerk/remix/ssr.server"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { Link, NavLink, Outlet } from "@remix-run/react"
import { redirect } from "@vercel/remix"
import { useConvexAuth } from "convex/react"
import { LucideHome } from "lucide-react"
import logo from "~/assets/logo.svg"
import { Background } from "~/ui/Background.tsx"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"
import { Tooltip } from "~/ui/Tooltip.tsx"

export async function loader(args: LoaderFunctionArgs) {
	const auth = await getAuth(args)
	return auth.userId ? new Response() : redirect("/")
}

export default function UserRouteLayout() {
	const auth = useConvexAuth()
	return (
		<>
			<nav className="fixed inset-y-0 left-0 flex h-dvh w-12 flex-col items-center gap-2 bg-theme-foreground py-3">
				<Link
					to="/"
					prefetch="intent"
					className="opacity-70 transition hover:opacity-100 focus-visible:opacity-100"
				>
					<img src={logo} alt="Logo" className="size-6" />
				</Link>
				<hr className="w-full border-theme-border" />
				<Tooltip tooltip="Your Rooms" placement="right">
					<NavLink
						to="/rooms"
						end
						prefetch="intent"
						className="flex-center size-8 rounded-md opacity-50 transition hover:opacity-100 focus-visible:opacity-100 aria-[current=page]:bg-theme-border aria-[current=page]:opacity-100"
					>
						<LucideHome className="size-6" />
					</NavLink>
				</Tooltip>

				<div className="mt-auto opacity-70 transition hover:opacity-100">
					<UserButton afterSignOutUrl="/" />
				</div>
			</nav>
			<div className="relative isolate ml-12 min-h-dvh overflow-clip bg-theme-background shadow-lg">
				<Background />
				{auth.isLoading ? <LoadingPlaceholder /> : <Outlet />}
			</div>
		</>
	)
}
