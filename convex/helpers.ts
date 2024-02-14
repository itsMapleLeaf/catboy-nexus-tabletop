import { raise } from "~/helpers/errors.ts"
import type { TableNames } from "./_generated/dataModel"
import type { QueryCtx } from "./_generated/server"

export function requireValidId<T extends TableNames>(
	ctx: QueryCtx,
	table: T,
	id: string,
) {
	return ctx.db.normalizeId(table, id) ?? raise("Invalid room ID")
}
