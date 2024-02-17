import { v } from "convex/values"
import { raise } from "~/helpers/errors.ts"
import { internal } from "./_generated/api"
import { httpAction, internalQuery } from "./_generated/server"

export const get = internalQuery({
	args: {
		slug: v.string(),
	},
	async handler(ctx, args) {
		return await ctx.db
			.query("images")
			.withIndex("by_slug", (q) => q.eq("slug", args.slug))
			.unique()
	},
})

export const serveImage = httpAction(async (ctx, request) => {
	const { searchParams } = new URL(request.url)

	const slug = searchParams.get("slug") ?? raise("missing param `slug`")

	const image =
		(await ctx.runQuery(internal.images.get, { slug })) ??
		raise(`image not found with slug "${slug}"`)

	const blob =
		(await ctx.storage.get(image.storageId)) ??
		raise(
			`blob not found with storageId "${image.storageId}" from image with slug "${slug}"`,
		)

	return new Response(blob)
})
