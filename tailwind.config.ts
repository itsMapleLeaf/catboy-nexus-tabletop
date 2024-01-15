import containerQueries from "@tailwindcss/container-queries"
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme.js"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette.js"
import plugin from "tailwindcss/plugin.js"

export default {
	content: ["src/**/*.{js,jsx,ts,tsx}", "index.html"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Barlow", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				theme: {
					primary: "hsl(253, 58%, 44%)",
					"primary-content": "hsl(254, 59%, 94%)",
					"primary-dark": "hsl(254, 58%, 34%)",
					"primary-light": "hsl(253, 58%, 54%)",

					secondary: "hsl(343, 58%, 44%)",
					"secondary-content": "hsl(342, 59%, 94%)",
					"secondary-dark": "hsl(343, 58%, 34%)",
					"secondary-light": "hsl(343, 58%, 54%)",

					background: "hsl(253, 18%, 10%)",
					foreground: "hsl(254, 17%, 15%)",
					border: "hsl(254, 17%, 25%)",

					copy: "hsl(240, 14%, 99%)",
					"copy-light": "hsl(254, 17%, 85%)",
					"copy-lighter": "hsl(254, 17%, 65%)",

					success: "hsl(120, 58%, 44%)",
					warning: "hsl(60, 58%, 44%)",
					error: "hsl(0, 58%, 44%)",

					"success-content": "hsl(120, 59%, 94%)",
					"warning-content": "hsl(0, 0%, 0%)",
					"error-content": "hsl(0, 59%, 94%)",
				},
			},
		},
	},
	plugins: [containerQueries, flexShortcutsPlugin(), gridPlugin()],
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
