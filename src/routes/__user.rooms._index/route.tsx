import { LucideGamepad2, LucidePlus } from "lucide-react"
import { range } from "~/helpers/range.ts"
import { Button } from "~/ui/Button.tsx"
import { PageLayout, PageLayoutGridList } from "~/ui/PageLayout.tsx"
import { Panel } from "~/ui/Panel.tsx"

export default function RoomList() {
	return (
		<PageLayout
			title="Your Rooms"
			headerAction={
				<Button icon={<LucidePlus />} appearance="solid">
					New Room
				</Button>
			}
		>
			<PageLayoutGridList
				items={[]}
				itemKey="title"
				renderItem={(item) => (
					<Panel
						as="button"
						appearance="translucent"
						className="flex gap-4 p-4 transition hover:brightness-125"
					>
						<LucideGamepad2 className="size-8" />
						<h3 className="text-2xl font-light">{item.title}</h3>
					</Panel>
				)}
				emptyState="You have no rooms yet."
			/>
		</PageLayout>
	)
}
