import type { Doc } from "convex/_generated/dataModel.js"
import * as Lucide from "lucide-react"
import { twMerge } from "tailwind-merge"

export function DieIcon({
	die,
	className,
}: {
	die: Doc<"diceTypes">
	className?: string
}) {
	return (
		<>
			<DieIconElement
				die={die}
				className={twMerge(getDiceColorClass(die), className)}
			/>
		</>
	)
}

function DieIconElement({
	die,
	...props
}: {
	die: Doc<"diceTypes">
} & React.HTMLAttributes<HTMLElement | SVGSVGElement>) {
	switch (die.faces.length) {
		case 4:
			return <Lucide.Triangle {...props} />
		case 6:
			return <Lucide.Square {...props} />
		case 8:
			return <Lucide.Diamond {...props} />
		case 10:
			return <Lucide.Octagon {...props} />
		case 12:
			return (
				<Lucide.Pentagon
					{...props}
					className={twMerge("-translate-y-px", props.className)}
				/>
			)
		case 20:
			return <Lucide.Hexagon {...props} />
		default:
			return <p {...props}>d{die.faces.length}</p>
	}
}

function getDiceColorClass(die: Doc<"diceTypes">) {
	return twMerge(
		{
			red: "text-red-300",
			orange: "text-orange-300",
			yellow: "text-yellow-300",
			green: "text-green-300",
			blue: "text-sky-300",
			purple: "text-purple-300",
			white: "text-white",
			black: "text-neutral-900 drop-shadow-[0_0_1px_white]",
		}[die.color ?? "white"],
	)
}
