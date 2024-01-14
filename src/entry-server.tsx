import { createHandler } from "@solidjs/start/entry"
import { StartServer } from "@solidjs/start/server"

export default createHandler(() => (
	<StartServer
		document={(props) => (
			<html lang="en" class="bg-theme-background text-theme-copy">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
					{props.assets}
				</head>
				<body>
					<div id="app">{props.children}</div>
					{props.scripts}
				</body>
			</html>
		)}
	/>
))
