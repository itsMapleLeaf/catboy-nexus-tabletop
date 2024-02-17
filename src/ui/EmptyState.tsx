import { classed } from "@tw-classed/react"

export const EmptyState = classed.p(
	"p-16 text-center text-2xl font-light opacity-75",
	{
		defaultProps: {
			// @ts-expect-error
			"data-testid": "empty-state",
		},
	},
)
