<script lang="ts">
	import { authService } from '$lib/service/authService.svelte';
	import { authStore } from '$lib/stores/authStore.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	function signOut() {
		authService.signOut();
	}
</script>

<div class="navbar sticky top-0 flex justify-between bg-base-100 shadow-sm">
	<a href="/" class="btn text-2xl btn-ghost">Bastion</a>

	<div>
		{#if authStore.isAuthenticated}
			<button onclick={signOut} class="btn text-lg btn-ghost">Sign out</button>
		{:else}
			<a href="/login" class="btn text-lg btn-ghost">Login</a>
		{/if}

		<ThemeSwitcher></ThemeSwitcher>
	</div>
</div>
