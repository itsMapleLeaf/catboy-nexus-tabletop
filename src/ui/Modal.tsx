import * as Ariakit from "@ariakit/react"
import { LucideX } from "lucide-react"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { Button } from "~/ui/Button.tsx"
import { Panel } from "~/ui/Panel.tsx"

export function Modal(props: Ariakit.DialogProviderProps) {
	return <Ariakit.DialogProvider {...props} />
}

export function ModalButton(props: Ariakit.DialogDisclosureProps) {
	return <Ariakit.DialogDisclosure {...props} />
}

export function ModalPanel({
	title,
	description,
	className,
	children,
	...props
}: Ariakit.DialogProps & { title: string; description?: string }) {
	return (
		<Ariakit.Dialog
			backdrop={<Backdrop />}
			className={twMerge(
				"pointer-events-none fixed inset-0 flex translate-y-4 flex-col overflow-y-auto p-4 opacity-0 transition *:pointer-events-auto data-[enter]:translate-y-0 data-[enter]:opacity-100",
				className,
			)}
			unmountOnHide
			{...props}
		>
			<div className="m-auto w-full max-w-screen-sm">
				<Panel appearance="translucent" className="overflow-clip">
					<header className="flex items-center justify-between gap-3 border-b border-theme-border bg-black/25 p-3">
						<div>
							<Ariakit.DialogHeading className="text-3xl font-light">
								{title}
							</Ariakit.DialogHeading>
							<Ariakit.DialogDescription>
								{description}
							</Ariakit.DialogDescription>
						</div>
						<Button
							as={Ariakit.DialogDismiss}
							size="lg"
							appearance="clear"
							className="-mr-1 aspect-square h-11 items-center justify-center p-0"
						>
							<LucideX />
							<span className="sr-only">Close</span>
						</Button>
					</header>
					{children}
				</Panel>
			</div>
		</Ariakit.Dialog>
	)
}

export function useModalContext() {
	return Ariakit.useDialogContext()
}

const Backdrop = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div">
>(function Backdrop(props, ref) {
	const modal = useModalContext()
	return (
		<div
			{...props}
			ref={ref}
			className="bg-black/50 opacity-0 backdrop-blur-md transition data-[enter]:opacity-100"
			onClick={(event) => {
				if (event.currentTarget === event.target) {
					modal?.hide()
				}
			}}
		/>
	)
})
