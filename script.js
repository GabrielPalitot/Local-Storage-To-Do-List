const elementContainer = document.getElementById("container-elements");

const inputText = document.getElementById("input-task");

const btnAddTask = document.getElementById("btn-addTask");

const containerError = document.getElementById("container-error");

btnAddTask.addEventListener("click", addTask);


function showTasks(){
    elementContainer.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
        taskCardStructure = createTaskCardStructure(task);
        elementContainer.innerHTML += taskCardStructure;
    });
};
showTasks();

function addTask(){
    if(!verifyInputText()){
        return;
    }    
    const taskData = {"id": generationID(), "name": inputText.value};
    saveTask(taskData);
    inputText.value = "";
    showTasks();
}

function verifyInputText(){
    if (inputText.value === "") {
        showErrorMessageInInputText();
        return false;
    }
    containerError.innerHTML = "";
    return true;
}

function showErrorMessageInInputText(){
    containerError.innerHTML = "";
    let emptyTaskError = document.createElement('span');
    emptyTaskError.textContent = "*O nome da Tarefa não foi Preenchido.";
    emptyTaskError.className = 'empty-task-error';
    containerError.appendChild(emptyTaskError);
}

function saveTask(taskData){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function deleteTask(id){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter((task) => {
        return task.id !== id;
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function editTask(id){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let editTask = tasks.filter((task) => {
        return task.id === id;
    });
    console.log(editTask);
}

function generationID(){
    let id;
    if (localStorage.getItem("id") === null) {
        id = 0
        localStorage.setItem("id", id);
        return id
    }
    id = +localStorage.getItem("id") + 1
    localStorage.setItem("id", id);
    return id;
}



function createTaskCardStructure(task){
    return `
            <div class="container-task-card">
                <div class="container-card-input">
                    <input type="checkbox"  id="input-checkbox"/>
                    <label id="task-name" for="input-checkbox">${task.name}</label>
                </div>
                <div class="container-card-btn">
                    <button onclick="deleteButton(${task.id})" class="delete-btn">Apagar</button>
                    <button onclick="editButton(${task.id})" class="edit-btn">Editar</button>
                 </div>
            </div>
        `;
}

function deleteButton(taskID){
    deleteTask(taskID);
    showTasks();
}

function editButton(taskID){
    editTask(taskID);
}


