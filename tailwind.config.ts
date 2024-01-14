import { Config } from "tailwindcss"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette.js"
import plugin from "tailwindcss/plugin"

export default {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				theme: {
					primary: "hsl(136, 64%, 35%)",
					"primary-content": "hsl(136, 64%, 85%)",
					"primary-dark": "hsl(136, 63%, 25%)",
					"primary-light": "hsl(136, 64%, 45%)",

					secondary: "hsl(316, 64%, 35%)",
					"secondary-content": "hsl(316, 64%, 85%)",
					"secondary-dark": "hsl(316, 63%, 25%)",
					"secondary-light": "hsl(316, 64%, 45%)",

					background: "hsl(137, 14%, 10%)",
					foreground: "hsl(138, 13%, 15%)",
					border: "hsl(135, 13%, 25%)",

					copy: "hsl(120, 14%, 99%)",
					"copy-light": "hsl(138, 13%, 85%)",
					"copy-lighter": "hsl(136, 12%, 65%)",

					success: "hsl(120, 64%, 35%)",
					warning: "hsl(60, 64%, 35%)",
					error: "hsl(0, 64%, 35%)",

					"success-content": "hsl(120, 64%, 85%)",
					"warning-content": "hsl(0, 0%, 0%)",
					"error-content": "hsl(0, 64%, 85%)",
				},
			},
		},
	},
	plugins: [gridPlugin()],
} satisfies Config

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
