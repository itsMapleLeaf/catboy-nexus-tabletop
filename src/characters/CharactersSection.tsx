import * as Lucide from "lucide-react"
import { twMerge } from "tailwind-merge"
import { Button } from "~/ui/Button.tsx"
import { Panel } from "~/ui/Panel.tsx"
import { Tooltip } from "~/ui/Tooltip.tsx"

export function CharactersSection() {
	return (
		<section className="flex flex-col gap-2 p-2">
			<h2 className="sr-only">Characters</h2>
			{[...Array(10)].map((_, i) => (
				<Panel key={i} className="flex items-center gap-3 p-3">
					<div className="flex-center size-16 rounded-full border border-theme-border bg-theme-foreground">
						avatar
					</div>
					<div className="flex flex-1 flex-col justify-center gap-1">
						<h3 className="text-2xl/none font-light">Name</h3>
						<div className="-mx-1 flex">
							{[
								{
									label: "Wounds",
									icon: <Lucide.HeartCrack />,
									value: 0,
									max: 10,
									className: twMerge("!text-red-400"),
								},
								{
									label: "Strain",
									icon: <Lucide.Zap />,
									value: 0,
									max: 14,
									className: twMerge("!text-orange-400"),
								},
								{
									label: "Currency",
									icon: <Lucide.Coins />,
									value: 0,
									className: twMerge("!text-amber-400"),
								},
							].map((item) => (
								<Tooltip
									key={item.label}
									className={twMerge(
										"flex cursor-default items-center gap-1",
										item.className,
									)}
									tooltip={item.label}
									render={<Button appearance="clear" className="h-6 px-1" />}
								>
									<dt className="flex items-center font-medium uppercase tracking-wide">
										<span className="sr-only">{item.label}</span>
										<span className="*:size-4">{item.icon}</span>
									</dt>
									<dd className="font-medium tabular-nums">
										{[item.value, item.max]
											.filter((it) => it != null)
											.join("/")}
									</dd>
								</Tooltip>
							))}
						</div>
						<p className="text-sm/none text-theme-copy-lighter">
							played by <span className="text-theme-copy-light">someone</span>
						</p>
					</div>
				</Panel>
			))}
		</section>
	)
}
