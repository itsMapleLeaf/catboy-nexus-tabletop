import { convexEnv } from "./env.ts"

export default {
	providers: [
		{
			domain: convexEnv.CONVEX_AUTH_DOMAIN,
			applicationID: "convex",
		},
	],
}
