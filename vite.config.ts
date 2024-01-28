import { unstable_vitePlugin as remix } from "@remix-run/dev"
import { remixDevTools } from "remix-development-tools/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [
		remixDevTools(),
		remix({
			appDirectory: "src",
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
			},
		}),
		tsconfigPaths(),
	],
	css: {
		devSourcemap: true,
	},
	ssr: {
		noExternal: ["@clerk/clerk-react"],
	},
	build: {
		rollupOptions: {
			onwarn(warning, next) {
				// Suppress warnings about "use client" directives
				if (warning.message.includes("use client")) return
				next(warning)
			},
		},
	},
})
