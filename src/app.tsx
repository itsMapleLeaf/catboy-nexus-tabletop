// @refresh reload
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"
import "tailwindcss/tailwind.css"
import { Panel } from "./components/Panel.tsx"

export default function App() {
	return (
		<section class="relative h-dvh bg-[size:40px_40px] bg-repeat bg-grid-10 bg-grid-theme-border/40">
			<Panel class="absolute left-10 top-10 flex size-20 flex-col items-center justify-center rounded-md">
				test
			</Panel>
		</section>
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
