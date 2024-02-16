import { LucideWrench } from "lucide-react"
import { GenesysDiceRolls } from "~/genesys/GenesysDiceRolls"
import { useRoom } from "~/rooms/context.tsx"
import { Button } from "~/ui/Button.tsx"
import { Modal, ModalButton, ModalPanel } from "~/ui/Modal.tsx"
import { Panel } from "~/ui/Panel.tsx"
import { QueryResult } from "~/ui/QueryResult.tsx"
import { PageHeader, PageLayout } from "~/ui/page"
import { PageMainHeading } from "~/ui/page"

export default function RoomPage() {
	const room = useRoom()
	return (
		<QueryResult value={room} emptyState="Room not found">
			{(room) => (
				<PageLayout className="h-dvh">
					<PageHeader>
						<PageMainHeading className="mr-auto">{room.title}</PageMainHeading>
						<SettingsButton />
					</PageHeader>
					<main className="min-h-0 flex-1 gap-2">
						<Panel className="h-full w-full max-w-md">
							<GenesysDiceRolls />
						</Panel>
					</main>
				</PageLayout>
			)}
		</QueryResult>
	)
}

function SettingsButton() {
	return (
		<Modal>
			<ModalButton
				render={<Button appearance="solid" icon={<LucideWrench />} />}
			>
				Settings
			</ModalButton>
			<ModalPanel title="Room settings">
				<div className="h-[150dvh]">placeholder</div>
			</ModalPanel>
		</Modal>
	)
}

function InitiativeSection() {
	return <section className="flex-center h-full">initiative</section>
}

function DestinySection() {
	return <section className="flex-center h-full">destiny</section>
}

function PositioningSection() {
	return <section className="flex-center h-full">positioning</section>
}
