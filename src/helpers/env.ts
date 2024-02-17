import type * as z from "zod"

type EnvRecord = Record<string, string | undefined>

export function validateEnv<Output>(
	schema: z.ZodSchema<Output, z.ZodTypeDef, EnvRecord>,
	env: EnvRecord,
) {
	const result = schema.safeParse(env)
	if (!result.success) {
		const formattedErrorList = result.error.errors
			.map((e) => `- ${e.path.join(".")}: ${e.message}`)
			.join("\n")
		throw new Error(`❌ Environment validation failed:\n${formattedErrorList}`)
	}
	return result.data
}
