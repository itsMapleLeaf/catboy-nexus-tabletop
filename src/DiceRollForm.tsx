import * as Lucide from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Button } from "./ui/Button.tsx"
import { Input } from "./ui/Input.tsx"
import { Tooltip } from "./ui/Tooltip.tsx"

interface DiceKind {
	name: string
	icon: JSX.Element
}

const diceKinds: DiceKind[] = [
	{
		name: "Proficiency",
		icon: (
			<Lucide.Pentagon className="size-full -translate-y-0.5 text-yellow-300" />
		),
	},
	{
		name: "Ability",
		icon: <Lucide.Diamond className="size-full text-green-300" />,
	},
	{
		name: "Boost",
		icon: <Lucide.Square className="size-full text-sky-300" />,
	},
	{
		name: "Challenge",
		icon: (
			<Lucide.Pentagon className="size-full -translate-y-0.5 text-red-300" />
		),
	},
	{
		name: "Difficulty",
		icon: <Lucide.Diamond className="size-full text-purple-300" />,
	},
	{
		name: "Setback",
		icon: (
			<Lucide.Square className="size-full text-neutral-900 drop-shadow-[0_0_1px_white]" />
		),
	},
	{
		name: "Destiny",
		icon: <Lucide.Pentagon className="size-full -translate-y-0.5 text-white" />,
	},
]

export function DiceRollForm() {
	const [diceCounts, setDiceCounts] = useState<Record<string, number>>({
		Proficiency: 3,
		Ability: 2,
		Boost: 1,
	})

	const setCount = (name: string, getNewCount: (count: number) => number) => {
		setDiceCounts((counts) => ({
			...counts,
			[name]: Math.max(getNewCount(counts[name] ?? 0), 0),
		}))
	}

	const addDie = (name: string) => {
		setCount(name, (count) => count + 1)
	}

	const removeDie = (name: string) => {
		setCount(name, (count) => count - 1)
	}

	return (
		<div className="flex flex-col gap-3 p-3">
			<div className="grid grid-cols-3 flex-wrap gap-[inherit]">
				{diceKinds.map((kind) => (
					<DieCounter
						key={kind.name}
						kind={kind}
						count={diceCounts[kind.name] ?? 0}
						onAdd={() => addDie(kind.name)}
						onRemove={() => removeDie(kind.name)}
					/>
				))}
			</div>
			<div className="flex gap-2">
				<Input size="lg" className="flex-1" placeholder="Caption" />
				<Button appearance="outline" size="lg">
					<Lucide.Dices /> Roll
				</Button>
			</div>
		</div>
	)
}

function DieCounter({
	kind,
	count,
	onAdd,
	onRemove,
}: {
	kind: DiceKind
	count: number
	onAdd: () => void
	onRemove: () => void
}) {
	return (
		<div
			className={twMerge(
				"flex-center gap-1.5 transition-opacity",
				count < 1 && "opacity-50",
			)}
		>
			<Tooltip tooltip={kind.name}>
				<div className="flex-center relative size-16 cursor-default">
					{kind.icon}
					<span className="absolute text-2xl tabular-nums">{count}</span>
				</div>
			</Tooltip>
			<div className="flex-center flex-col">
				<Button className="aspect-square h-8 p-0" onClick={onAdd}>
					<Lucide.ChevronUp className="size-8" />
				</Button>
				<Button className="aspect-square h-8 p-0" onClick={onRemove}>
					<Lucide.ChevronDown className="size-8" />
				</Button>
			</div>
		</div>
	)
}
