import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import vercel from "vite-plugin-vercel"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [solid(), tsconfigPaths(), vercel()],
	css: {
		devSourcemap: true,
	},
})
