import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"

if (import.meta.env.DEV) {
	document.title += " [dev]"
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />)
