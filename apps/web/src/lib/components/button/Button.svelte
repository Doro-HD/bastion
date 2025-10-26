<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		variant?: {
			color?: 'primary' | 'secondary';
		};
		children: Snippet;
	};
	const { variant, children }: TProps = $props();
</script>

<button
	class={[
		'btn',
		{ 'btn-primary': variant?.color === 'primary', 'btn-secondary': variant?.color === 'secondary' }
	]}>{@render children()}</button
>
