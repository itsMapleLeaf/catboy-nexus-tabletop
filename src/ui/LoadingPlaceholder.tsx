import { LucideLoader2 } from "lucide-react"

export function LoadingPlaceholder() {
	return (
		<div className="flex-col-center p-12">
			<LucideLoader2 className="size-12 animate-spin" aria-hidden />
			<p className="sr-only">Loading...</p>
		</div>
	)
}
