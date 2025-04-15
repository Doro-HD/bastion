<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_API_URL } from '$env/static/public';

	import { Button, Card, LabelInput } from '$lib/components';

	let formElement: HTMLFormElement | null = null;

	async function signUp(event: SubmitEvent) {
		event.preventDefault();
		if (!formElement) {
			return;
		}

		const formData = new FormData(formElement);

		const response = await fetch(`${PUBLIC_API_URL}/auth/sign-in`, {
			method: 'POST',
			body: formData
		});
		if (response.status === 200) {
			goto('/');
		}
	}
</script>

<Card.Root>
	<Card.Header>
		<h1>Sign in</h1>
	</Card.Header>

	<form id="sign-in" onsubmit={signUp} class="grid grid-cols-2 gap-y-2" bind:this={formElement}>
		<LabelInput name="username">Username</LabelInput>

		<LabelInput type="password" name="password">Password</LabelInput>
	</form>

	<Card.Footer class="flex justify-end">
		<Button type="submit" formId="sign-in">Sign in</Button>
	</Card.Footer>
</Card.Root>
