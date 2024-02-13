import { UserButton } from "@clerk/remix"
import { Link } from "@remix-run/react"
import { classed } from "@tw-classed/react"
import { LucideChevronRight } from "lucide-react"
import { Fragment } from "react"
import { twMerge } from "tailwind-merge"
import logo from "~/assets/logo.svg"
import { EmptyState } from "./EmptyState"

export function PageLayout({
	title,
	headerAction,
	children,
	breadcrumbs,
	className,
}: {
	title: string
	headerAction: React.ReactNode
	children: React.ReactNode
	breadcrumbs: Array<{ to: string; label: string }>
	className?: string
}) {
	return (
		<div className={twMerge("flex flex-col gap-4 p-4", className)}>
			<header className="flex flex-row items-center gap-4">
				<Link to="/" prefetch="intent" className="hover-fade">
					<img src={logo} alt="Logo" className="size-6" />
				</Link>
				<div className="mr-auto">
					<div className="flex items-center">
						<Link to="/" prefetch="intent" className="hover-fade text-sm">
							Catboy Nexus
						</Link>
						{breadcrumbs
							.map((item, key) => ({ ...item, key }))
							.map(({ to, label, key }) => (
								<Fragment key={key}>
									<LucideChevronRight
										className="size-4 translate-y-px opacity-50"
										aria-hidden
									/>
									<Link
										to={to}
										prefetch="intent"
										className="hover-fade text-sm"
									>
										{label}
									</Link>
								</Fragment>
							))}
					</div>
					<h2 className="text-3xl/8 font-light">{title}</h2>
				</div>
				{headerAction}
				<div className="hover-fade w-8">
					<UserButton afterSignOutUrl="/" />
				</div>
			</header>
			{children}
		</div>
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

const Grid = classed.ul(
	"grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3",
)
