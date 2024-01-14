// @refresh reload
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"
import "tailwindcss/tailwind.css"
import { Panel } from "./components/Panel.tsx"

export default function App() {
	return (
		<section class="bg-grid-10 h-dvh bg-grid-theme-border/40 bg-repeat bg-[size:40px_40px] relative">
			<Panel class="size-20 absolute left-10 top-10 flex justify-center flex-col rounded-md items-center">
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
