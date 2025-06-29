<script lang="ts">
	import Form from '$lib/components/form';

	function signUp() {
		console.log('Submit');
	}
</script>

<div class="w-82 border-2 p-2">
	<div>
		<Form id="sign-up" onsubmit={signUp}>
			<div>
				<label for="username">Username</label>
				<input id="username" type="text" name="username" placeholder="username" />
			</div>
		</Form>
	</div>

	<div class="flex justify-end">
		<button type="submit" form="sign-up">Submit</button>
	</div>
</div>
