import { SignInButton, UserButton, useUser } from "@clerk/remix"
import { getAuth } from "@clerk/remix/ssr.server"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { type HeadersFunction, redirect } from "@vercel/remix"
import { LucideLogIn, LucideWand2 } from "lucide-react"
import logo from "~/assets/logo.svg"
import { Background } from "~/ui/Background.tsx"
import { Button } from "~/ui/Button.tsx"
import { ExternalLink } from "~/ui/ExternalLink.tsx"
import { Link } from "~/ui/Link.tsx"
import { PromptButton } from "~/ui/PromptButton.tsx"

export async function loader(args: LoaderFunctionArgs) {
	const auth = await getAuth(args)
	return auth.userId ? redirect("/rooms") : new Response()
}

export const headers: HeadersFunction = () => ({
	"Cache-Control": "public, stale-while-revalidate",
})

export default function Home() {
	const { isLoaded } = useUser()
	return (
		<div className="relative flex min-h-dvh flex-col items-center overflow-clip">
			<Background />
			<header className="flex w-full flex-1 flex-col p-3">
				<div className="ml-auto opacity-70 transition focus-within:opacity-100 hover:opacity-100">
					<UserButton />
				</div>
			</header>
			<main className="flex-col-center gap-6 p-6 text-center">
				<header className="flex items-center justify-center gap-3 drop-shadow-[0_0_4px_rgba(0,0,0,1)]">
					<img src={logo} alt="" className="h-16" />
					<h1 className="text-5xl font-light">Catboy Nexus</h1>
				</header>

				<p className="max-w-screen-md text-2xl drop-shadow-[0_0_3px_rgba(0,0,0,1)]">
					Welcome! Catboy Nexus is a work in progress virtual tabletop for
					rules-lite and rules-medium game systems. Currently supports Genesys,
					with others planned later.
				</p>

				<div
					className="flex-col-center h-[5.25rem] opacity-0 transition data-[loaded=true]:opacity-100"
					data-loaded={isLoaded}
				>
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
