import { classed } from "@tw-classed/react"

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
	renderItem,
	emptyState,
}: {
	items: T[]
	itemKey: keyof T | ((item: T) => React.Key)
	renderItem: (item: T) => React.ReactNode
	emptyState: React.ReactNode
}) {
	const resolveItemKey = (item: T) =>
		typeof itemKey === "function" ? itemKey(item) : item[itemKey]
	return items.length === 0 ? (
		<EmptyState>{emptyState}</EmptyState>
	) : (
		<Grid>
			{items.map((item) => (
				<li key={resolveItemKey(item)} className="contents">
					{renderItem(item)}
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

const EmptyState = classed.p("p-16 text-center text-2xl font-light opacity-75")
