let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let tasklist = document.querySelector('ul');
let filter = document.querySelector('#task_filter');
let clearBtn = document.querySelector('#clear_task_btn');

// Add event listeners
form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask); // Corrected event name

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === '') {
        alert('Add a Task and Submit');
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        tasklist.appendChild(li);
        store(taskInput.value);
        taskInput.value = '';
    }
}

function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you Sure')) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele)
        }
    }
}

function clearTask() {
    tasklist.innerHTML = "";
    localStorage.clear();
}

function filterTask(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function store(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        tasklist.appendChild(li);
    });
}
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild)
    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
 
}