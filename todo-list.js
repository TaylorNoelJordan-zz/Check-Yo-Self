class ToDo {
	constructor(title, id, tasks, urgent) {
		this.title = title;
		this.id = id;
		this.tasks = tasks || [];
		this.urgent = urgent || false;
		this.urgentImg;
		this.urgent ? this.urgentImg = 'images/urgent-active.svg' : this.urgentImg = 'images/urgent.svg'
	}

	saveToStorage() {
		var stringified = JSON.stringify(toDoListArray);
		localStorage.setItem("tasksSaved", stringified);
	}

	deleteFromStorage(index) {
		toDoListArray.splice(index, 1);
    this.saveToStorage(); 
	}

	updateToDo() {
		this.urgent = !this.urgent;
	
	}

	updateTask(index) {
		this.tasks[index].done = !this.tasks[index].done;
		this.tasks[index].done ? this.tasks[index].img = 'images/checkbox-active.svg' : this.tasks[index].img = 'images/checkbox.svg';
		// this.tasks.content = index.innerText ? 
	}

}
