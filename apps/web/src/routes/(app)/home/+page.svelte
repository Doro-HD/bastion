<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { taskStore, type ITask } from '$lib/stores/taskStore.svelte';
	import Button from '$lib/components/button';
	import Modal from '$lib/components/modal';
	import { getModalContext, type TModalContext } from '$lib/components/modal/modalContext';

	let activeTask: ITask | null = null;

	function drawTask(modalCtx: TModalContext) {
		const drawnTask = taskStore.getRandomTask();
		if (!drawnTask) {
			return;
		}

		activeTask = drawnTask;

		modalCtx.open();
	}
</script>

<div class="flex flex-col items-center gap-y-2 pt-2 text-center">
	<h1 class="text-4xl font-bold">Welcome {authStore.username}</h1>

	<div class="w-lg">
		<Modal.Root>
			<Button
				variant={{ color: 'primary' }}
				onclick={() => {
					const modalCtx = getModalContext();
					drawTask(modalCtx);
				}}>Draw task</Button
			>

			<Modal.Box>
				<h3 class="text-lg font-bold">{activeTask?.name}</h3>

				<p>{activeTask?.description}</p>

				<Modal.Actions>
					<Modal.Close>Close</Modal.Close>
				</Modal.Actions>
			</Modal.Box>
		</Modal.Root>
	</div>
</div>
