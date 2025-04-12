<script lang='ts'>
	import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };
    const { children }: Props = $props();
</script>

<div class='flex justify-center items-center h-full'>
    <div class='shadow p-2 flex flex-col gap-y-2'>
        <header>
            <h1>Sign up</h1>
        </header>

        {@render children()}

        <footer class='flex justify-end'>
            <button>Sign up</button>
        </footer>
    </div>
</div>
