<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<div class="navbar flex justify-between bg-base-100 shadow-sm">
	<a href="/" class="btn text-2xl btn-ghost">Bastion</a>

	<div>
		<a href="/sign-in" class="btn text-lg btn-ghost">Sign in</a>

		<ThemeSwitcher></ThemeSwitcher>
	</div>
</div>
