import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
	css: {
		devSourcemap: true,
	},
	start: {
		server: {
			preset: "vercel",
		},
	},
})
