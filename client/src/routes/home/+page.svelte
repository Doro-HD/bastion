<script lang="ts">
	import { onMount } from 'svelte';

	import { PUBLIC_API_URL } from '$env/static/public';
	import { Button, Card } from '$lib/components';
	import CreateDeck from './CreateDeck.svelte';
	import CreateCard from './CreateCard.svelte';

	let decks: { id: string; name: string; description: string }[] = $state([]);

	onMount(() => {
		getDecks();
	});

	async function getDecks() {
		const response = await fetch(PUBLIC_API_URL + '/decks', {
			credentials: 'include'
		});

		if (response.status === 200) {
			const data = await response.json();
			decks = data.data;
		}
	}

	function onCreation() {
		getDecks();
	}

	async function deleteDeck(deckId: string) {
		const response = await fetch(PUBLIC_API_URL + '/decks/' + deckId, {
			method: 'DELETE',
			credentials: 'include'
		});

		if (response.status === 200) {
			getDecks();
		}
	}
</script>

<div class="px-2">
	<section class="space-y-2">
		<div class="flex gap-x-2 items-center">
			<h1 class="text-2xl font-bold">Decks</h1>

			<CreateDeck {onCreation}></CreateDeck>
		</div>

		<div class="grid grid-cols-3 gap-2">
			{#each decks as deck (deck.id)}
				<Card.Root>
					<Card.Header class="relative">
						<Card.Title>{deck.name}</Card.Title>

						<div class="absolute top-0 right-0">
							<CreateCard {onCreation} }></CreateCard>

							<Button onClick={() => deleteDeck(deck.id)}>
								<div class="i-lucide:x"></div>
							</Button>
						</div>
					</Card.Header>

					{deck.description}
				</Card.Root>
			{/each}
		</div>
	</section>
</div>
