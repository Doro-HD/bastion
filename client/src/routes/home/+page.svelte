<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Button, Card } from '$lib/components';
	import CreateDeck from './CreateDeck.svelte';

	let decks: { name: string, description: string }[] = $state([]);

	onMount(() => {
		getDecks()
	})

	async function getDecks() {
		const response = await fetch(PUBLIC_API_URL + '/decks', {
			credentials: 'include'
		});

		if (response.status === 200) {
			const data = await response.json();
			decks = data.data;
		}
	}
</script>


<div class="px-2">
	<section class="space-y-2">
		<div class="flex gap-x-2 items-center">
			<h1 class="text-2xl font-bold">Decks</h1>

			<CreateDeck></CreateDeck>
		</div>

		<div class="grid grid-cols-5 gap-2">
			{#each decks as deck}
				<Card.Root>
					<Card.Header>
						<Card.Title>{deck.name}</Card.Title>
					</Card.Header>

					{deck.description}
				</Card.Root>
			{/each}
		</div>
	</section>
</div>
