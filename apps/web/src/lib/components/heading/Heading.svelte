<script lang="ts">
	import { type HeadingProps } from './index';

	const { tag = 'h1', children, class: className, ...attributes }: HeadingProps = $props();
</script>

<!--
@component
Heading is an thin wrapper around the h{x} tag, allowing for dynamic rendering but not reactive
-->

<svelte:element this={tag} class={className} {...attributes}>
	{@render children()}
</svelte:element>
