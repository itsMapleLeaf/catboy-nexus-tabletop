import { httpRouter } from "convex/server"
import { handleClerkWebhook } from "./auth.ts"
import { serveImage } from "./images.ts"

const http = httpRouter()

http.route({
	path: "/webhooks/clerk",
	method: "POST",
	handler: handleClerkWebhook,
})

http.route({
	path: "/images",
	method: "GET",
	handler: serveImage,
})

export default http
