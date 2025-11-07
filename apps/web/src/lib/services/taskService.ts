import { taskStore } from '$lib/stores/taskStore.svelte';

const taskService = {
	createTask: (taskName: string, taskDescription: string) => {
		let tasksJson = localStorage.getItem('tasks');
		if (!tasksJson) {
			tasksJson = '[]';
			localStorage.setItem('tasks', tasksJson);
		}
		const storedTasks = JSON.parse(tasksJson);

		const newTask = {
			id: crypto.randomUUID(),
			name: taskName,
			description: taskDescription,
			tags: []
		};
		const tasks = [...storedTasks, newTask];

		localStorage.setItem('tasks', JSON.stringify(tasks));
		taskStore.addTask(newTask);
	},
	deleteTask: (taskID: string) => {
		taskStore.removeTask(taskID);
		localStorage.setItem('tasks', JSON.stringify(taskStore.tasks));
	}
};

export { taskService };
