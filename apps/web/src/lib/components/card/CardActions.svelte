<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface IProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}
	const { children, class: className, ...attributes }: IProps = $props();
</script>

<div data-testid="card-actions" class={['card-actions', className]} {...attributes}>
	{@render children()}
</div>
