import * as Lucide from "lucide-react"
import { createContext, useContext, useState } from "react"
import { getGenesysDice } from "~/genesys/dice.tsx"
import { getGenesysSymbols } from "~/genesys/symbols.ts"
import { Collapse, type CollapseProps } from "~/ui/Collapse.tsx"
import { Panel } from "~/ui/Panel.tsx"
import { Button } from "../ui/Button.tsx"
import { Input } from "../ui/Input.tsx"

const Context = createContext({
	diceCounts: {} as Record<string, number>,
	add: (name: string) => {},
	remove: (name: string) => {},
})

export function GenesysDiceRollForm() {
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

	const reset = () => {
		setDiceCounts({})
	}

	return (
		<div className="flex flex-col gap-2">
			<Context.Provider value={{ diceCounts, add: addDie, remove: removeDie }}>
				<DiceSection title="Dice" defaultOpen>
					{getGenesysDice().map((die) => (
						<DieCounter key={die.id} name={die.label}>
							{die.element}
						</DieCounter>
					))}
					<DieCounterLayout name="Plain Dice">
						<Input defaultValue={100} className="mx-1.5 text-center" />
					</DieCounterLayout>
				</DiceSection>

				<DiceSection title="Symbols">
					{getGenesysSymbols().map((symbol) => (
						<DieCounter key={symbol.id} name={symbol.label}>
							<img src={symbol.image} alt="" />
						</DieCounter>
					))}
				</DiceSection>
			</Context.Provider>

			<div className="flex gap-2">
				<Input size="lg" className="flex-1" placeholder="Caption" />
				<Button appearance="outline" size="lg" onClick={reset}>
					<Lucide.RotateCcw /> Reset
				</Button>
				<Button appearance="outline" size="lg">
					<Lucide.Dices /> Roll
				</Button>
			</div>
		</div>
	)
}

function DiceSection(props: CollapseProps) {
	return (
		<Collapse {...props}>
			<div className="grid grid-cols-3 flex-wrap gap-3">{props.children}</div>
		</Collapse>
	)
}

function DieCounter({
	name,
	children,
}: {
	name: string
	children: React.ReactNode
}) {
	const { add } = useContext(Context)
	return (
		<DieCounterLayout name={name}>
			<Button
				appearance="clear"
				className="aspect-square h-auto w-16 p-1 *:size-full"
				onClick={() => add(name)}
			>
				{children}
				<span className="sr-only">Add {name} die</span>
			</Button>
		</DieCounterLayout>
	)
}

function DieCounterLayout({
	name,
	children,
}: {
	name: string
	children: React.ReactNode
}) {
	const { diceCounts, add, remove } = useContext(Context)
	const count = diceCounts[name] ?? 0
	return (
		<Panel className="flex-center gap-2 p-1">
			{children}
			<p className="text-3xl tabular-nums" aria-label={`${name} dice count`}>
				{count}
			</p>
			<div className="flex-center flex-col">
				<Button
					appearance="clear"
					className="aspect-square h-8 p-0"
					onClick={() => add(name)}
				>
					<Lucide.ChevronUp className="size-8" />
					<span className="sr-only">Add {name} die</span>
				</Button>
				<Button
					appearance="clear"
					className="aspect-square h-8 p-0"
					onClick={() => remove(name)}
				>
					<Lucide.ChevronDown className="size-8" />
					<span className="sr-only">Remove {name} die</span>
				</Button>
			</div>
		</Panel>
	)
}
