<script lang="ts">
	import { authService } from '$lib/service/authService.svelte';
	import { authStore } from '$lib/stores/authStore.svelte';
	import Button from '$lib/components/button';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	let isAuthenticated = $derived(authStore.isAuthenticated);

	function signOut() {
		authService.signOut();
	}
</script>

<div class="navbar sticky top-0 flex justify-between bg-base-100 shadow-sm">
	<div>
		<a href="/" class="btn text-2xl btn-ghost">Bastion</a>

		{#if isAuthenticated}
			<a href="/home" class="btn text-lg btn-ghost">Home</a>

			<a href="/tasks" class="btn text-lg btn-ghost">Tasks</a>
		{/if}
	</div>

	<div>
		{#if isAuthenticated}
			<Button variant={{ style: 'ghost' }} onclick={signOut} class="text-lg">Sign out</Button>
		{:else}
			<a href="/login" class="btn text-lg btn-ghost">Login</a>
		{/if}

		<ThemeSwitcher></ThemeSwitcher>
	</div>
</div>
