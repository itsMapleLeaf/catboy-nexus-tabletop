import * as Ariakit from "@ariakit/react"
import * as Lucide from "lucide-react"
import { useLocalStorageState } from "~/helpers/react.ts"
import { Button } from "../ui/Button.tsx"

export function Collapse({
	title,
	children,
	defaultOpen = false,
	storageKey = title,
}: {
	title: string
	children: React.ReactNode
	defaultOpen?: boolean
	storageKey?: string
}) {
	const [open, setOpen] = useLocalStorageState({
		key: `collapse:${storageKey}`,
		deserialize: (value) => (value ? value === "true" : defaultOpen),
		serialize: (value) => value.toString(),
	})

	return (
		<Ariakit.DisclosureProvider open={open} setOpen={setOpen}>
			<div>
				<Ariakit.Disclosure
					render={<Button />}
					className="collapse-disclosure w-full gap-1 px-1 text-lg"
				>
					<Lucide.ChevronRight className="transition group-open:rotate-90 [.collapse-disclosure[aria-expanded=true]>&]:rotate-90" />
					<span className="translate-y-[-1px]">{title}</span>
				</Ariakit.Disclosure>
				<Ariakit.DisclosureContent className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 data-[enter]:grid-rows-[1fr] motion-reduce:duration-0">
					<div className="overflow-hidden">
						{/* using this spacer div because padding and margin don't animate cleanly */}
						<div className="h-3" />
						{children}
					</div>
				</Ariakit.DisclosureContent>
			</div>
		</Ariakit.DisclosureProvider>
	)
}
