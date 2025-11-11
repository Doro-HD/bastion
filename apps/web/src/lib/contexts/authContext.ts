import { AuthStore } from '$lib/stores/authStore.svelte';
import { createCtx } from '$lib/util';

type TAuthCtx = AuthStore;

const [getAuthCtx, setAuthCtx] = createCtx<TAuthCtx>('auth');

export { getAuthCtx, setAuthCtx, type TAuthCtx };
