import * as z from "zod"
import { validateEnv } from "~/helpers/env.ts"
import { pick } from "~/helpers/object.ts"

export const convexEnv = validateEnv(
	z.object({
		CONVEX_AUTH_DOMAIN: z.string().url(),
		CLERK_SECRET_KEY: z.string(),
		CLERK_WEBHOOK_SECRET: z.string(),
	}),
	pick(process.env, [
		"CONVEX_AUTH_DOMAIN",
		"CLERK_SECRET_KEY",
		"CLERK_WEBHOOK_SECRET",
	]),
)
