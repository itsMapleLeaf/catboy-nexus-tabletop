import { render } from "solid-js/web"
import { App } from "./App.tsx"

if (process.env.NODE_ENV === "development") {
	document.title += " [dev]"
}

render(() => <App />, document.getElementById("app") as HTMLElement)
