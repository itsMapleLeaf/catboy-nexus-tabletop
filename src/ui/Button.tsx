import type { Component, ComponentProps, JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { VariantProps } from "tailwind-variants"
import type { ValidComponentStrict } from "~/solid/types.ts"
import { twVariants } from "./twVariants.ts"

export const buttonStyle = twVariants({
	base: "flex w-full min-w-0 cursor-pointer select-none list-none items-center gap-1.5 rounded p-2 leading-none transition-colors hover:bg-theme-border",
})

export type ButtonProps<ComponentProp extends ValidComponentStrict = "button"> =
	ComponentProps<ComponentProp> &
		VariantProps<typeof buttonStyle> & {
			text?: JSX.Element
			icon?: Component<{ class?: string }>
			class?: string
			component?: ComponentProp
		}

export function Button<ComponentProp extends ValidComponentStrict = "button">(
	props: ButtonProps<ComponentProp>,
) {
	return (
		<Dynamic<ValidComponentStrict>
			{...props}
			component={props.component ?? "button"}
			type={"type" in props ? props.type : "button"}
			class={buttonStyle({ ...props, class: props.class })}
		>
			<Dynamic component={props.icon} class="size-4" />
			{props.text}
		</Dynamic>
	)
}
