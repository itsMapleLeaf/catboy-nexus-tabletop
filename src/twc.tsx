import { Component, ComponentProps, JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import { twMerge } from "tailwind-merge"

type ValidComponentStrict = keyof JSX.IntrinsicElements | Component

interface TwcComponentFactory<DefaultTag extends ValidComponentStrict> {
	(strings: TemplateStringsArray, ...values: string[]): TwcComponent<DefaultTag>
}

interface TwcComponent<DefaultTag extends ValidComponentStrict> {
	<As extends ValidComponentStrict = DefaultTag>(
		props: TwcComponentProps<As>,
	): JSX.Element
}

type TwcComponentProps<As extends ValidComponentStrict> = ComponentProps<As> & {
	as?: As
	class?: string
}

function createComponentFactory<DefaultTag extends ValidComponentStrict>(
	defaultTag: DefaultTag,
): TwcComponentFactory<DefaultTag> {
	return function createComponent(statics, ...dynamics) {
		const baseClasses: Array<string | undefined> = []
		for (let i = 0; i < statics.length - 1; i += 1) {
			baseClasses.push(statics[i])
			baseClasses.push(dynamics[i])
		}
		baseClasses.push(statics.at(-1))

		return function TwcComponent(props) {
			return (
				<Dynamic
					component={props.as ?? defaultTag}
					{...props}
					class={twMerge(baseClasses, props.class)}
				/>
			)
		}
	}
}

type Twc = typeof createComponentFactory & {
	[Tag in keyof JSX.IntrinsicElements]: TwcComponentFactory<Tag>
}

export const twc = new Proxy(createComponentFactory, {
	get: (_, defaultTag) => {
		if (typeof defaultTag !== "string") {
			throw new Error("Tag must be a string")
		}
		return createComponentFactory(defaultTag as keyof JSX.IntrinsicElements)
	},
}) as Twc
