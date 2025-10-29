<script lang="ts">
	import { type HeadingProps } from './index';

	const { tag = 'h1', children, class: className, ...attributes }: HeadingProps = $props();
</script>

<svelte:element this={tag} class={className} {...attributes}>
	{@render children()}
</svelte:element>
