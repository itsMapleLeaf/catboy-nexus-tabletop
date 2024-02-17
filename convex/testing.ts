import {
	customCtx,
	customMutation,
	customQuery,
} from "convex-helpers/server/customFunctions.js"
import { mutation, query } from "./_generated/server"

export function requireTestEnv() {
	if (process.env.NODE_ENV === "production") {
		throw new Error("This endpoint is not available in production")
	}
	return {}
}

export const testQuery = customQuery(query, customCtx(requireTestEnv))
export const testMutation = customMutation(mutation, customCtx(requireTestEnv))
