/* ------ Query Selectors ------ */
var searchInput = document.querySelector('#search-input');
var searchBtn = document.querySelector('#search-btn');
var taskTitleInput = document.querySelector('#task-title-input');
var taskItemInput = document.querySelector('#task-item-input');
var makeTaskBtn = document.querySelector('#make-task-list-btn');
var clearBtn = document.querySelector('#clear-btn');
var filterBtn = document.querySelector('#filter-btn');

var toDoListArray = JSON.parse(localStorage.getItem('tasksSaved')) || [];


/* ------ Event Listeners ------ */

searchInput.addEventListener('keyup', );
searchBtn.addEventListener('click');


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

}

function createNewTask() {

}