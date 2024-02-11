import {
	type ComponentPropsWithoutRef,
	type ForwardedRef,
	forwardRef,
} from "react"

export const ExternalLink = forwardRef(function ExternalLink(
	props: ComponentPropsWithoutRef<"a"> & { href: string },
	ref: ForwardedRef<HTMLAnchorElement>,
) {
	return <a target="_blank" rel="noreferrer" {...props} ref={ref} />
})
