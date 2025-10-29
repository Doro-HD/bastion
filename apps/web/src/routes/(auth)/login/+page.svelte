<script lang="ts">
	import { z } from 'zod/v4';
	import { authService } from '$lib/service/authService.svelte';
	import Card from '$lib/components/card';
	import Button from '$lib/components/button';

	const loginSchema = z.object({
		username: z.string().min(3)
	});
	let username = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();

		const schemaResult = loginSchema.safeParse({ username });
		if (!schemaResult.success) {
			return;
		}

		authService.login(schemaResult.data.username);
	}
</script>

<div class="flex h-dvh items-center justify-center">
	<Card.Root>
		<Card.Body>
			<Card.Title>Login</Card.Title>

			<form id="login-form" onsubmit={submit}>
				<label class="input">
					<span class="label">Username</span>
					<input type="text" placeholder="Username" bind:value={username} />
				</label>
			</form>

			<Card.Actions>
				<Button variant={{ style: 'ghost' }}>Sign up</Button>

				<Button variant={{ color: 'primary' }} type="submit" form="login-form">Login</Button>
			</Card.Actions>
		</Card.Body>
	</Card.Root>
</div>
