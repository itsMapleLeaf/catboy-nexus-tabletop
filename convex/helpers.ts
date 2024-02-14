import { raise } from "~/helpers/errors.ts"
import type { Doc, TableNames } from "./_generated/dataModel"
import type { QueryCtx } from "./_generated/server"

export function requireValidId<T extends TableNames>(
	ctx: QueryCtx,
	table: T,
	id: string,
) {
	return ctx.db.normalizeId(table, id) ?? raise("Invalid room ID")
}

export async function requireDoc<T extends TableNames>(
	ctx: QueryCtx,
	table: T,
	id: string,
): Promise<Doc<T>> {
	const validId = requireValidId(ctx, table, id)
	const doc = await ctx.db.get(validId)
	return doc ?? raise(`Couldn't find a doc with ID "${id}" in table "${table}"`)
}
