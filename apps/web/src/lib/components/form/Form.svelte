<script lang="ts">
	import type { Snippet } from 'svelte';

	interface IProps {
		id?: string;
		onsubmit: () => void;
		children: Snippet;
	}
	const { id, onsubmit, children }: IProps = $props();
</script>

<form {id} {onsubmit} aria-label="Foo">
	{@render children()}
</form>
