<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		type?: 'button' | 'submit';
		formId?: string;
		class?: ClassValue;
		onClick?: () => void;
		children: Snippet;
	};
	const { type = 'button', formId, class: className, onClick, children }: Props = $props();
</script>

<button
	{type}
	form={formId}
	class={['shadow-sm border-2 p-2 rounded hover:scale-105', className]}
	onclick={onClick}
>
	{@render children()}
</button>
