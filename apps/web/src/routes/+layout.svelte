<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from './Navbar.svelte';
	import { setAuthCtx } from '$lib/contexts/authContext';
	import { AuthStore } from '$lib/stores/authStore.svelte';

	setAuthCtx(new AuthStore());

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar></Navbar>

{@render children?.()}
