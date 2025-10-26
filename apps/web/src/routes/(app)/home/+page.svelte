<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { taskStore, type ITask } from '$lib/stores/taskStore.svelte';
	import { Button } from '$lib/components/button';

	let modal: HTMLDialogElement;
	let activeTask: ITask | null = null;

	function drawTask() {
		const drawnTask = taskStore.getRandomTask();
		if (!drawnTask) {
			return;
		}

		activeTask = drawnTask;
		modal.showModal();
	}
</script>

<div class="flex flex-col items-center gap-y-2 pt-2 text-center">
	<h1 class="text-4xl font-bold">Welcome {authStore.username}</h1>

	<div class="w-lg">
		<Button variant={{ color: 'primary' }} onclick={drawTask}>Draw task</Button>
	</div>
</div>

<dialog
	{@attach (element) => {
		modal = element;
	}}
	id="drawn-task"
	class="modal"
>
	<div class="modal-box">
		<h3 class="text-lg font-bold">{activeTask?.name}</h3>

		<p>{activeTask?.description}</p>

		<div class="modal-action">
			<form method="dialog">
				<Button>Close</Button>
			</form>
		</div>
	</div>
</dialog>
