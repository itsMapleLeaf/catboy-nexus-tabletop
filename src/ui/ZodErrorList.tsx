import type { ZodError } from "zod"

export function ZodErrorList({ error }: { error: ZodError }) {
	return (
		<ul className="list-inside list-disc pl-4">
			{error.issues.map((issue) => (
				<li key={issue.path.join(".")}>
					{issue.path.join(".")}: {issue.message}
				</li>
			))}
		</ul>
	)
}
