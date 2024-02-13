import { useQuery } from "convex/react"
import type {
	FunctionArgs,
	FunctionReference,
	FunctionReturnType,
} from "convex/server"
import type React from "react"
import { EmptyState } from "~/ui/EmptyState.tsx"
import { LoadingPlaceholder } from "~/ui/LoadingPlaceholder.tsx"

export function Query<Func extends FunctionReference<"query", "public">>({
	query,
	args,
	loading = <LoadingPlaceholder />,
	emptyState,
	children,
}: {
	query: Func
	args: FunctionArgs<Func>
	loading?: React.ReactNode
	emptyState: React.ReactNode
	children: (data: NonNullable<FunctionReturnType<Func>>) => React.ReactNode
}) {
	const data = useQuery(query, args)
	return data === undefined ? (
		loading
	) : data === null ? (
		<EmptyState>{emptyState}</EmptyState>
	) : (
		children(data)
	)
}
