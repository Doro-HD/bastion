<script lang="ts">
	import { browser } from '$app/environment';
	import { authService } from '$lib/service/authService.svelte';
	import type { Snippet } from 'svelte';

	type TProps = {
		children: Snippet;
	};
	const { children }: TProps = $props();

	if (browser) {
		authService.nonAuthenticatedOnly();
	}
</script>

{@render children()}
