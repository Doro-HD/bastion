<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="flex justify-center items-center h-full">
	{@render children()}
</div>
