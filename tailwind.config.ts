import containerQueries from "@tailwindcss/container-queries"
import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import defaultTheme from "tailwindcss/defaultTheme.js"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette.js"
import plugin from "tailwindcss/plugin.js"
import { colors } from "./src/ui/theme.ts"

export default {
	content: ["src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Barlow", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				theme: colors,
			},
		},
	},
	plugins: [
		containerQueries,
		animate,
		flexShortcutsPlugin(),
		gridPlugin(),
		accessibleTouchAreaPlugin(),
	],
} satisfies Config

function flexShortcutsPlugin() {
	return plugin(function flexShortcuts(api) {
		api.addComponents({
			".flex-center": {
				display: "flex",
				"align-items": "center",
				"justify-content": "center",
			},
		})
	})
}

function gridPlugin() {
	return plugin(function grid(api) {
		api.matchUtilities(
			{
				"bg-grid": (value) => ({
					"background-size": `${value} ${value}`,
					"background-image": [
						"linear-gradient(to right, var(--tw-bg-grid-color) 0%, transparent 1px)",
						"linear-gradient(to bottom, var(--tw-bg-grid-color) 0%, transparent 1px)",
					].join(", "),
				}),
			},
			{
				type: "absolute-size",
				values: api.theme("size"),
			},
		)
		api.matchUtilities(
			{
				"bg-grid": (value) => ({
					"--tw-bg-grid-color": value,
				}),
			},
			{
				type: "color",
				values: flattenColorPalette(api.theme("colors")),
			},
		)
	})
}

// before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']
function accessibleTouchAreaPlugin() {
	return plugin(function accessibleTouchArea(api) {
		api.addComponents({
			".touch-area": {
				"@apply before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']":
					{},
			},
		})
	})
}
