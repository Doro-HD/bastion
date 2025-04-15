<script lang="ts">
	import { Button, Card } from '$lib/components';

	let decks: string[] = $state(['Daily quest', 'Questions', 'Foo', 'Foo', 'Foo', 'Foo']);
</script>

<div class="px-2">
	<section class="space-y-2">
		<div class="flex gap-x-2 items-center">
			<h1 class="text-2xl font-bold">Decks</h1>

			<Button>
				<div class="i-lucide:plus"></div>
			</Button>
		</div>

		<div class="grid grid-cols-5 gap-2">
			{#each decks as deck}
				<Card.Root>
					<Card.Header>
						<Card.Title>{deck}</Card.Title>
					</Card.Header>

					description
				</Card.Root>
			{/each}
		</div>
	</section>
</div>
