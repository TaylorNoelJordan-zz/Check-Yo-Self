class ToDo {
	constructor(title, id, tasks, urgent) {
		this.title = title;
		this.id = id;
		this.tasks = tasks || [];
		this.urgent = false;
	}

	saveToStorage() {
		var stringified = JSON.stringify(toDoListArray);
		localStorage.setItem("tasksSaved", stringified);
	}

	deleteFromStorage() {

	}

	updateToDo() {
		this.urgent != this.urgent;
	}

	updateTask() {

	}
}

// class Tasks {
// 	constructor(text, id, completed) {
// 		this.text = text;
// 		this.id = id;
// 		this.completed = false;
// 	}
// }