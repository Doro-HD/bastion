<script lang="ts">
	import { z } from 'zod/v4';
	import { authService } from '$lib/services/authService.svelte';
	import Card from '$lib/components/card';
	import Button from '$lib/components/button';
	import { getAuthCtx } from '$lib/contexts/authContext';

	const authCtx = getAuthCtx();

	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	const loginSchema = z
		.object({
			username: z.string().min(3),
			password: z.string().min(4),
			confirmPassword: z.string()
		})
		.refine((value) => value.password === value.confirmPassword);

	function submit(e: SubmitEvent) {
		e.preventDefault();

		const schemaResult = loginSchema.safeParse({ username, password, confirmPassword });
		if (!schemaResult.success) {
			return;
		}

		authService.login(authCtx, schemaResult.data.username, '');
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

				<label class="input">
					<span class="label">Password</span>
					<input type="password" placeholder="Password" bind:value={password} />
				</label>

				<label class="input">
					<span class="label">Confirm password</span>
					<input type="password" placeholder="Confirm password" bind:value={confirmPassword} />
				</label>
			</form>

			<Card.Actions>
				<Button variant={{ style: 'ghost' }}>Sign up</Button>

				<Button variant={{ color: 'primary' }} type="submit" form="login-form">Login</Button>
			</Card.Actions>
		</Card.Body>
	</Card.Root>
</div>
