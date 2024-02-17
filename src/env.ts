import { z } from "zod"
import { validateEnv } from "./helpers/env.ts"

export const clientEnv = validateEnv(
	z.object({
		VITE_CONVEX_URL: z.string().url(),
		VITE_CONVEX_SITE_URL: z.string().url(),
	}),
	{
		VITE_CONVEX_URL: import.meta.env.VITE_CONVEX_URL,
		VITE_CONVEX_SITE_URL: import.meta.env.VITE_CONVEX_SITE_URL,
	},
)
