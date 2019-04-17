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

	deleteFromStorage() {
		 todoListArray.splice(index, 1);
    this.saveToStorage(); 
	}

	updateToDo() {
		this.urgent = !this.urgent;
	
	}

	updateTask(index) {
		console.log(this.tasks[index].done);
		// if (this.tasks[index].done = false) {
		// 	this.tasks[index].done = true;
		// }
		this.tasks[index].done = !this.tasks[index].done;
		this.tasks[index].done ? this.tasks[index].img = 'images/checkbox-active.svg' : this.tasks[index].img = 'images/checkbox.svg';
		// this.tasks.content = index.innerText ? 
	}

}
