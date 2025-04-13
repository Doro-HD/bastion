<script lang='ts'>
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };
    const { children }: Props = $props();
</script>

<div class="shadow p-2 flex flex-col gap-y-2">
    {@render children()}
</div>