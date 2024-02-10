import { redirect } from "@remix-run/node";
import logo from "../assets/logo-filled-light.svg"

export async function loader() {
	return redirect(logo, {
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, stale-while-revalidate',
		}
	})
}
