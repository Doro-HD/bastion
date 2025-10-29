<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface IProps extends HTMLAttributes<HTMLDivElement> {
		type: 'off' | 'on';
		children: Snippet;
	}
	const { type, class: className, children, ...attributes }: IProps = $props();
</script>

<div
	data-testid="swap-item"
	class={[{ 'swap-off': type === 'off' }, { 'swap-on': type === 'on' }, className]}
	{...attributes}
>
	{@render children()}
</div>
