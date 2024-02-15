import * as Ariakit from "@ariakit/react"
import { LucideX } from "lucide-react"
import { useState } from "react"
import { Button } from "~/ui/Button.tsx"
import { Input } from "~/ui/Input.tsx"
import { Form } from "./Form.tsx"
import { Modal, ModalButton, ModalPanel, useModalContext } from "./Modal.tsx"

type PromptButtonProps = Omit<Ariakit.DialogDisclosureProps, "onSubmit"> &
	PromptFormProps & {
		title: string
		description: string
	}

export function PromptButton({
	title,
	description,
	label,
	placeholder,
	confirmText,
	confirmIcon,
	onSubmit,
	...props
}: PromptButtonProps) {
	return (
		<Modal>
			<ModalButton {...props} />
			<ModalPanel title={title} description={description}>
				<PromptForm
					label={label}
					placeholder={placeholder}
					confirmText={confirmText}
					confirmIcon={confirmIcon}
					onSubmit={onSubmit}
				/>
			</ModalPanel>
		</Modal>
	)
}

type PromptFormProps = {
	label: string
	placeholder: string
	confirmText: string
	confirmIcon: React.ReactNode
	onSubmit: (value: string) => unknown
}

function PromptForm({
	label,
	placeholder,
	confirmText,
	confirmIcon,
	onSubmit,
}: PromptFormProps) {
	const [answer, setAnswer] = useState("")
	const modal = useModalContext()
	return (
		<Form
			onSubmit={async () => {
				await onSubmit(answer)
				modal?.hide()
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
	)
}
