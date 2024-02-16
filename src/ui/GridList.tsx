import { classed } from "@tw-classed/react"
import { EmptyState } from "./EmptyState"

export function GridList<
	K extends PropertyKey,
	T extends Record<K, React.Key>,
>({
	items,
	itemKey,
	emptyState = "Nothing here!",
	children,
}: {
	items: T[]
	emptyState?: React.ReactNode
	itemKey: K | ((item: T) => React.Key)
	children: (item: T) => React.ReactNode
}) {
	const resolveItemKey = (item: T) =>
		typeof itemKey === "function" ? itemKey(item) : item[itemKey]
	return items.length === 0 ? (
		<EmptyState>{emptyState}</EmptyState>
	) : (
		<Grid>
			{items.map((item) => (
				<li key={resolveItemKey(item)} className="contents">
					{children(item)}
				</li>
			))}
		</Grid>
	)
}

const Grid = classed.ul(
	"grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3",
)
