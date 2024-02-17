import * as z from "zod"
import { validateEnv } from "./helpers/env.ts"

export const serverEnv = validateEnv(
	z.object({
		CLERK_SECRET_KEY: z.string(),
		CLERK_PUBLISHABLE_KEY: z.string(),
	}),
	process.env,
)
