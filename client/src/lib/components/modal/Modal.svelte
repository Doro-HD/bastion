<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Card } from '../index';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();

	let hidden = $state(false);

	function onclick(e: MouseEvent) {
		hidden = true;
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			hidden = true;
		}
	}
</script>

<div
	class="w-full h-full fixed top-0 left-0 z-1 bg-black/70"
	{hidden}
	{onclick}
	{onkeydown}
	role="dialog"
	tabindex="-1"
>
	<div class="h-full w-full flex justify-center items-center">
		<Card.Root
			class={{ 'bg-white': true, 'w-lg': true }}
			onclick={(e: MouseEvent) => e.stopPropagation()}
		>
			{@render children()}
		</Card.Root>
	</div>
</div>
