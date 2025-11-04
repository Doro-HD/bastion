<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface IProps extends HTMLAttributes<HTMLDivElement> {
		type: 'off' | 'on';
		children: Snippet;
	}
	const { type, class: className, children, ...attributes }: IProps = $props();
</script>

<!--
@component
Swap.Item is a sub component of swap, meant to specify if it is the on or off item
-->

<div
	data-testid="swap-item"
	class={[{ 'swap-off': type === 'off' }, { 'swap-on': type === 'on' }, className]}
	{...attributes}
>
	{@render children()}
</div>
