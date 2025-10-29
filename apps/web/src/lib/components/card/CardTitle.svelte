<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Heading, type HeadingProps } from '$lib/components/heading';

	interface IProps extends HeadingProps {
		children: Snippet;
	}
	const { tag = 'h1', children, class: className, ...attributes }: IProps = $props();
</script>

<Heading data-testid="card-title" {tag} class={['card-title', className]} {...attributes}>
	{@render children()}
</Heading>
