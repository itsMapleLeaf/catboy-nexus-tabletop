import type { DiceType } from "convex/diceSets.types.ts"
import * as Lucide from "lucide-react"
import { twMerge } from "tailwind-merge"

export function DieIcon(
	props: {
		diceType: DiceType
	} & React.HTMLAttributes<HTMLElement | SVGSVGElement>,
) {
	return (
		<>
			<DieIconElement
				{...props}
				className={twMerge(getColorClass(props.diceType), props.className)}
			/>
		</>
	)
}

function DieIconElement({
	diceType,
	...props
}: {
	diceType: DiceType
} & React.HTMLAttributes<HTMLElement | SVGSVGElement>) {
	switch (diceType.faces.length) {
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
			return <p {...props}>d{diceType.faces.length}</p>
	}
}

function getColorClass(diceType: DiceType) {
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
		}[diceType.color ?? "white"],
	)
}
