import { Component, ComponentProps, JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import { twMerge } from "tailwind-merge"

type ValidComponentStrict = keyof JSX.IntrinsicElements | Component

interface TwcComponentFactory<DefaultTag extends ValidComponentStrict> {
	(strings: TemplateStringsArray, ...values: string[]): TwcComponent<DefaultTag>
}

interface TwcComponent<DefaultTag extends ValidComponentStrict> {
	<As extends ValidComponentStrict = DefaultTag>(
		props: ComponentProps<As> & { as?: As; class?: string },
	): JSX.Element
}

function createComponentFactory<DefaultTag extends ValidComponentStrict>(
	defaultTag: DefaultTag,
): TwcComponentFactory<DefaultTag> {
	return function createComponent(strings, ...values) {
		return function TwcComponent(props) {
			function* classes() {
				for (let i = 0; i < strings.length - 1; i += 1) {
					yield strings[i]
					yield values[i]
				}
				yield strings.at(-1)
				yield props.class
			}
			return (
				<Dynamic
					component={props.as ?? defaultTag}
					{...props}
					class={twMerge(...classes())}
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
