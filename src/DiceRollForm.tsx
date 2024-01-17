import * as Lucide from "lucide-solid"
import { For, type JSX, createSignal } from "solid-js"
import { button } from "./ui/button.ts"
import { input } from "./ui/input.ts"

interface DiceKind {
	name: string
	icon: JSX.Element
}

const diceKinds = (): DiceKind[] => [
	{
		name: "Proficiency",
		icon: (
			<Lucide.Pentagon class="size-full -translate-y-0.5 text-yellow-300" />
		),
	},
	{
		name: "Ability",
		icon: <Lucide.Diamond class="size-full text-green-300" />,
	},
	{
		name: "Boost",
		icon: <Lucide.Square class="size-full text-sky-300" />,
	},
	{
		name: "Challenge",
		icon: <Lucide.Pentagon class="size-full -translate-y-0.5 text-red-300" />,
	},
	{
		name: "Difficulty",
		icon: <Lucide.Diamond class="size-full text-purple-300" />,
	},
	{
		name: "Setback",
		icon: (
			<Lucide.Square class="size-full text-neutral-900 drop-shadow-[0_0_1px_white]" />
		),
	},
	{
		name: "Destiny",
		icon: <Lucide.Pentagon class="size-full -translate-y-0.5 text-white" />,
	},
]

const [diceCounts, setDiceCounts] = createSignal<Record<string, number>>({
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

export function DiceRollForm() {
	return (
		<div class="flex flex-col gap-3 p-3">
			<div class="grid grid-cols-3 flex-wrap gap-[inherit]">
				<For each={diceKinds()}>
					{(kind) => (
						<DieCounter count={diceCounts()[kind.name] ?? 0} kind={kind} />
					)}
				</For>
			</div>
			<div class="flex gap-2">
				<input
					class={input({ size: "lg", class: "flex-1" })}
					placeholder="Caption"
				/>
				<button
					type="button"
					class={button({ appearance: "outline", size: "lg" })}
				>
					<Lucide.Dices /> Roll
				</button>
			</div>
		</div>
	)
}

function DieCounter(props: { count: number; kind: DiceKind }) {
	return (
		<div
			class="flex-center gap-1.5 transition-opacity"
			classList={{ "opacity-50": props.count < 1 }}
		>
			<div class="flex-center relative size-16">
				{props.kind.icon}
				<span class="absolute text-2xl tabular-nums">{props.count}</span>
			</div>
			<div class="flex-center flex-col">
				<button
					type="button"
					class={button({
						shape: "square",
						class: "h-8 p-0",
					})}
					onClick={() => addDie(props.kind.name)}
				>
					<Lucide.ChevronUp class="size-8" />
				</button>
				<button
					type="button"
					class={button({
						shape: "square",
						class: "h-8 p-0",
					})}
					onClick={() => removeDie(props.kind.name)}
				>
					<Lucide.ChevronDown class="size-8" />
				</button>
			</div>
		</div>
	)
}
