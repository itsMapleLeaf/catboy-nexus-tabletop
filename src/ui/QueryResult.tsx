import type React from "react"
import { EmptyState } from "~/ui/EmptyState.tsx"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"

export function QueryResult<T>({
	value,
	loading = <LoadingPlaceholder />,
	emptyState,
	children,
}: {
	value: T | null | undefined
	loading?: React.ReactNode
	emptyState: React.ReactNode
	children: (value: NonNullable<T>) => React.ReactNode
}) {
	return value === undefined ? (
		loading
	) : value === null ? (
		<EmptyState>{emptyState}</EmptyState>
	) : (
		children(value)
	)
}
