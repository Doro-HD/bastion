<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	//import { auth } from "$lib/auth.svelte";
</script>

<div class="py-2">
	<div class="flex justify-between px-2 pb-2 items-center">
		<h1>Bastion</h1>

		<div class="flex gap-x-2">
			{#if false}
				<a href="{PUBLIC_API_URL}/sign-out">Sign out</a>
			{:else}
				<a href="/sign-up">Sign up</a>

				<a href="/sign-in">Sign in</a>
			{/if}
		</div>
	</div>

	<div class="border-2"></div>
</div>
