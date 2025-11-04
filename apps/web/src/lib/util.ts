import { getContext, setContext } from 'svelte';

/**
 * @description
 * Creates a type safe context
 * @param key - The key to use for the context
 */
function createCtx<T>(key: string): [() => T, (ctx: T) => void] {
	return [
		() => getContext(key),
		(ctx: T) => {
			setContext(key, ctx);
		}
	];
}

export { createCtx };
