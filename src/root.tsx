import "@fontsource/barlow/latin-300.css"
import "@fontsource/barlow/latin-400.css"
import "@fontsource/barlow/latin-500.css"
import "tailwindcss/tailwind.css"

import {
	ClerkApp,
	ClerkErrorBoundary,
	type RemixClerkProviderProps,
} from "@clerk/remix"
import { rootAuthLoader } from "@clerk/remix/ssr.server"
import { dark } from "@clerk/themes"
import type { LoaderFunctionArgs } from "@remix-run/node"
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react"
import background from "./assets/bg.png"
import logo from "./assets/logo-filled-light.svg"
import { colors } from "./ui/theme.ts"

const clerkAppearance: RemixClerkProviderProps["appearance"] = {
	baseTheme: dark,
	variables: {
		borderRadius: "0.125rem",
		colorAlphaShade: colors.copy,
		colorBackground: colors.background,
		colorInputBackground: colors.foreground,
		colorInputText: colors.copy,
		colorPrimary: colors["primary-light"],
		colorText: colors.copy,
		colorTextOnPrimaryBackground: colors["primary-content"],
		colorTextSecondary: colors["copy-lighter"],
	},
	elements: {
		card: {
			boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
		},
	},
}

export async function loader(args: LoaderFunctionArgs) {
	return rootAuthLoader(args)
}

function Root() {
	return (
		<html
			lang="en"
			style={{ backgroundImage: `url(${background})` }}
			className="bg-cover bg-center bg-no-repeat text-theme-copy"
		>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{`Catboy Nexus${process.env.NODE_ENV === "development" ? " [dev]" : ""}`}</title>
				<link rel="icon" href={logo} />
				<Meta />
				<Links />
			</head>
			<body>
				<div className="h-dvh bg-black/50">
					<Outlet />
				</div>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default ClerkApp(Root, { appearance: clerkAppearance })

export const ErrorBoundary = ClerkErrorBoundary()
