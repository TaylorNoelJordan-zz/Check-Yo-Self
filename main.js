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
var tasks = document.querySelector('.new-task');
var toDoListContainer = document.querySelector('.task-list__container');
var taskItemList = document.querySelector('.task-list__item-list');
var toDoListArray = JSON.parse(localStorage.getItem('tasksSaved')) || [];




/* ------ Event Listeners ------ */
window.addEventListener('load', onLoad)
toDoListContainer.addEventListener('click', activateCardBtns);
sideBarTaskList.addEventListener('click', removeTask);
sideBarForm.addEventListener('click', approveTasks);
taskItemInput.addEventListener('keyup', enableBtns);
taskTitleInput.addEventListener('keyup', enableBtns);
makeTaskListBtn.addEventListener('click', saveInput);
// searchInput.addEventListener('keyup', );
// searchBtn.addEventListener('click');
clearBtn.addEventListener('click', clearInputs);
addTaskBtn.addEventListener('click', createNewTask);


/* ------ Functions ------ */

/* ------ Sidebar Task Functions ------ */
function createNewTask(e) {
	sideBarTaskList.innerHTML += 
	`<div class="sidebar-item">
		<img src="images/delete.svg" class="delete-btn">
		<li class="new-task" data-id="${Date.now()}">${taskItemInput.value}</li>
	</div>`
	localStorage.setItem('tasks', JSON.stringify(tasks))
	clearTaskInput();
}

function removeTask(e) {
	e.target.closest('div').remove();
}

function approveTasks(e) {
	if(taskItemInput.value === '' || taskTitleInput.value === '') {
		disableBtns();
		alert ('Check yo\'self! Add some tasks to get started!')
	} else {
		enableBtns();
	}
}

function clearInputs() {
	clearTaskInput();
	clearTitleInput();
	clearSideBar();
}


/* ------ Populate Main Section ------ */
function onLoad() {
	pageLoadInstances();
	disableBtns();
}

function createNewToDoList(todo) {
	fillerText.classList.add('hidden')
	var newList = 
	`<div class="task-list__card ${todo.urgent}" data-id="${todo.id}">
		<div class="task-list__header">
				<p>${todo.title}</p>
		</div>
		<div class="task-list__item-container ${todo.urgent}">
		</div>
		<div class="task-list__footer">
			<div class="task-list__urgent">
				<img src=${todo.urgentImg} class="urgent" id="urgent-task">
				<p class="active-urgent ${todo.urgent}">URGENT</p>
			</div>
			<div class="task-list__delete">
				<img src="images/delete.svg" class="delete" id="delete-list-btn">
				<p>DELETE</p>
			</div>
		</div>
	</div>`;
	toDoListContainer.insertAdjacentHTML('afterbegin', newList);
	todo.tasks.forEach(function(task) {
		document.querySelector('.task-list__item-container').insertAdjacentHTML('beforeend',
			`<div class="task-list__item-list" data-id="${task.id}">
					<img src=${task.img} class="checked-item">
					<p class="task-list__item ${task.done}">${task.content}</p>
			</div`);
	});
	clearInputs();
}

/* ------ localStorage ------ */

function saveInput() {
	storeToDoList();
	clearInputs();
	disableBtns();
}

function storeToDoList(e) {
	var tasksArray = Array.prototype.slice.call(document.querySelectorAll(".new-task"))
	var findTasks = tasksArray.map(item => {
		return item = {id: item.dataset.id, img: 'images/checkbox.svg', content: item.innerText, done: false}
	});
	var newToDo = new ToDo(taskTitleInput.value, Date.now(), findTasks);
		createNewToDoList(newToDo);
		toDoListArray.push(newToDo);
		newToDo.saveToStorage(toDoListArray);
}

function removeCard(index) {
	toDoListArray[index].deleteFromStorage(index);
	toDoListContainer.innerHTML = '';
	pageLoadInstances();
}


/* ------ Functions ------ */


function activateCardBtns(e) {
	if(e.target.className === 'urgent') {
		toggleUrgent(e);
	}
	if(e.target.className === 'delete') {
		targetDeleteCard(e);
	}
	if(e.target.className === 'checked-item') {
		findTask(e);
	}
}

function toggleUrgent(e) {
	var card = e.target.closest('.task-list__card');
	var index = findIndex(card);
	var cardUrgent = toDoListArray[index];
	cardUrgent.updateToDo();
	cardUrgent.saveToStorage();
	toDoListContainer.innerHTML = '';
	pageLoadInstances();
}

function targetDeleteCard(e) {
	debugger;
	var card = e.target.closest('.task-list__card');
	var index = findIndex(card);
	var cardToDelete = toDoListArray[index].tasks;
	var newArray = cardToDelete.filter(function(item) {
		return item.done === true;
	});
	if(newArray.length === cardToDelete.length) {
		removeCard(index)
	} else {
		alert('Check yo\'self before you wreck yo\'self!')
	}
}

function findTask(e) {
	var card = e.target.closest('.task-list__card');
	var cardIndex = findIndex(card);
	var task = e.target.closest('.task-list__item-list');
	var taskIndex = findTaskIndex(task);
	var currentCard = toDoListArray[cardIndex];
	var currentTask = currentCard.tasks.findIndex(item =>  item.id == taskIndex);
	currentCard.updateTask(currentTask);
	currentCard.saveToStorage();
	toDoListContainer.innerHTML = '';
	pageLoadInstances();
}

function findIndex(card) {
	var cardId = parseInt(card.dataset.id);
	return toDoListArray.findIndex(item => item.id === cardId);
}

function findTaskIndex(card) {
	var taskId = parseInt(card.dataset.id);
	return taskId;
}

function pageRefresh(toDoListArray) {
	toDoListArray.forEach(item => 
		createNewToDoList(item)
	)
}

function pageLoadInstances() {
	var oldArray = toDoListArray;
	var newArray = oldArray.map(data => {
		data = new ToDo(data.title, data.id, data.tasks, data.urgent);
		return data;
	});
	toDoListArray = newArray;
	pageRefresh(toDoListArray);
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

function disableBtns() {
	addTaskBtn.classList.add('disabled');
	addTaskBtn.setAttribute('disabled', 'disabled');
	makeTaskListBtn.classList.add('disabled');
	makeTaskListBtn.setAttribute('disabled', 'disabled');
	clearBtn.classList.add('disabled');
	clearBtn.setAttribute('disabled', 'disabled');
}

function enableBtns() {
	makeTaskListBtn.classList.remove('disabled');
	makeTaskListBtn.removeAttribute('disabled');
	clearBtn.classList.remove('disabled');
	clearBtn.removeAttribute('disabled');
	filterBtn.classList.remove('disabled');
	filterBtn.removeAttribute('disabled');
	addTaskBtn.classList.remove('disabled');
	addTaskBtn.removeAttribute('disabled');
}
