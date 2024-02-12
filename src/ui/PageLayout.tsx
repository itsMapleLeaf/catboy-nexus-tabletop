import { classed } from "@tw-classed/react"
import { EmptyState } from "./EmptyState"

export function PageLayout({
	title,
	headerAction: action,
	children,
}: {
	title: string
	headerAction: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<PageContainer>
			<PageHeader>
				<PageHeading>{title}</PageHeading>
				{action}
			</PageHeader>
			{children}
		</PageContainer>
	)
}

export function PageLayoutGridList<T extends Record<string, React.Key>>({
	items,
	itemKey,
	emptyState = "Nothing here!",
	children,
}: {
	items: T[]
	emptyState?: React.ReactNode
	itemKey: keyof T | ((item: T) => React.Key)
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

const PageContainer = classed.div("flex flex-col gap-4 p-4")

const PageHeader = classed.header("flex items-baseline justify-between")

const PageHeading = classed.h2("text-3xl font-light")

const Grid = classed.ul(
	"grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3",
)
