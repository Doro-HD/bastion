<script lang="ts">
	import { goto } from '$app/navigation';
	import getAuthStore from '$lib/stores/authStore.svelte';

	const authStore = getAuthStore();

	$effect(() => {
		if (!authStore.isAuthorized) {
			goto('/');
		}
	});
</script>

<h1>Authorized</h1>
