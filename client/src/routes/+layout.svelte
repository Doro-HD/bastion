<script lang='ts'>
	import type { Snippet } from 'svelte';
    import 'virtual:uno.css'

    import '../app.css';
	import Navbar from './Navbar.svelte';

    type Props = {
        children: Snippet;
    };
    const { children }: Props = $props(); 
</script>

<aside>
    <Navbar></Navbar>
</aside>

<main class='grow-1'>
    {@render children()}
</main>