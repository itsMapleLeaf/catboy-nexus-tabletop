import { LucideWand2 } from "lucide-react"
import logo from "~/assets/logo.svg"
import { Button } from "~/ui/Button.tsx"
import { ExternalLink } from "~/ui/ExternalLink.tsx"
import { Link } from "~/ui/Link.tsx"

export default function Home() {
	return (
		<div className="flex min-h-dvh flex-col items-center">
			<div className="flex-1" />
			<main className="flex-col-center gap-6 p-6  text-center">
				<header className="flex items-center justify-center gap-3 drop-shadow-[0_0_4px_rgba(0,0,0,1)]">
					<img src={logo} alt="" className="h-16" />
					<h1 className="text-5xl font-light">Catboy Nexus</h1>
				</header>
				<p className="max-w-screen-md text-2xl drop-shadow-[0_0_3px_rgba(0,0,0,1)]">
					Welcome! Catboy Nexus is a work in progress virtual tabletop for
					rules-lite and rules-medium game systems. Currently supports Genesys,
					with others planned later.
				</p>
				<Button
					size="xl"
					appearance="solid"
					onClick={() => alert("Coming soon!")}
				>
					<LucideWand2 /> New Game
				</Button>
			</main>
			<footer className="flex flex-1 flex-col items-center justify-end">
				<p className="p-2 text-center text-sm">
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
