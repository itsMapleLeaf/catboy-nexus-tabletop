import "@fontsource/barlow"
import "tailwindcss/tailwind.css"

import { render } from "solid-js/web"
import { App } from "./App.tsx"

render(() => <App />, document.getElementById("app") as HTMLElement)
