const addBtn = document.getElementById('add-task-btn');
const deskInput = document.getElementById('description-task');
const toDosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItem  = [];


function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}"> 
        <div class="description">${task.description}</div>
        <div class="buttons">
            <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
            <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
    `
}

const FillhtmlList = () => {
    toDosWrapper.innerHTML = "";
    if(tasks.length > 0){
        tasks.forEach((item, index) => {
            toDosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItem = document.querySelectorAll('.todo-item')
    }
}

FillhtmlList();
const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    console.log(index);
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItem[index].classList.add('checked');
    } else {
        todoItem[index].classList.remove('checked');
    }
    updateLocal();
    FillhtmlList();
}
addBtn.addEventListener('click', () =>  {
    tasks.push(new Task(deskInput.value));
    updateLocal();
    FillhtmlList();
    deskInput.value = '';
})


const deleteTask = index => {
    todoItem[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        FillhtmlList();
    },500)
        
    
}