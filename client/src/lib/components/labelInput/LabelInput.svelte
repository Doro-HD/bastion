<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		type?: 'text' | 'password';
		name: string;
		children: Snippet;
	};
	const { type = 'text', name, children }: Props = $props();
</script>

<label for={name}>{@render children()}</label>
<input class="border-2 ps-2" id={name} {type} {name} />
