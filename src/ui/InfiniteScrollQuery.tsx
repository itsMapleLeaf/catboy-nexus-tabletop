import type { UsePaginatedQueryResult } from "convex/react"
import { LucideChevronDown } from "lucide-react"
import type * as React from "react"
import { Button } from "~/ui/Button.tsx"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"

export function InfiniteScrollQuery<T>({
	listResult,
	numItems,
	children,
}: {
	listResult: UsePaginatedQueryResult<T>
	numItems: number
	children: (items: T[]) => React.ReactNode
}) {
	return (
		<div className="flex h-full flex-col gap-4">
			<div className="h-full">
				{listResult.status === "LoadingFirstPage" ? (
					<LoadingPlaceholder />
				) : (
					children(listResult.results)
				)}
			</div>
			{listResult.status === "CanLoadMore" && (
				<Button
					appearance="solid"
					icon={<LucideChevronDown />}
					className="self-start"
					onClick={() => listResult.loadMore(numItems)}
				>
					Load More
				</Button>
			)}
			{listResult.status === "LoadingMore" && <LoadingPlaceholder />}
		</div>
	)
}
