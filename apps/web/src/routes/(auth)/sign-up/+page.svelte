<script lang="ts">
	import { Card, Form } from '$lib/components';
	import authService from '$lib/service/authService';

	let username = $state('');

	async function signUp() {
		const _isSuccess = authService.signUp({ username });
	}
</script>

<Card.Root>
	<Card.Content>
		<Form id="sign-up" aria-label="sign-up" onsubmit={signUp}>
			<div>
				<label for="username">Username</label>
				<input
					id="username"
					type="text"
					name="username"
					placeholder="username"
					bind:value={username}
				/>
			</div>
		</Form>
	</Card.Content>

	<Card.Actions>
		<button type="submit" form="sign-up">Submit</button>
	</Card.Actions>
</Card.Root>
