class ToDo {
	constructor(title, id, tasks, urgent, urgentImg = 'images/urgent.svg') {
		this.title = title;
		this.id = id;
		this.tasks = tasks || [];
		this.urgentImg = urgentImg;
		this.urgent = false;
	}

	saveToStorage() {
		var stringified = JSON.stringify(toDoListArray);
		localStorage.setItem("tasksSaved", stringified);
	}

	deleteFromStorage() {
		 todoListArray.splice(index, 1);
    this.saveToStorage(); 
	}

	updateToDo() {
		this.urgent = !this.urgent;
		this.urgent ? this.urgentImg = 'images/urgent-active.svg' : this.urgentImg = 'images/urgent.svg'

	}

	updateTask() {

	}
}
