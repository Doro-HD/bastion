<script lang="ts">
	import { authStore } from '$lib/stores/authStore.svelte';
	import { taskStore, type ITask } from '$lib/stores/taskStore.svelte';

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

	function setModal(element: HTMLDialogElement) {
		modal = element;
	}
</script>

<div class="flex flex-col items-center gap-y-2 pt-2 text-center">
	<h1 class="text-4xl font-bold">Welcome {authStore.username}</h1>

	<div class="w-lg">
		<button class="btn btn-primary" onclick={drawTask}>Draw task</button>
	</div>
</div>

<dialog {@attach (element) => setModal(element)} id="drawn-task" class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">{activeTask?.name}</h3>

		<p>{activeTask?.description}</p>

		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
