<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';

	import Button from '$lib/components/Button.svelte';
	import LabelInput from '$lib/components/LabelInput.svelte';

	let formElement: HTMLFormElement | null = null;

	async function signUp(event: SubmitEvent) {
		event.preventDefault();
		if (!formElement) {
			return;
		}

		const formData = new FormData(formElement)

        const response = await fetch(`http://${PUBLIC_API_URL}/auth/sign-in`, {
            method: 'POST',
			body: formData
        });
		const data = await response.json();
        console.log(data);
	}
</script>

<div class="shadow p-2 flex flex-col gap-y-2">
	<header>
		<h1>Sign up</h1>
	</header>

	<form id="sign-up" onsubmit={signUp} class="grid grid-cols-2 gap-y-2" bind:this={formElement}>
		<LabelInput name="username">Username</LabelInput>

		<LabelInput type="password" name="password">Password</LabelInput>
	</form>

	<footer class="flex justify-end">
		<Button type="submit" formId="sign-up">Submit</Button>
	</footer>
</div>
