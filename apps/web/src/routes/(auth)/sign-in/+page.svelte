<script lang="ts">
	import * as Card from '$lib/components/card';
	import Form from '$lib/components/form';

	function signUp() {
		console.log('Submit');
	}
</script>

<Card.Root>
	<Card.Content>
		<Form id="sign-in" aria-label="sign-in" onsubmit={signUp}>
			<div>
				<label for="username">Username</label>
				<input id="username" type="text" name="username" placeholder="username" />
			</div>
		</Form>
	</Card.Content>

	<Card.Actions>
		<button type="submit" form="sign-in">Submit</button>
	</Card.Actions>
</Card.Root>
