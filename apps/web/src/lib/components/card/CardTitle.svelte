<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Heading, type HeadingProps } from '$lib/components/heading';

	interface IProps extends HeadingProps {
		children: Snippet;
	}
	const { tag = 'h1', children, class: className, ...attributes }: IProps = $props();
</script>

<!--
@component
Card.Title is a simple wrapper around the Heading component, that applies some daisyui styling to it
-->

<Heading data-testid="card-title" {tag} class={['card-title', className]} {...attributes}>
	{@render children()}
</Heading>
