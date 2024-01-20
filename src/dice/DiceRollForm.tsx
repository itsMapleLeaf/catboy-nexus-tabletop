import * as Lucide from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { titleCase } from "~/helpers/string.ts"
import { Panel } from "~/ui/Panel.tsx"
import { Button } from "../ui/Button.tsx"
import { Input } from "../ui/Input.tsx"
import { Tooltip } from "../ui/Tooltip.tsx"
import { GenesysDieIcon, iconNames } from "./GenesysDieIcon.tsx"

interface DiceKind {
	name: string
	icon: JSX.Element
}

const diceKinds: DiceKind[] = [
	{
		name: "Proficiency",
		icon: <Lucide.Pentagon className="-translate-y-0.5 text-yellow-300" />,
	},
	{
		name: "Ability",
		icon: <Lucide.Diamond className="text-green-300" />,
	},
	{
		name: "Boost",
		icon: <Lucide.Square className="text-sky-300" />,
	},
	{
		name: "Challenge",
		icon: <Lucide.Pentagon className="-translate-y-0.5 text-red-300" />,
	},
	{
		name: "Difficulty",
		icon: <Lucide.Diamond className="text-purple-300" />,
	},
	{
		name: "Setback",
		icon: (
			<Lucide.Square className="text-neutral-900 drop-shadow-[0_0_1px_white]" />
		),
	},
	{
		name: "Destiny",
		icon: <Lucide.Pentagon className="-translate-y-0.5 text-white" />,
	},
	...iconNames.map((name) => ({
		name: titleCase(name),
		icon: <GenesysDieIcon icon={name} />,
	})),
]

export function DiceRollForm() {
	const [diceCounts, setDiceCounts] = useState<Record<string, number>>({})

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
		<Panel className="flex-center gap-2 p-1 ">
			<Tooltip
				tooltip={kind.name}
				className={twMerge(
					"size-14 cursor-default p-1 transition-opacity first:*:size-full",
					count < 1 && "opacity-50",
				)}
				render={<Button onClick={onAdd} aria-hidden />}
			>
				{kind.icon}
			</Tooltip>

			<p
				className="text-3xl tabular-nums"
				aria-label={`${kind.name} dice count`}
			>
				{count}
			</p>

			<div className="flex-center flex-col">
				<Button className="aspect-square h-8 p-0" onClick={onAdd}>
					<Lucide.ChevronUp className="size-8" />
					<span className="sr-only">Add {kind.name} die</span>
				</Button>
				<Button className="aspect-square h-8 p-0" onClick={onRemove}>
					<Lucide.ChevronDown className="size-8" />
					<span className="sr-only">Remove {kind.name} die</span>
				</Button>
			</div>
		</Panel>
	)
}
