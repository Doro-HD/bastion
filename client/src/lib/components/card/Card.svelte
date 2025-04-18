<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	};
	const { class: className, onclick, children }: Props = $props();
</script>

<div class={['shadow p-2 flex flex-col gap-y-2', className]} {onclick} role="none">
	{@render children()}
</div>
