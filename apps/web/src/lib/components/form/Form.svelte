<script lang="ts">
	import type { Snippet } from 'svelte';

	interface IProps {
		id?: string;
		'aria-label': string;
		onsubmit: () => void;
		children: Snippet;
	}
	const { id, 'aria-label': ariaLabel, onsubmit, children }: IProps = $props();
</script>

<form {id} {onsubmit} aria-label={ariaLabel}>
	{@render children()}
</form>
