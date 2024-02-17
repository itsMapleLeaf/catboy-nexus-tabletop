export const ok = (body?: BodyInit | null, init?: ResponseInit) =>
	new Response(body, { ...init, status: 200 })

export const notFound = (body?: BodyInit | null, init?: ResponseInit) =>
	new Response(body, { ...init, status: 404 })

export const badRequest = (body?: BodyInit | null, init?: ResponseInit) =>
	new Response(body, { ...init, status: 400 })

export const unauthorized = (body?: BodyInit | null, init?: ResponseInit) =>
	new Response(body, { ...init, status: 401 })

export const forbidden = (body?: BodyInit | null, init?: ResponseInit) =>
	new Response(body, { ...init, status: 403 })

export const internalServerError = (
	body?: BodyInit | null,
	init?: ResponseInit,
) => new Response(body, { ...init, status: 500 })
