import { browser } from '$app/environment';

interface ITask {
	id: string;
	name: string;
	description: string;
	tags: string[];
}

class TaskStore {
	tasks: ITask[] = $state([]);

	constructor() {
		if (browser) {
			let storedTaskJson = localStorage.getItem('tasks');
			if (!storedTaskJson) {
				storedTaskJson = '[]';
			}

			const storedTasks = JSON.parse(storedTaskJson);
			this.tasks = storedTasks;
		}
	}

	getRandomTask() {
		const taskLength = this.tasks.length;
		if (taskLength === 0) {
			return;
		}

		const randomIndex = Math.floor(Math.random() * taskLength);

		return this.tasks[randomIndex];
	}

	addTask(task: ITask) {
		this.tasks = [...this.tasks, task];
	}

	removeTask(taskID: string) {
		this.tasks = this.tasks.filter((task) => task.id !== taskID);
	}
}

const taskStore = new TaskStore();

export { taskStore, type ITask };
