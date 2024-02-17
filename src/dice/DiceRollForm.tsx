import { api } from "convex/_generated/api.js"
import type { DiceType } from "convex/diceSets.types.ts"
import { useMutation, useQuery } from "convex/react"
import * as Lucide from "lucide-react"
import { createContext, useContext, useState } from "react"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"
import { DieIcon } from "~/dice/DieIcon.tsx"
import { range } from "~/helpers/range.ts"
import { useRoom } from "~/rooms/context.tsx"
import { Label } from "~/ui/Label.tsx"
import { Panel } from "~/ui/Panel.tsx"
import { Select } from "~/ui/Select.tsx"
import { Tooltip } from "~/ui/Tooltip.tsx"
import { Button } from "../ui/Button.tsx"
import { Input } from "../ui/Input.tsx"

const Context = createContext({
	diceCounts: {} as Record<DiceType["id"], number>,
	add: (diceTypeId: DiceType["id"]) => {},
	remove: (diceTypeId: DiceType["id"]) => {},
})

export function DiceRollForm() {
	const room = useRoom()

	const diceSets = useQuery(api.diceSets.getAll, {}) ?? []
	const createDiceRoll = useMutation(api.diceRolls.create)

	const [diceSetId, setDiceSetId] = useState(diceSets[0]?._id)
	const [diceCounts, setDiceCounts] = useState<Record<DiceType["id"], number>>(
		{},
	)
	const [caption, setCaption] = useState("")

	const diceSet = diceSets.find((set) => set._id === diceSetId)
	const totalDice = Object.values(diceCounts).reduce((a, b) => a + b, 0)
	const submitDisabled = totalDice < 1 || diceSetId === undefined

	if (diceSetId === undefined && diceSets[0]) {
		setDiceSetId(diceSets[0]._id)
	}

	const setCount = (
		diceTypeId: DiceType["id"],
		getNewCount: (count: number) => number,
	) => {
		setDiceCounts((counts) => ({
			...counts,
			[diceTypeId]: Math.max(getNewCount(counts[diceTypeId] ?? 0), 0),
		}))
	}

	const addDie = (diceTypeId: DiceType["id"]) => {
		setCount(diceTypeId, (count) => count + 1)
	}

	const removeDie = (diceTypeId: DiceType["id"]) => {
		setCount(diceTypeId, (count) => count - 1)
	}

	const reset = () => {
		setDiceCounts({})
		setCaption("")
	}

	const submit = async () => {
		if (!diceSetId) {
			toast.error("No dice set selected")
			return
		}

		await createDiceRoll({
			roomId: room._id,
			diceSetId,
			caption,
			diceInput: Object.entries(diceCounts).flatMap(([typeId, count]) =>
				range(count).map(() => ({ typeId })),
			),
		})

		reset()
	}

	return (
		<div className="flex flex-col gap-4">
			<Select
				options={diceSets.map((set) => ({ label: set.name, value: set._id }))}
				value={diceSetId}
				onChange={setDiceSetId}
				label="Dice Set"
				icon={<Lucide.Dices />}
			/>

			<Context.Provider value={{ diceCounts, add: addDie, remove: removeDie }}>
				<div className="grid grid-cols-3 flex-wrap gap-3">
					{diceSet?.dice.map((diceType) => (
						<DieCounter key={diceType.id} diceType={diceType}>
							<DieIcon
								diceType={diceType}
								className={twMerge("flex-center size-16")}
							/>
						</DieCounter>
					))}
				</div>
			</Context.Provider>

			<div className="flex items-end gap-2">
				<div className="flex-1">
					<Label htmlFor="caption">Caption</Label>
					<Input
						id="caption"
						placeholder="Perception Check 👀"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
					/>
				</div>
				<Button appearance="outline" onClick={reset} disabled={submitDisabled}>
					<Lucide.RotateCcw /> Reset
				</Button>
				<Button appearance="outline" onClick={submit} disabled={submitDisabled}>
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
	diceType: DiceType
	children: React.ReactNode
}) {
	const { add } = useContext(Context)
	return (
		<DieCounterLayout diceType={diceType}>
			<Tooltip
				tooltip={diceType.name}
				className="aspect-square h-auto w-20 p-1 *:size-full"
				onClick={() => add(diceType.id)}
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
	diceType: DiceType
	children: React.ReactNode
}) {
	const { diceCounts, add, remove } = useContext(Context)
	const count = diceCounts[diceType.id] ?? 0
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
					onClick={() => add(diceType.id)}
				>
					<Lucide.ChevronUp className="size-8" />
					<span className="sr-only">Add {diceType.name} die</span>
				</Button>
				<Button
					appearance="clear"
					className="aspect-square h-8 p-0"
					onClick={() => remove(diceType.id)}
				>
					<Lucide.ChevronDown className="size-8" />
					<span className="sr-only">Remove {diceType.name} die</span>
				</Button>
			</div>
		</Panel>
	)
}
