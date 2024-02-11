import * as Ariakit from "@ariakit/react"
import { LucideX } from "lucide-react"
import type { FormEvent } from "react"
import { Button } from "~/ui/Button.tsx"
import { Input } from "~/ui/Input.tsx"
import { Panel } from "~/ui/Panel.tsx"

export function PromptButton({
	title,
	description,
	label,
	placeholder,
	confirmText,
	confirmIcon,
	onSubmit,
	...props
}: Ariakit.DialogDisclosureProps & {
	title: string
	description: string
	label: string
	placeholder: string
	confirmText: string
	confirmIcon: React.ReactNode
	onSubmit: (value: string) => void
}) {
	const store = Ariakit.useDialogStore()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const answer = event.currentTarget.elements.namedItem(
			"answer",
		) as HTMLInputElement
		onSubmit(answer.value)
		store.hide()
	}

	return (
		<Ariakit.DialogProvider store={store}>
			<Ariakit.DialogDisclosure {...props} />
			<Ariakit.Dialog
				backdrop={
					<div className="bg-black/50 opacity-0 backdrop-blur-md transition data-[enter]:opacity-100" />
				}
				className="pointer-events-none fixed inset-0 flex translate-y-4 flex-col opacity-0 transition *:pointer-events-auto data-[enter]:translate-y-0 data-[enter]:opacity-100"
				unmountOnHide
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
								className="-mr-1 aspect-square h-11 justify-center p-0"
							>
								<LucideX />
							</Button>
						</header>
						<form className="flex flex-col gap-3 p-3" onSubmit={handleSubmit}>
							<label className="flex flex-col">
								<div className="mb-1 text-sm/none font-medium">{label}</div>
								<Input name="answer" placeholder={placeholder} required />
							</label>
							<div className="flex justify-end gap-2">
								<Button as={Ariakit.DialogDismiss} appearance="clear">
									<LucideX /> Cancel
								</Button>
								<Button type="submit" appearance="solid">
									{confirmIcon}
									{confirmText}
								</Button>
							</div>
						</form>
					</Panel>
				</div>
			</Ariakit.Dialog>
		</Ariakit.DialogProvider>
	)
}
