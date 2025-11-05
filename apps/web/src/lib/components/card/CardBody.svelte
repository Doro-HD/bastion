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
Card.Body is the main body of the card component
-->

<div data-testid="card-body" class={['card-body', className]} {...attributes}>
	{@render children()}
</div>
