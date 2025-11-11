<script lang="ts">
	import { browser } from '$app/environment';
	import { getAuthCtx } from '$lib/contexts/authContext';
	import { authService } from '$lib/services/authService.svelte';
	import type { Snippet } from 'svelte';

	type TProps = {
		children: Snippet;
	};
	const { children }: TProps = $props();

	const authCtx = getAuthCtx();

	if (browser) {
		authService.authenticatedOnly(authCtx);
	}
</script>

{@render children()}
