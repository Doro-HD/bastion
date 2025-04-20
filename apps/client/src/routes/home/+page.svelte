<script lang="ts">
	import { onMount } from 'svelte';

	import { PUBLIC_API_URL } from '$env/static/public';
	import { Button, Card } from '$lib/components';
	import CreateDeck from './CreateDeck.svelte';
	import CreateCard from './CreateCard.svelte';

	let decks: { id: string; name: string; description: string }[] = $state([]);
	let activeCards: { id: string, name: String, description: string }[] = $state([]);

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

	async function drawCard(deckId: string) {
		const response = await fetch(PUBLIC_API_URL + '/cards/draw?deck-id=' + deckId, {
			credentials: 'include'
		});

		if (response.status === 200) {
			const data = await response.json();
			activeCards.push(data.data);
		}
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
	<section>
		<div class="flex gap-x-2 items-center">
			<h1 class="text-2xl font-bold">Active</h1>
		</div>

		<div class="grid grid-cols-3 gap-2">
			{#each activeCards as activeCard}
				<Card.Root>
					<Card.Header class="relative">
						<Card.Title>{activeCard.name}</Card.Title>
					</Card.Header>

					{activeCard.description}
				</Card.Root>
			{/each}
		</div>
	</section>

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
							<Button onClick={() => drawCard(deck.id)}>
								<div class='i-lucide:arrow-big-down-dash'></div>
							</Button>

							<CreateCard deckId={deck.id} {onCreation}></CreateCard>

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
