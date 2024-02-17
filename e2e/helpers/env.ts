import { z } from "zod"
import { validateEnv } from "~/helpers/env.ts"

export const testEnv = validateEnv(
	z.object({
		VITE_CONVEX_URL: z.string().url(),
		TEST_USERNAME: z.string().default("test@example.com"),
	}),
	process.env,
)
