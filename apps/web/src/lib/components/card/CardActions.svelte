<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface IProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}
	const { children, class: className, ...attributes }: IProps = $props();
</script>

<!--
@component
Card.Actions is a container for card relevant actions
-->

<div data-testid="card-actions" class={['card-actions', className]} {...attributes}>
	{@render children()}
</div>
