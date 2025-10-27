<script lang="ts">
	import { taskService } from '$lib/service/taskService';
	import { taskStore } from '$lib/stores/taskStore.svelte';

	const modalID = crypto.randomUUID();
	let modal: HTMLDialogElement;

	let taskName = $state('');
	let taskDescription = $state('');

	function createNewTask(e: SubmitEvent) {
		e.preventDefault();

		taskService.createTask(taskName, taskDescription);

		modal.close();

		taskName = '';
		taskDescription = '';
	}

	function deleteTask(taskID: string) {
		taskService.deleteTask(taskID);
	}

	function setModal(element: HTMLDialogElement) {
		modal = element;
	}
</script>

<div class="relative flex flex-col items-center gap-y-2 pt-2 text-center">
	<h1 class="text-4xl font-bold">Your tasks</h1>

	<div class="grid grid-cols-3 gap-2 text-left">
		{#each taskStore.tasks as task (task.id)}
			<div class="group card h-30 w-sm bg-base-100 shadow-sm">
				<div class="absolute top-0 right-0 hidden p-2 group-hover:block">
					<button
						class="btn btn-circle btn-sm btn-error"
						title="Delete task {task.name}"
						onclick={() => deleteTask(task.id)}
					>
						<span class="icon-[lucide--x]"></span>
					</button>
				</div>

				<div class="card-body">
					<h2 class="card-title">{task.name}</h2>

					<p>{task.description}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="absolute top-0 right-0 p-2">
		<button
			class="btn btn-circle btn-secondary"
			title="Create new task"
			onclick={() => modal.showModal()}
		>
			<span class="icon-[lucide--plus]"></span>
		</button>
	</div>
</div>

<dialog {@attach (element) => setModal(element)} id={modalID} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Create new task</h3>

		<form id="create-task-form" class="flex flex-col items-center gap-y-2" onsubmit={createNewTask}>
			<label class="input">
				<span class="label">Task name</span>
				<input type="text" bind:value={taskName} />
			</label>

			<textarea class="textarea" placeholder="Task description" bind:value={taskDescription}
			></textarea>
		</form>

		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>

			<button type="submit" form="create-task-form" class="btn btn-primary">Save</button>
		</div>
	</div>
</dialog>
