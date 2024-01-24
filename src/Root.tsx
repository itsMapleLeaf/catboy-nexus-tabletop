import { ClerkProvider, type ClerkProviderProps } from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import { App } from "./App.tsx"
import { colors } from "./ui/theme.ts"

export function Root() {
	return (
		<ClerkProvider
			appearance={clerkAppearance}
			publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
		>
			<App />
		</ClerkProvider>
	)
}

const clerkAppearance: ClerkProviderProps["appearance"] = {
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
