import type { Doc, TableNames } from "convex/_generated/dataModel.js"
import type { UsePaginatedQueryResult } from "convex/react"
import type * as React from "react"
import { GridList } from "~/ui/GridList"
import { InfiniteScrollQuery } from "./InfiniteScrollQuery"

export function InfiniteScrollGrid<T extends Doc<TableNames>>({
	listResult,
	numItems,
	emptyState,
	children,
}: {
	listResult: UsePaginatedQueryResult<T>
	numItems: number
	emptyState?: React.ReactNode
	children: (item: T) => React.ReactNode
}) {
	return (
		<InfiniteScrollQuery listResult={listResult} numItems={numItems}>
			{(items) => (
				<GridList items={items} itemKey="_id" emptyState={emptyState}>
					{children}
				</GridList>
			)}
		</InfiniteScrollQuery>
	)
}
