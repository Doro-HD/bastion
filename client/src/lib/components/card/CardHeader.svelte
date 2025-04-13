<script lang='ts'>
	import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children: Snippet;
    };
    const { class: className, children }: Props = $props();
</script>

<header class={className}>
    {@render children()}
</header>