import { Component, ComponentProps, JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import { twMerge } from "tailwind-merge"

export const twc = new Proxy(
	{},
	{
		get: (_, tag) => {
			if (typeof tag !== "string") {
				throw new Error("Tag must be a string")
			}
			return (strings: TemplateStringsArray, ...values: string[]) => {
				return (props: {
					class?: string
					as?: keyof JSX.IntrinsicElements | Component
				}) => {
					const className = () => {
						const classes = []
						for (let i = 0; i < strings.length; i++) {
							classes.push(strings[i])
							if (i < values.length) {
								classes.push(values[i])
							}
						}
						classes.push(props.class)
						return twMerge(classes)
					}
					return (
						<Dynamic
							component={props.as ?? tag}
							{...props}
							class={className()}
						/>
					)
				}
			}
		},
	},
) as Twc

type Twc = {
	[K in keyof JSX.IntrinsicElements]: (
		strings: TemplateStringsArray,
		...values: string[]
	) => <As extends keyof JSX.IntrinsicElements | Component = K>(
		props: ComponentProps<As> & { as?: As },
	) => JSX.Element
}
