<script lang="ts">
	import { type Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet;
	};
	const { class: className, children }: Props = $props();
</script>

<footer class={className}>
	{@render children()}
</footer>
