<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		type?: 'button' | 'submit';
		formId?: string;
		onClick?: () => void;
		children: Snippet;
	};
	const { type = 'button', formId, onClick, children }: Props = $props();
</script>

<button {type} form={formId} class="shadow-sm border-2 p-2 rounded hover:scale-105" onclick={onClick}>
	{@render children()}
</button>
