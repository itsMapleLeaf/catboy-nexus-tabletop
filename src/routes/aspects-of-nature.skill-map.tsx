import { twMerge } from "tailwind-merge"

const aspectNames = ["fire", "water", "wind", "light", "darkness"] as const
type AspectName = (typeof aspectNames)[number]

const statNames = ["strength", "mobility", "intellect", "wit", "sense"] as const
type StatName = (typeof statNames)[number]

type Skill = {
	name: string
	description: string
	aspect: AspectName
	actionStats?: StatName[]
	reactionStats?: StatName[]
	isPassive?: boolean
}

const skills: Skill[] = [
	{
		name: "Flame Shield",
		description: `Create a protective barrier of fire which prevents no more than effective damage.`,
		aspect: "fire",
		actionStats: ["strength"],
		reactionStats: ["sense"],
	},
	{
		name: "Firestorm",
		description: `Summon a localized storm of fire raining down on a targeted area. Deal effective damage to all characters in the area.`,
		aspect: "fire",
		actionStats: ["intellect"],
	},
	{
		name: "Molten Core",
		description: `Increase fire damage by your level.`,
		aspect: "fire",
		isPassive: true,
	},
	{
		name: "Rise from the Ashes",
		description: `Remove effective conditions. Create a bright flash of light, blinding characters in the effective radius.`,
		aspect: "fire",
		actionStats: ["strength", "intellect", "sense", "wit"],
	},
	{
		name: "Inferno",
		description: `Unleash a powerful burst of fire. All characters in the effective radius take effective damage, including yourself. Upon being countered, succeed a strength roll to ignore it.`,
		aspect: "fire",
		actionStats: ["strength"],
		reactionStats: ["sense"],
	},
	{
		name: "Form of Fire",
		description: `Become a being of pure fire. Deal double damage while in this form, but characters have eased attacks against you.`,
		aspect: "fire",
		actionStats: ["strength"],
		reactionStats: ["sense"],
	},
	{
		name: "Ember Step",
		description: `For effective turns, create a fire beneath you at the end of your turn. Other characters that step in the fire take effective damage.`,
		aspect: "fire",
		actionStats: ["intellect"],
	},
	{
		name: "Blazing Speed",
		description: `Double your mobility for effective turns.`,
		aspect: "fire",
		actionStats: ["intellect", "mobility"],
	},
	{
		name: "Empowering Ember",
		description: `Double your strength until the end of your next turn. On your next turn, you have an additional action.`,
		aspect: "fire",
		actionStats: ["intellect", "mobility"],
	},

	{
		name: "Aqua Barrier",
		description: `Create a shield of water nearby which absorbs all damage. When taking more than effective damage, the shield breaks.`,
		aspect: "water",
		actionStats: ["strength", "sense", "intellect"],
		reactionStats: ["sense", "intellect"],
	},
	{
		name: "Commune with Water",
		description: `Teleport to the nearest body of water no more than 20 meters away. This includes rain.`,
		aspect: "water",
		actionStats: ["intellect"],
		reactionStats: ["sense", "mobility"],
	},
	{
		name: "Masking Mist",
		description: `Create a cloud of mist that obscures vision in the effective radius no more than 10 meters away. Characters in the mist have daunting rolls.`,
		aspect: "water",
		actionStats: ["intellect", "sense"],
		reactionStats: ["sense", "wit"],
	},
	{
		name: "Healing Rain",
		description: `Cast a rain. Heal effective conditions in the effective radius from yourself. The rain lasts until the end of your next turn.`,
		aspect: "water",
		actionStats: ["intellect", "sense"],
	},
	{
		name: "Tidal Wave",
		description: `Summon a massive wave which deals effective damage to all characters in the effective radius.`,
		aspect: "water",
		actionStats: ["intellect", "sense", "strength"],
		reactionStats: ["sense", "wit", "mobility"],
	},
	{
		name: "Form of Water",
		description: `Become a being of water. Become immune to all damage, but you cannot use skills that affect other characters.`,
		aspect: "water",
		actionStats: ["intellect", "sense"],
		reactionStats: ["sense", "wit"],
	},
	{
		name: "Ocean's Might",
		description: `Increase water damage by twice your level while at most 1 meter away from water.`,
		aspect: "water",
		isPassive: true,
	},
	{
		name: "Aquatic Eyes",
		description: `For effective turns, sense checks through water and rain are eased.`,
		aspect: "water",
		actionStats: ["sense", "intellect"],
		reactionStats: ["sense", "intellect", "wit"],
	},
	{
		name: "Ice Spike",
		description: `Launch an effective number of sharp ice projectiles at enemies. Each one requires a successful mobility roll to dodge, otherwise deal effective damage.`,
		aspect: "water",
		actionStats: ["strength", "intellect", "sense"],
		reactionStats: ["strength", "sense", "wit"],
	},

	{
		name: "Second Wind",
		description: `After succeeding your next skill, use that skill again with the same effect.`,
		aspect: "wind",
		actionStats: ["strength", "intellect", "wit"],
		reactionStats: ["sense", "wit"],
	},
	{
		name: "Nature's Fury",
		description: `Create a 3 meter wide cyclone in front of you. All characters entering the cyclone take effective damage. The cyclone moves effective meters in a random direction at the end of your turn.`,
		aspect: "wind",
		actionStats: ["strength", "intellect", "wit"],
		reactionStats: ["sense", "wit"],
	},
	{
		name: "Gale Force",
		description: `Unleash a powerful wind blast, pushing back characters around you by effective meters. Characters pushed into a wall take effective damage.`,
		aspect: "wind",
		actionStats: ["strength", "mobility", "wit"],
		reactionStats: ["sense", "wit", "mobility"],
	},
	{
		name: "One with the Wind",
		description: `Double your mobility.`,
		aspect: "wind",
		isPassive: true,
	},
	{
		name: "Wind Slash",
		description: `Create a sharp blade of wind that deals effective damage to targets in a line of effective distance.`,
		aspect: "wind",
		actionStats: ["strength", "wit", "intellect", "mobility"],
		reactionStats: ["sense", "wit", "mobility"],
	},
	{
		name: "Slipstream",
		description: `Create a brief gust of wind that knocks any other character prone in the effective radius.`,
		aspect: "wind",
		actionStats: ["strength", "wit", "intellect", "mobility"],
		reactionStats: ["sense", "wit", "mobility"],
	},
	{
		name: "Form of Wind",
		description: `Become a being of wind. You can move wherever you want, but you cannot interact with the physical world.`,
		aspect: "wind",
		actionStats: ["intellect", "sense", "mobility"],
		reactionStats: ["sense", "mobility"],
	},
	{
		name: "Shared Swiftness",
		description: `Commune with the wind. Double the mobility of characters in the effective radius until your next turn.`,
		aspect: "wind",
		actionStats: ["intellect", "sense", "mobility"],
		reactionStats: ["sense", "mobility"],
	},
	{
		name: "Whispers of Wit",
		description: `Double your wit until your next turn.`,
		aspect: "wind",
		actionStats: ["intellect", "wit"],
		reactionStats: ["sense", "mobility"],
	},

	{
		name: "Form of Light",
		description: `Become a being of light. Characters within a following effective radius have doubled strength. You can not attack other characters.`,
		aspect: "light",
		actionStats: ["intellect", "sense"],
		reactionStats: ["sense", "wit"],
	},
	{
		name: "Sunstrike",
		description: `Choose an area within 5 meters. Call down a focused ray of sunlight, dealing effective damage in the effective radius.`,
		aspect: "light",
		actionStats: ["intellect", "sense"],
		reactionStats: ["sense", "mobility", "wit"],
	},
	{
		name: "Blinding Flash",
		description: `An effective number of target characters are blinded, and all of their rolls are daunting until the start of your next turn.`,
		aspect: "light",
		actionStats: ["intellect", "sense"],
		reactionStats: ["sense", "mobility", "wit"],
	},
	{
		name: "Prism Refraction",
		description: `Split light to create illusions of yourself around you. You are immune to all attacks until you roll an effective failure.`,
		aspect: "light",
		actionStats: ["intellect", "sense"],
		reactionStats: ["sense", "mobility", "wit"],
	},
	{
		name: "Radiant Beam",
		description: `Emit a powerful beam of light, dealing doubled effective damage to a target.`,
		aspect: "light",
		actionStats: ["intellect", "sense"],
		reactionStats: ["sense", "mobility", "wit"],
	},
	{
		name: "Lightfoot",
		description: `Increase your mobility by your intellect for effective turns.`,
		aspect: "light",
		actionStats: ["intellect", "sense", "mobility"],
		reactionStats: ["sense", "mobility", "wit"],
	},
	{
		name: "Binding Light",
		description: `Choose a character. They become bound by chains. That character cannot move until they make a successful daunting strength roll.`,
		aspect: "light",
		actionStats: ["strength"],
		reactionStats: ["strength", "mobility", "wit"],
	},
	{
		name: "Luminous Shield",
		description: `Generate a following shield of light which blocks an effective number of attacks.`,
		aspect: "light",
		actionStats: ["intellect", "strength"],
		reactionStats: ["sense", "mobility", "wit"],
	},
	{
		name: "Healing Glow",
		description: `Create a following aura of light of effective radius. At the end of your turn, heal one condition from all characters in the aura.`,
		aspect: "light",
		actionStats: ["intellect", "sense", "mobility"],
		reactionStats: ["sense", "mobility", "wit"],
	},

	{
		name: "Shadow Swap",
		description: `Swap places with another character.`,
		aspect: "darkness",
		actionStats: ["wit", "intellect", "mobility", "sense"],
		reactionStats: ["wit", "mobility", "sense"],
	},
	{
		name: "Eclipse",
		description: `Darken the following area around you in a doubled effective radius. Non-darkness skills attempted in this area are daunting.`,
		aspect: "darkness",
		actionStats: ["intellect", "sense"],
		reactionStats: ["wit", "sense"],
	},
	{
		name: "Dark Pact",
		description: `Lose effective health and gain effective strength for effective turns.`,
		aspect: "darkness",
		actionStats: ["intellect", "sense"],
		reactionStats: ["wit", "sense"],
	},
	{
		name: "Umbral Teleportation",
		description: `Teleport from one dark location to another no more than 20 meters away.`,
		aspect: "darkness",
		actionStats: ["wit", "intellect", "mobility", "sense"],
		reactionStats: ["wit", "mobility", "sense"],
	},
	{
		name: "Dark Dread",
		description: `Consume the area around you in a dark, threatening void. At the start of your next turn, deal double effective damage to characters in the doubled effective following radius.`,
		aspect: "darkness",
		actionStats: ["wit", "intellect", "sense"],
		reactionStats: ["wit", "sense"],
	},
	{
		name: "Dreadful Presence",
		description: `While in the dark, rolls from other characters 1 or fewer meters away from you are daunting.`,
		aspect: "darkness",
		isPassive: true,
	},
	{
		name: "Form of Darkness",
		description: `Become a being of shadow. You cannot interact with the physical world. At the end of your turn, characters nearby must succeed a daunting sense roll, otherwise they skip their next turn.`,
		aspect: "darkness",
		actionStats: ["intellect", "mobility", "sense"],
		reactionStats: ["wit", "mobility", "sense"],
	},
	{
		name: "Demonic Charisma",
		description: `Double the wit of characters in the effective radius for effective turns.`,
		aspect: "darkness",
		actionStats: ["wit", "sense"],
		reactionStats: ["wit", "sense"],
	},
	{
		name: "Demonic Tension",
		description: `For all characters in an effective radius, their next non-wit roll is daunting.`,
		aspect: "darkness",
		actionStats: ["wit", "intellect", "sense"],
		reactionStats: ["wit", "sense"],
	},
]

const skillsByAspect = new Map<AspectName, Skill[]>()
for (const aspect of aspectNames) {
	skillsByAspect.set(
		aspect,
		skills.filter((skill) => skill.aspect === aspect),
	)
}

const aspectClasses: Record<AspectName, { bg: string; border: string }> = {
	fire: {
		bg: "bg-red-800",
		border: "border-red-950",
	},
	water: {
		bg: "bg-blue-800",
		border: "border-blue-950",
	},
	wind: {
		bg: "bg-green-800",
		border: "border-green-950",
	},
	light: {
		bg: "bg-yellow-800",
		border: "border-yellow-950",
	},
	darkness: {
		bg: "bg-purple-800",
		border: "border-purple-950",
	},
}

export default function SkillMap() {
	return (
		<div className="mx-auto grid w-max gap-2 p-2">
			<AspectGroup aspect="fire" className="col-start-2 row-start-1" />
			<AspectGroup aspect="light" className="col-start-1 row-start-2" />
			<AspectGroup aspect="wind" className="col-start-2 row-start-2" />
			<AspectGroup aspect="darkness" className="col-start-3 row-start-2" />
			<AspectGroup aspect="water" className="col-start-2 row-start-3" />
		</div>
	)
}

function AspectGroup({
	aspect,
	className,
}: {
	aspect: AspectName
	className: string
}) {
	return (
		<div
			className={twMerge("grid grid-cols-[repeat(3,auto)] gap-2", className)}
		>
			{skillsByAspect
				.get(aspect)
				?.map((skill) => (
					<SkillTile
						key={skill.name}
						skill={skill}
						className={`${aspectClasses[aspect].bg} ${aspectClasses[aspect].border}`}
					/>
				))}
		</div>
	)
}

function SkillTile({ skill, className }: { skill: Skill; className: string }) {
	const reactionStats = skill.reactionStats ?? skill.actionStats
	return (
		<div
			className={`flex-col-center size-[20rem] cursor-default gap-2 text-balance rounded-lg border-4 p-2 text-center text-white brightness-90 transition hover:brightness-110 ${className}`}
		>
			<h1 className="text-3xl/tight font-light">{skill.name}</h1>
			<p className="text-xl/tight">{skill.description}</p>
			<ul className="text-lg/tight opacity-85">
				{skill.actionStats && (
					<li>{`Action (${skill.actionStats.join("/")})`}</li>
				)}
				{reactionStats && <li>{`Reaction (${reactionStats.join("/")})`}</li>}
				{skill.isPassive && <li>{"Passive"}</li>}
			</ul>
		</div>
	)
}
