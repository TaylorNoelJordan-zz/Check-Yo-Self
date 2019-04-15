var searchInput = document.querySelector('#search-input');
var searchBtn = document.querySelector('#search-btn');
var sideBar = document.querySelector('.sidebar__container')
var sideBarForm = document.querySelector('.sidebar__form')
var sideBarTaskList = document.querySelector('.sidebar__task-display');
var addTaskBtn = document.querySelector('#add-btn');
var taskTitleInput = document.querySelector('#sidebar__task-title-input');
var taskItemInput = document.querySelector('#sidebar__task-item-input');
var makeTaskListBtn = document.querySelector('#make-task-list-btn');
var clearBtn = document.querySelector('#clear-btn');
var filterBtn = document.querySelector('#filter-btn');
var fillerText = document.querySelector('.task-list__placeholder')

var toDoListContainer = document.querySelector('.task-list__container');
var taskItemList = document.querySelector('.task-list__item-list');
var toDoListArray = JSON.parse(localStorage.getItem('tasksSaved')) || [];
var tasksArray = [];



/* ------ Event Listeners ------ */

toDoListContainer.addEventListener('click', toggleDone);
sideBarTaskList.addEventListener('click', toggleDone);
taskItemInput.addEventListener('keyup', enableBtns);
taskTitleInput.addEventListener('keyup', enableBtns)
makeTaskListBtn.addEventListener('click', saveInput);

// searchInput.addEventListener('keyup', );
// searchBtn.addEventListener('click');
// clearBtn.addEventListener('click')
addTaskBtn.addEventListener('click', addTask);

//createNewTask(tasksArray, sideBarTaskList);
// if(toDoListArray != []) {
// 	pageRefresh(toDoListArray)
// }


/* ------ Functions ------ */

function addTask(e) {
	e.preventDefault();
	var text = taskItemInput.value;
	var task = {
		text: text,
		done: false
	};
	console.log(task)

	tasksArray.push(task);
	createNewTask(tasksArray, sideBarTaskList);
	enableBtns();
	clearTaskInput();

}

function pageRefresh(toDoListArray) {
	toDoListArray.forEach((item) => {
		createNewToDoList(item);
	})
}

function createNewTask(tasks = [], taskDisplay) {
	sideBarTaskList.innerHTML = tasks.map((task, i) => {
		return `
		<li>
			<img src="images/delete.svg" class="delete-btn"><p>${task.text}</p> 
		</li>
		`;
	}).join('');
	if(taskTitleInput.value='') {
		return 'Please enter an item.'
	}
}

function toggleDone(e) {
	if(e.target.className.includes('checkbox')) return;
	var el = e.target;
	var index = el.dataset.index;
	//tasksArray[index].done = !tasksArray[index].done;
	localStorage.setItem('tasks', JSON.stringify(tasksArray))
	console.log(e.target)
}

function toggleUrgent(e) {

}

function removeTask(e) {
	if(e.target.className.includes('delete-btn')) {
		sideBarTaskList.innerHTML}
}

function saveInput() {
	storeToDoList();
	var list = toDoListArray[toDoListArray.length - 1];
	console.log(list)
	createNewToDoList(list);
	clearInputs();
	disableBtns();

}

function addToTaskList() {
	createNewTask();
	clearTaskInput();
	enableBtns();

}

function storeToDoList(title, id, tasks, urgent) {
	var toDoListId = Date.now();
	var newToDo = new ToDo(taskTitleInput.value, toDoListId, tasksArray);
		toDoListArray.push(newToDo)
		var stringified = JSON.stringify(newToDo);
		newToDo.saveToStorage(toDoListArray);
}

function createNewToDoList(todo) {
	fillerText.classList.add('hidden')
	var listItems = '';
	console.log(todo.title)
	console.log(todo.tasks)
	for(var i = 0; i < todo.tasks.length; i++) {
		listItems +=`
		<li>
	 <input type="checkbox" data-index="${i}" id="task${i}"  ${todo.tasks[i].done ? 'checked' : ''} /> 
	 <label for="">${todo.tasks[i].text}</label>
		</li>`
	};
	console.log(listItems);
	toDoListContainer.innerHTML += 
	`<div class="task-list__card">
		<div class="task-list__header">
				<p>${todo.title}</p>
		</div>
		<div class="task-list__item-list">
			${listItems}
		</div>
		<div class="task-list__footer">
			<div class="task-list__urgent">
				<img src="images/urgent.svg" id="urgent-task">
				<p>URGENT</p>
			</div>
			<div class="task-list__delete">
				<img src="images/delete.svg" id="delete-list-btn">
				<p>DELETE</p>
			</div>
		</div>
	</div>`
}

function clearInputs() {
	clearTaskInput();
	clearTitleInput();
	clearSideBar();
}

function clearTaskInput() {
	taskItemInput.value = '';
}

function clearTitleInput() {
	taskTitleInput.value = '';
}

function clearSideBar() {
	sideBarTaskList.innerHTML = '';
}

function enableBtns() {
	makeTaskListBtn.classList.remove('disabled');
	clearBtn.classList.remove('disabled');
	filterBtn.classList.remove('disabled');
}

function disableBtns() {
	makeTaskListBtn.classList.add('disabled');
	clearBtn.classList.remove('disabled');
}