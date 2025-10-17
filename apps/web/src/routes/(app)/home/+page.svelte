<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
</script>

<div class="pt-2 text-center">
	<h1 class="text-4xl font-bold">Welcome {authStore.username}</h1>
</div>
