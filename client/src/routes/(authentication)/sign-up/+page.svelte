<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import cuid2 from '@paralleldrive/cuid2';

	import { Button, LabelInput, Card } from '$lib/components';

	const newUserId = cuid2.createId();
	let formElement: HTMLFormElement | null = null;

	async function signUp(event: SubmitEvent) {
		event.preventDefault();
		if (!formElement) {
			return;
		}

		const formData = new FormData(formElement)
		formData.set('id', newUserId);

        const response = await fetch(`${PUBLIC_API_URL}/auth/sign-up`, {
            method: 'POST',
			body: formData
        });
		const data = await response.json();
        console.log(data);
	}
</script>

<Card.Root>
	<Card.Header>
		<h1>Sign up</h1>
	</Card.Header>

	<form id="sign-up" onsubmit={signUp} class="grid grid-cols-2 gap-y-2" bind:this={formElement}>
		<LabelInput name="username">Username</LabelInput>

		<LabelInput type="password" name="password">Password</LabelInput>

		<LabelInput type="password" name="confirm-password">Confirm password</LabelInput>
	</form>

	<Card.Footer>
		<Button type="submit" formId="sign-up">Submit</Button>
	</Card.Footer>
</Card.Root>
