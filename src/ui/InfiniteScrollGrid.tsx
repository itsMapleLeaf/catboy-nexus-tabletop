import type {
	PaginatedQueryArgs,
	PaginatedQueryItem,
	PaginatedQueryReference,
} from "convex/react"
import type * as React from "react"
import { GridList } from "~/ui/GridList"
import { InfiniteScrollQuery } from "./InfiniteScrollQuery"

export function InfiniteScrollGrid<Query extends PaginatedQueryReference>({
	query,
	args,
	numItems = 20,
	emptyState,
	children,
}: {
	query: Query
	args: PaginatedQueryArgs<Query>
	numItems?: number
	emptyState?: React.ReactNode
	children: (item: PaginatedQueryItem<Query>) => React.ReactNode
}) {
	return (
		<InfiniteScrollQuery query={query} args={args} numItems={numItems}>
			{(items) => (
				<GridList items={items} itemKey="_id" emptyState={emptyState}>
					{children}
				</GridList>
			)}
		</InfiniteScrollQuery>
	)
}
