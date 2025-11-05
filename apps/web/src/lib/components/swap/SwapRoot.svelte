<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface IProps extends HTMLLabelAttributes {
		themeValue?: string;
		children: Snippet;
	}
	const { themeValue, children, class: className }: IProps = $props();
</script>

<!--
@component
Swap.Root is the root component of swap
-->

<label data-testid="swap-root" class={['swap', className]}>
	{#if themeValue}
		<input type="checkbox" class="theme-controller" value={themeValue} />
	{:else}
		<input type="checkbox" />
	{/if}

	{@render children()}
</label>
