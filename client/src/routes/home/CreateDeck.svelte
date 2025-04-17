<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Button, Card, LabelInput, Modal } from '$lib/components';
	import cuid2 from '@paralleldrive/cuid2';
	import { Dialog, Popover } from 'bits-ui';

    let deckId = cuid2.createId();
	let formElement: HTMLFormElement | null = null;

	async function createDeck(event: SubmitEvent) {
		if (!formElement) {
			return;
		}
		const formData = new FormData(formElement);
        formData.set('id', deckId);

		const response = await fetch(PUBLIC_API_URL + '/decks', {
			method: 'POST',
			body: formData,
			credentials: 'include'
		});
		console.log(response)
	}
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<button {...props} class='border-2 p-2'>
				<div class="i-lucide:plus"></div>
			</button>
		{/snippet}
	</Popover.Trigger>

	<Popover.Portal>
		<Popover.Content side='right' sideOffset={8} class='border-2 shadow p-2 bg-white'>
			<form class='grid grid-cols-2 gap-2' onsubmit={createDeck} bind:this={formElement}>
				<LabelInput name='name'>Deck name</LabelInput>
				<LabelInput name='description'>Deck description</LabelInput>

				<Button type='submit'>Create new deck</Button>
			</form>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>

<!--
<Button>
    <div class="i-lucide:plus"></div>
</Button>

<Modal>
</Modal>
-->