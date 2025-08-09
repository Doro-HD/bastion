declare module 'cloudflare:test' {
	// ProvidedEnv controls the type of `import("cloudflare:test").env`
	// @ts-ignore - Can be empty for now
	interface ProvidedEnv extends Env {}
}
