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

toDoListContainer.addEventListener('click', toggleUrgent);
// toDoListContainer.addEventListener('click', toggleDone)

sideBarTaskList.addEventListener('click', removeTask);

sideBarForm.addEventListener('click', approveTasks);

taskItemInput.addEventListener('keyup', enableBtns);

taskTitleInput.addEventListener('keyup', enableBtns);

makeTaskListBtn.addEventListener('click', saveInput);

// searchInput.addEventListener('keyup', );
// searchBtn.addEventListener('click');
clearBtn.addEventListener('click', clearInputs);

addTaskBtn.addEventListener('click', createNewTask);


if(toDoListArray != []) {
	pageRefresh(toDoListArray)
}


/* ------ Functions ------ */

function pageRefresh(toDoListArray) {
	toDoListArray.forEach((item) => {
		createNewToDoList(item);
	})
}

function createNewTask(e) {
	sideBarTaskList.innerHTML += 
		`<div class="sidebar-item">
			<img src="images/delete.svg" class="delete-btn">
			<li class="new-task" data-id="${Date.now()}">${taskItemInput.value}</li>
		</div>`
		localStorage.setItem('tasks', JSON.stringify(tasks))
		clearTaskInput();
}

// function toggleDone(e) {
// 	if(e.target.className.includes('checked-item')) return;
// 	var el = e.target;
// 	var index = el.dataset.index;
// 	//tasksArray[index].done = !tasksArray[index].done;
// 	localStorage.setItem('tasks', JSON.stringify(tasksArray))
// }


function removeTask(e) {
e.target.closest('div').remove();

}

function saveInput() {
	storeToDoList();
	clearInputs();
	disableBtns();

}

// function addToTaskList() {
// 	createNewTask();
// 	clearTaskInput();
// 	enableBtns();

// }

function storeToDoList(e) {
	var tasksArray = Array.prototype.slice.call(document.querySelectorAll(".new-task"))
	var findTasks = tasksArray.map(function(item) {
		return item = {id: item.dataset.id, content: item.innerText, done: false}
	});
	var newToDo = new ToDo(taskTitleInput.value, Date.now(), findTasks);
		createNewToDoList(newToDo);
		toDoListArray.push(newToDo);
		newToDo.saveToStorage(toDoListArray);
}

function createNewToDoList(todo) {
	fillerText.classList.add('hidden')
	var newList = 
	`<div class="task-list__card" data-id="${todo.id}">
		<div class="task-list__header">
				<p>${todo.title}</p>
		</div>
		<div class="task-list__container">
			<div class="task-list__item-list">
			</div>
		</div>
		<div class="task-list__footer">
			<div class="task-list__urgent">
				<img src="images/urgent.svg" class="urgent" id="urgent-task">
				<p>URGENT</p>
			</div>
			<div class="task-list__delete">
				<img src="images/delete.svg" class="delete" id="delete-list-btn">
				<p>DELETE</p>
			</div>
		</div>
	</div>`;
	toDoListContainer.insertAdjacentHTML('afterbegin', newList);
	todo.tasks.forEach(function(task) {
		document.querySelector('.task-list__item-list').insertAdjacentHTML('beforeend',
			`<div class="task-list__item-list" data-id="${task.id}">
				<div class-"task-list__img">
					<img src="images/checkbox.svg" class="checked-item">
					<p class="task-list__item">${task.content}</p>
				</div>
			</div`);
	});
	clearInputs();
}

function approveTasks(e) {
	if(taskItemInput.value === '' || taskTitleInput.value === '') {
		disableBtns();
	} else {
		enableBtns();
	}
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
	clearBtn.remove('disabled')''
	filterBtn.classList.remove('disabled');
	filterBtn.removeAttribute('disabled');
	addTaskBtn.classList.remove('disabled');
	addTaskBtn.removeAttribute('disabled');
}

function findIndex(card) {
	var cardId = card.dataset.id;
	return toDoListArray.findIndex(function(item) {
		return item.id == cardId
	});
}

function activateUrgentAndDeleteBtn(e) {
	if(e.target.className === 'urgent') {
		targetUrgentCard(e);
	}
	if(e.target.className === 'delete') {
		targetDeleteCard(e);
	}
}


function targetUrgentCard(e) {
	var card = e.target.closest('.task-list__card');
	var index = findIndex(card);
	toggleUrgent(index)
}

function targetDeleteCard(e) {
	var card = e.target.closest('.task-list__card');
	var index = findIndex(card);
	toDoListArray[index].deleteFromStorage(index);
	toDoListContainer.innerHTML = '';
	pageRefresh();
}


function toggleUrgent(e) {
	var cardUrgent = toDoListArray[index];
	cardUrgent.updateToDo();
	cardUrgent.saveToStorage();
	toDoListContainer.innerHTML = '';
	pageLoadInstances();
}

function pageLoadInstances() {
	var oldArray = toDoListArray;
	var newArray = oldArray.map(function(data) {
		data = new ToDo(data.title, data.id, data.tasks, data.urgent);
		return data;
	});
	toDoListArray = newArray;
	pageRefresh(toDoListArray);
}
