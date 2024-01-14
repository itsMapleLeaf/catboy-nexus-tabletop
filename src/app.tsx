// @refresh reload
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense, createSignal } from "solid-js"
import "tailwindcss/tailwind.css"
import { Panel } from "./components/Panel.tsx"

export default function App() {
	const [isBlue, setIsBlue] = createSignal(false)
	return (
		<main class="relative h-dvh bg-[size:40px_40px] bg-repeat bg-grid-10 bg-grid-theme-border/40">
			<Panel
				as="button"
				class={`absolute left-10 top-10 flex size-20 flex-col items-center justify-center rounded-md transition-[filter] hover:brightness-110 active:brightness-125 active:transition-none ${isBlue() ? "bg-blue-500" : "bg-red-500"}`}
				onClick={() => {
					setIsBlue(!isBlue())
				}}
			>
				test
			</Panel>
		</main>
	)
}

function Outlet() {
	return (
		<Router
			root={(props) => (
				<>
					<Suspense>{props.children}</Suspense>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
