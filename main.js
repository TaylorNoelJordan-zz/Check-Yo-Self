var searchInput = document.querySelector('#search-input');
var searchBtn = document.querySelector('#search-btn');
var taskTitleInput = document.querySelector('#sidebar__task-title-input');
var taskItemInput = document.querySelector('#sidebar__task-item-input');
var makeTaskListBtn = document.querySelector('#make-task-list-btn');
var clearBtn = document.querySelector('#clear-btn');
var filterBtn = document.querySelector('#filter-btn');
var toDoListContainer = document.querySelector('.task-list__container');
var sideBar = document.querySelector('.sidebar__container')
var sideBarTaskList = document.querySelector('.sidebar__task-display');
var addTaskBtn = document.querySelector('#add-btn');

var toDoListArray = JSON.parse(localStorage.getItem('tasksSaved')) || [];


/* ------ Event Listeners ------ */

// toDoListContainer.addEventListener('click');

// searchInput.addEventListener('keyup', );
// searchBtn.addEventListener('click');
// clearBtn.addEventListener('click')
addTaskBtn.addEventListener('click', addToTaskList);




/* ------ Functions ------ */

function saveInput() {

}

function addToTaskList() {
	createNewTask();
	clearInputs();
	enableBtns();

}

function storeToDoList(title, id, tasks, urgent) {
	var newToDo = new ToDo(title.input, Date.now())
		toDoListArray.push(newToDo)
		var stringified = JSON.stringify(newToDo);
		newToDo.saveToStorage(toDoListArray);
}

function createNewToDoList() {
	toDoListContainer.innerHTML += 
	`<div class="task-list">
			<div class="task-list__header">
				<p>${todo.title}</p>
			</div>
			<div class="task-list__item-list">
				<input type="checkbox" data-index=${i} id="item${i}" ${todo.tasks.done ? 'checked' : ''} 
			</div>
			<div class="task-list__footer">
				<div class="task-list__urgent">
					<img src="images/urgent.svg" id="urgent-task">
					<p>Urgent</p>
				</div>
				<div class="task-list__delete">
					<img src="images/delete.svg" id="delete-list-btn">
					<p>
			</div>
		</div>
		</div>`
}

function createNewTask() {
	sideBarTaskList.innerHTML += `<div class="sidebar__task-item">
						<img src="images/delete.svg" id="delete-btn"><p>${taskItemInput.value}</p>
					</div>`
}

function clearInputs() {
	taskTitleInput.value = '';
	taskItemInput.value = '';
}

function enableBtns() {
	makeTaskListBtn.classList.remove('disabled');
	clearBtn.classList.remove('disabled');
}
