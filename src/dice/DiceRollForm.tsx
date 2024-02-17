import { api } from "convex/_generated/api.js"
import type { Doc, Id } from "convex/_generated/dataModel.js"
import { useMutation, useQuery } from "convex/react"
import * as Lucide from "lucide-react"
import { createContext, useContext, useState } from "react"
import { twMerge } from "tailwind-merge"
import { DieIcon } from "~/dice/DieIcon.tsx"
import { useRoom } from "~/rooms/context.tsx"
import { Panel } from "~/ui/Panel.tsx"
import { Tooltip } from "~/ui/Tooltip.tsx"
import { Button } from "../ui/Button.tsx"
import { Input } from "../ui/Input.tsx"

const Context = createContext({
	diceCounts: {} as Record<Id<"diceTypes">, number>,
	add: (diceTypeId: Id<"diceTypes">) => {},
	remove: (diceTypeId: Id<"diceTypes">) => {},
})

export function DiceRollForm() {
	const diceTypes = useQuery(api.diceTypes.list, {})
	const createDiceRoll = useMutation(api.diceRolls.create)
	const room = useRoom()
	const [caption, setCaption] = useState("")
	const [diceCounts, setDiceCounts] = useState<Record<Id<"diceTypes">, number>>(
		{},
	)
	const totalDice = Object.values(diceCounts).reduce((a, b) => a + b, 0)

	const setCount = (
		diceTypeId: Id<"diceTypes">,
		getNewCount: (count: number) => number,
	) => {
		setDiceCounts((counts) => ({
			...counts,
			[diceTypeId]: Math.max(getNewCount(counts[diceTypeId] ?? 0), 0),
		}))
	}

	const addDie = (diceTypeId: Id<"diceTypes">) => {
		setCount(diceTypeId, (count) => count + 1)
	}

	const removeDie = (diceTypeId: Id<"diceTypes">) => {
		setCount(diceTypeId, (count) => count - 1)
	}

	const reset = () => {
		setDiceCounts({})
		setCaption("")
	}

	const submit = async () => {
		await createDiceRoll({
			roomId: room._id,
			caption,
			diceInput: Object.entries(diceCounts).flatMap(([name, count]) =>
				Array(count).fill({ type: name }),
			),
		})
		reset()
	}

	return (
		<div className="flex flex-col gap-2">
			<Context.Provider value={{ diceCounts, add: addDie, remove: removeDie }}>
				<div className="grid grid-cols-3 flex-wrap gap-3">
					{diceTypes?.map((diceType) => (
						<DieCounter key={diceType._id} diceType={diceType}>
							<DieIcon
								die={diceType}
								className={twMerge("flex-center size-16")}
							/>
						</DieCounter>
					))}
				</div>
			</Context.Provider>

			<div className="flex gap-2">
				<Input
					size="lg"
					className="flex-1"
					placeholder="Caption"
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
				/>
				<Button
					appearance="outline"
					size="lg"
					onClick={reset}
					disabled={totalDice < 1}
				>
					<Lucide.RotateCcw /> Reset
				</Button>
				<Button
					appearance="outline"
					size="lg"
					onClick={submit}
					disabled={totalDice < 1}
				>
					<Lucide.Dices /> Roll
				</Button>
			</div>
		</div>
	)
}

function DieCounter({
	diceType,
	children,
}: {
	diceType: Doc<"diceTypes">
	children: React.ReactNode
}) {
	const { add } = useContext(Context)
	return (
		<DieCounterLayout diceType={diceType}>
			<Tooltip
				tooltip={diceType.name}
				className="aspect-square h-auto w-16 p-1 *:size-full"
				onClick={() => add(diceType._id)}
				render={<Button appearance="clear" />}
			>
				{children}
				<span className="sr-only">Add {diceType.name} die</span>
			</Tooltip>
		</DieCounterLayout>
	)
}

function DieCounterLayout({
	diceType,
	children,
}: {
	diceType: Doc<"diceTypes">
	children: React.ReactNode
}) {
	const { diceCounts, add, remove } = useContext(Context)
	const count = diceCounts[diceType._id] ?? 0
	return (
		<Panel className="flex-center gap-2 p-1">
			{children}
			<p
				className="text-3xl tabular-nums"
				aria-label={`${diceType.name} dice count`}
			>
				{count}
			</p>
			<div className="flex-center flex-col">
				<Button
					appearance="clear"
					className="aspect-square h-8 p-0"
					onClick={() => add(diceType._id)}
				>
					<Lucide.ChevronUp className="size-8" />
					<span className="sr-only">Add {diceType.name} die</span>
				</Button>
				<Button
					appearance="clear"
					className="aspect-square h-8 p-0"
					onClick={() => remove(diceType._id)}
				>
					<Lucide.ChevronDown className="size-8" />
					<span className="sr-only">Remove {diceType.name} die</span>
				</Button>
			</div>
		</Panel>
	)
}
