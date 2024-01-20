import type { ComponentPropsWithoutRef } from "react"

export const iconNames = [
	"success",
	"failure",
	"advantage",
	"threat",
	"triumph",
	"despair",
	"light-point",
	"dark-point",
] as const

type IconName = (typeof iconNames)[number]

export function GenesysDieIcon({
	icon,
	...props
}: { icon: IconName } & ComponentPropsWithoutRef<"img">) {
	return (
		<img
			src={new URL(`../assets/genesys-dice/${icon}.svg`, import.meta.url).href}
			{...props}
			alt={props.alt ?? ""}
		/>
	)
}
