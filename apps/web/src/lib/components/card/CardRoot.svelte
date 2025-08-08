<script lang="ts">
	import type { Snippet } from 'svelte';

	interface IProps {
		children: Snippet;
	}
	const { children }: IProps = $props();
</script>

<div class="w-82 border-2 p-2">
	{@render children()}
</div>
