import { SignInButton } from "@clerk/remix"
import { getAuth } from "@clerk/remix/ssr.server"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { type HeadersFunction, redirect } from "@vercel/remix"
import { LucideLogIn } from "lucide-react"
import { $path } from "remix-routes"
import logo from "~/assets/logo.svg"
import { ok } from "~/helpers/responses.ts"
import { Background } from "~/ui/Background.tsx"
import { Button } from "~/ui/Button.tsx"
import { ExternalLink } from "~/ui/ExternalLink.tsx"
import { Link } from "~/ui/Link.tsx"

export async function loader(args: LoaderFunctionArgs) {
	const auth = await getAuth(args)
	return auth.userId ? redirect($path("/rooms")) : ok()
}

export const headers: HeadersFunction = () => ({
	"Cache-Control": "public, stale-while-revalidate",
})

export default function LandingPage() {
	return (
		<div className="relative flex min-h-dvh flex-col items-center overflow-clip">
			<Background />
			<div className="flex-1" />

			<main className="flex-col-center gap-6 p-6 text-center">
				<header className="flex items-center justify-center gap-3 drop-shadow-[0_0_4px_rgba(0,0,0,1)]">
					<img src={logo} alt="" className="h-16" />
					<h1 className="text-5xl font-light" data-testid="landing-title">
						Catboy Nexus
					</h1>
				</header>

				<p className="max-w-screen-md text-2xl drop-shadow-[0_0_3px_rgba(0,0,0,1)]">
					Welcome! Catboy Nexus is a work in progress virtual tabletop for
					rules-lite and rules-medium game systems. Currently supports Genesys,
					with others planned later.
				</p>

				<div className="flex-col-center h-[5.25rem]">
					<SignInButton mode="modal">
						<Button
							size="xl"
							appearance="solid"
							className="animate-in fade-in"
							icon={<LucideLogIn />}
						>
							Sign In
						</Button>
					</SignInButton>
				</div>
			</main>

			<footer className="flex flex-1 flex-col items-center justify-end">
				<p className="p-2 text-center text-sm text-theme-copy/70">
					Powered by{" "}
					<Link as={ExternalLink} href="https://convex.dev">
						Convex
					</Link>{" "}
					and{" "}
					<Link as={ExternalLink} href="https://clerk.com">
						Clerk
					</Link>
					.
				</p>
			</footer>
		</div>
	)
}
