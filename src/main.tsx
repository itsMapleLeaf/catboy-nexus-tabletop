import { createRoot } from "react-dom/client"
import { Root } from "./Root.tsx"

if (import.meta.env.DEV) {
	document.title += " [dev]"
}

createRoot(document.getElementById("root") as HTMLElement).render(<Root />)
