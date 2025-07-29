<script lang="ts">
	import type { Snippet } from 'svelte';

	interface IProps {
		children: Snippet;
	}
	const { children }: IProps = $props();
</script>

<div>
	{@render children()}
</div>
