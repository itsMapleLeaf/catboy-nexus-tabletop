import {
	type PaginatedQueryArgs,
	type PaginatedQueryItem,
	type PaginatedQueryReference,
	usePaginatedQuery,
} from "convex/react"
import { LucideChevronDown } from "lucide-react"
import type * as React from "react"
import { Button } from "~/ui/Button.tsx"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"

export function InfiniteScrollQuery<Query extends PaginatedQueryReference>({
	query,
	args,
	numItems,
	children,
}: {
	query: Query
	args: PaginatedQueryArgs<Query>
	numItems: number
	children: (items: Array<PaginatedQueryItem<Query>>) => React.ReactNode
}) {
	const list = usePaginatedQuery(query, args, { initialNumItems: numItems })
	return (
		<div className="flex flex-col gap-4">
			<div>
				{list.status === "LoadingFirstPage" ? (
					<LoadingPlaceholder />
				) : (
					children(list.results)
				)}
			</div>
			{list.status === "CanLoadMore" && (
				<Button
					appearance="solid"
					icon={<LucideChevronDown />}
					className="self-start"
					onClick={() => list.loadMore(numItems)}
				>
					Load More
				</Button>
			)}
			{list.status === "LoadingMore" && <LoadingPlaceholder />}
		</div>
	)
}
