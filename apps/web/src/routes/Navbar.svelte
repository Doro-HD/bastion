<script lang="ts">
	import getAuthStore from '$lib/stores/authStore.svelte';

	const authStore = getAuthStore();
</script>

<div class="flex justify-between border-b-2 p-2">
	<h1>Bastion</h1>

	{#if authStore.isAuthorized}
		<a href="">Logout</a>
	{:else}
		<a href="/sign-in">Log In</a>
	{/if}
</div>
