import { type FormatDistanceToNowOptions, formatDistanceToNow } from "date-fns"
import type { ComponentPropsWithoutRef } from "react"
import { Tooltip } from "~/ui/Tooltip.tsx"

interface RelativeTimestampProps
	extends ComponentPropsWithoutRef<"time">,
		FormatDistanceToNowOptions {
	date: string | number | Date
	children?: never
	tooltipFormatOptions?: Intl.DateTimeFormatOptions
}

export function RelativeTimestamp({
	date: dateProp,
	includeSeconds,
	addSuffix,
	tooltipFormatOptions,
	...props
}: RelativeTimestampProps) {
	const date = new Date(dateProp)
	return (
		<Tooltip
			className="cursor-default"
			render={<time {...props} dateTime={date.toISOString()} />}
			tooltip={date.toLocaleString(undefined, {
				dateStyle: "medium",
				timeStyle: "short",
				...tooltipFormatOptions,
			})}
		>
			{formatDistanceToNow(dateProp, { includeSeconds, addSuffix })}
		</Tooltip>
	)
}
