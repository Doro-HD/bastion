<script lang="ts">
	import { Popover } from 'bits-ui';

	import { PUBLIC_API_URL } from '$env/static/public';
	import { Button, LabelInput } from '$lib/components';
	import cuid2 from '@paralleldrive/cuid2';

	type Props = {
		onCreation: () => void;
	};
	const { onCreation }: Props = $props();

	let cardId = cuid2.createId();
	let formElement: HTMLFormElement | null = null;

	async function createCard() {
		if (!formElement) {
			return;
		}

		const formData = new FormData(formElement);
		formData.set('id', cardId);

		const response = await fetch(PUBLIC_API_URL + '/cards', {
			method: 'POST',
			body: formData,
			credentials: 'include'
		});
		if (response.status === 200) {
			onCreation();
			cardId = cuid2.createId();
		}
	}
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<button {...props} class="border-2 p-2">
				<div class="i-lucide:plus"></div>
			</button>
		{/snippet}
	</Popover.Trigger>

	<Popover.Portal>
		<Popover.Content side="bottom" sideOffset={8} class="border-2 shadow p-2 bg-white">
			<form class="grid grid-cols-2 gap-2" onsubmit={createCard} bind:this={formElement}>
				<LabelInput name="name">Card name</LabelInput>
				<LabelInput name="description">Card description</LabelInput>

				<Button type="submit">Create new Card</Button>
			</form>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
