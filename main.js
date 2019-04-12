/* ------ Query Selectors ------ */
var searchInput = document.querySelector('#search-input');
var searchBtn = document.querySelector('#search-btn');
var taskTitleInput = document.querySelector('#task-title-input');
var taskItemInput = document.querySelector('#task-item-input');
var makeTaskListBtn = document.querySelector('#make-task-list-btn');
var clearBtn = document.querySelector('#clear-btn');
var filterBtn = document.querySelector('#filter-btn');
var toDoListContainer = document.querySelector('.task-list__container');
var sideBar = document.querySelector('.sidebar__container')
var sideBaeTaskList = document.querySelector('.sidebar__task-display');
var addTaskBtn = document.querySelector('#add-btn');

var toDoListArray = JSON.parse(localStorage.getItem('tasksSaved')) || [];


/* ------ Event Listeners ------ */

toDoListContainer.addEventListener('click');

searchInput.addEventListener('keyup', );
searchBtn.addEventListener('click');
clearBtn.addEventListener('click')
addTaskBtn.addEventListener('click', createNewTask)




/* ------ Functions ------ */

function saveInput() {

}

function storeInput(title, id, tasks, urgent) {
	var newToDo = new ToDo(title.input, Date.now(), //tasks.innerText?);
		toDoListArray.push(newToDo);
		var stringified = JSON.stringify(newToDo);
		newToDo.saveToStorage(toDoListArray);
}

function createNewToDoList() {
	toDoListContainer.innerHTML = 
	`<div class="task-list">
			<div class="task-list__header">
				<p>Task Title</p>
			</div>
			<div class="task-list__item-list">
				<input type="radio"/><p>Don't ever play yourself.</p>
			</div>
			<div class="task-list__footer">
			</div>
		</div>
		</div>`
		+ toDoListContainer.innerHTML;

}

function createNewTask() {

}
