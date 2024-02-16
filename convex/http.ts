import { httpRouter } from "convex/server"
import { handleClerkWebhook } from "./auth.ts"

const http = httpRouter()

http.route({
	path: "/webhooks/clerk",
	method: "POST",
	handler: handleClerkWebhook,
})

export default http
