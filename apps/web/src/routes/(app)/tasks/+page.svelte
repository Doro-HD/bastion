<script lang="ts">
	import { taskService } from '$lib/service/taskService';
	import { taskStore } from '$lib/stores/taskStore.svelte';
	import Card from '$lib/components/card';
	import Button from '$lib/components/button';
	import Modal from '$lib/components/modal';
	import { getModalContext, type TModalContext } from '$lib/components/modal/modalContext';

	let taskName = $state('');
	let taskDescription = $state('');

	function createNewTask(modalCtx: TModalContext) {
		taskService.createTask(taskName, taskDescription);

		modalCtx.close();

		taskName = '';
		taskDescription = '';
	}

	function deleteTask(taskID: string) {
		taskService.deleteTask(taskID);
	}
</script>

<div class="relative flex flex-col items-center gap-y-2 pt-2 text-center">
	<h1 class="text-4xl font-bold">Your tasks</h1>

	<div class="grid grid-cols-3 gap-2 text-left">
		{#each taskStore.tasks as task (task.id)}
			<Card.Root class="group">
				<div class="absolute top-0 right-0 hidden p-2 group-hover:block">
					<Button
						variant={{ color: 'error', size: 'sm', modifier: 'circle' }}
						title="Delete task {task.name}"
						onclick={() => deleteTask(task.id)}
					>
						<span class="icon-[lucide--x]"></span>
					</Button>
				</div>

				<Card.Body>
					<Card.Title>{task.name}</Card.Title>

					<p>{task.description}</p>
				</Card.Body>
			</Card.Root>
		{/each}
	</div>

	<div class="absolute top-0 right-0 p-2">
		<Modal.Root>
			<Modal.Trigger title="Create new task" variant={{ color: 'secondary', modifier: 'circle' }}>
				<span class="icon-[lucide--plus]"></span>
			</Modal.Trigger>

			<Modal.Box>
				<h3 class="text-lg font-bold">Create new task</h3>

				<form id="create-task-form" class="flex flex-col items-center gap-y-2">
					<label class="input">
						<span class="label">Task name</span>
						<input type="text" bind:value={taskName} />
					</label>

					<textarea class="textarea" placeholder="Task description" bind:value={taskDescription}
					></textarea>
				</form>
			</Modal.Box>

			<Modal.Actions>
				<Modal.Close>Close</Modal.Close>

				<Button
					variant={{ color: 'primary' }}
					onclick={() => {
						const modalCtx = getModalContext();
						createNewTask(modalCtx);
					}}>Save</Button
				>
			</Modal.Actions>
		</Modal.Root>
	</div>
</div>
