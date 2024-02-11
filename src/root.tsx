import { ClerkApp, ClerkErrorBoundary, useAuth } from "@clerk/remix"
import { rootAuthLoader } from "@clerk/remix/ssr.server"
import { dark } from "@clerk/themes"
import barlow300 from "@fontsource/barlow/latin-300.css?url"
import barlow400 from "@fontsource/barlow/latin-400.css?url"
import barlow500 from "@fontsource/barlow/latin-500.css?url"
import type { LoaderFunctionArgs } from "@remix-run/node"
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { useState } from "react"
import tailwind from "tailwindcss/tailwind.css?url"
import background from "./assets/bg.png"
import logo from "./assets/logo.svg"
import { colors } from "./ui/theme.ts"

export async function loader(args: LoaderFunctionArgs) {
	return rootAuthLoader(args)
}

function Root() {
	const [convexClient] = useState(
		() => new ConvexReactClient(import.meta.env.VITE_CONVEX_URL),
	)

	return (
		<html
			lang="en"
			style={{ backgroundImage: `url(${background})` }}
			className="text-balance break-words bg-cover bg-center bg-no-repeat text-theme-copy [word-break:break-words] selection:bg-theme-background/50"
		>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{`Catboy Nexus${process.env.NODE_ENV === "development" ? " [dev]" : ""}`}</title>
				<link rel="icon" href={logo} />
				<link rel="stylesheet" href={barlow300} />
				<link rel="stylesheet" href={barlow400} />
				<link rel="stylesheet" href={barlow500} />
				<link rel="stylesheet" href={tailwind} />
				<Meta />
				<Links />
			</head>
			<body className="min-h-dvh bg-black/50">
				<ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
					<Outlet />
				</ConvexProviderWithClerk>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default ClerkApp(Root, {
	appearance: {
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
	},
})

export const ErrorBoundary = ClerkErrorBoundary()
