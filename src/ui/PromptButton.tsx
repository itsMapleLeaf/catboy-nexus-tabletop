import * as Ariakit from "@ariakit/react"
import { LucideX } from "lucide-react"
import { type FormEvent, useState } from "react"
import { Button } from "~/ui/Button.tsx"
import { Input } from "~/ui/Input.tsx"
import { Panel } from "~/ui/Panel.tsx"
import { Form } from "./Form.tsx"

export function PromptButton({
	title,
	description,
	label,
	placeholder,
	confirmText,
	confirmIcon,
	onSubmit,
	...props
}: Omit<Ariakit.DialogDisclosureProps, "onSubmit"> & {
	title: string
	description: string
	label: string
	placeholder: string
	confirmText: string
	confirmIcon: React.ReactNode
	onSubmit: (value: string) => unknown
}) {
	const [answer, setAnswer] = useState("")
	const store = Ariakit.useDialogStore()

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
								className="-mr-1 aspect-square h-11 items-center justify-center p-0"
							>
								<LucideX />
								<span className="sr-only">Close</span>
							</Button>
						</header>
						<Form
							onSubmit={async () => {
								await onSubmit(answer)
								store.hide()
							}}
							className="flex flex-col gap-3 p-3"
						>
							<label className="flex flex-col">
								<div className="mb-1 text-sm/none font-medium">{label}</div>
								<Ariakit.Focusable
									autoFocus
									render={
										<Input
											value={answer}
											onChange={(event) => setAnswer(event.currentTarget.value)}
											placeholder={placeholder}
											required
										/>
									}
								/>
							</label>
							<div className="flex justify-end gap-2">
								<Button
									as={Ariakit.DialogDismiss}
									appearance="clear"
									icon={<LucideX />}
								>
									Cancel
								</Button>
								<Button type="submit" appearance="solid" icon={confirmIcon}>
									{confirmText}
								</Button>
							</div>
						</Form>
					</Panel>
				</div>
			</Ariakit.Dialog>
		</Ariakit.DialogProvider>
	)
}
