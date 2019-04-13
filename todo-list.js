class ToDo {
	constructor(title, id, tasks, urgent) {
		this.title = title;
		this.id = id;
		this.tasks = [];
		this.urgent = false;
		this.completed = false;
	}

	saveToStorage() {
		var stringified = JSON.stringify(taskArray);
		localStorage.setItem("tasksSaved", stringified);
	}

	deleteFromStorage() {

	}

	updateToDo() {

	}

	updateTask() {

	}
}