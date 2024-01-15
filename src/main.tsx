import "@fontsource/barlow/400.css"
import "@fontsource/barlow/500.css"
import "tailwindcss/tailwind.css"

import { render } from "solid-js/web"
import { App } from "./App.tsx"

render(() => <App />, document.getElementById("app") as HTMLElement)
