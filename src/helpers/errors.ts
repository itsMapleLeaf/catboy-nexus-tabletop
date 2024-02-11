export function raise(value: unknown): never {
	throw typeof value === "string" ? new Error(value) : value
}
