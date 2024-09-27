const elementContainer = document.getElementById("container-elements");

const btnAddTask = document.getElementById("btn-addTask");

btnAddTask.addEventListener("click", addTask);

showTasks();

function showTasks(){
    elementContainer.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
        taskCardStructure = createTaskCardStructure(task);
        elementContainer.innerHTML += taskCardStructure;
    });
    tasks.forEach(task => checkboxTask(task));
};

function addTask(){
    const inputText = document.getElementById('input-task');
    const containerInput = document.getElementById("container-input");
    if(!verifyInputText(inputText, containerInput)){
        return;
    }    
    const taskData = {"id": generationID(), "name": inputText.value, "checked": false};
    saveTask(taskData);
    inputText.value = "";
    showTasks();
}

function verifyInputText(inputText, containerToAppend, id = ''){
    existingError = document.getElementById(`container-card-input-error-${id}`);
    if (existingError) {
        existingError.remove();
    }
    if (inputText.value === "") {
        let containerError = document.createElement('div');
        containerError.id = `container-card-input-error-${id}`;
        containerToAppend.appendChild(containerError);
        showErrorMessageInInputText(containerError);
        return false;
    }
    return true;
}

function showErrorMessageInInputText(containerError){
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

function replaceLabelToInput(id){
    let taskEditInput = document.createElement('input');
    taskEditInput.className = 'task-edit-input';
    taskEditInput.placeholder = 'Novo Nome para a Tarefa';
    taskEditInput.id = `task-input-${id}`;
    let taskEditLabel = document.getElementById(`task-${id}`);
    taskEditInput.value = taskEditLabel.textContent;
    taskEditLabel.parentNode.replaceChild(taskEditInput, taskEditLabel);
    taskEditInput.focus();
    taskEditInput.select();
}

function replaceButton({id, msgHtml, button,nameClass, signal}){
    let taskModifiedBtn = document.createElement('button');
    taskModifiedBtn.onclick = () => signal(id);
    taskModifiedBtn.innerHTML = msgHtml;
    taskModifiedBtn.className = nameClass;
    let taskReplaceBtn = document.getElementById(`task-${button}-btn-${id}`)
    taskReplaceBtn.parentNode.replaceChild(taskModifiedBtn,taskReplaceBtn);
}

function saveModifiedTask(id){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskIndex = tasks.findIndex((task) =>{
        return task.id === id;
    });
    let newTaskName = document.getElementById(`task-input-${id}`);
    let containerErrorToAppend = document.getElementById(`container-card-input-${id}`);
    if (!verifyInputText(newTaskName,containerErrorToAppend,id)) {
        return;
    }
    tasks[taskIndex].name = newTaskName.value;
    localStorage.setItem("tasks",JSON.stringify(tasks));
    showTasks();
}

function cancelModifiedTask(id){
    showTasks();
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
                <div class="container-card-input" id="container-card-input-${task.id}">
                    <input class="input-checkbox" type="checkbox"  id="input-checkbox-${task.id}" onchange="dashCheckbox(${task.id})"/>
                    <label id="task-${task.id}" for="input-checkbox-${task.id}">${task.name}</label>
                </div>
                <div class="container-card-btn">
                    <button id="task-delete-btn-${task.id}" onclick="deleteButton(${task.id})" class="delete-btn">Apagar</button>
                    <button id="task-edit-btn-${task.id}" onclick="editButton(${task.id})" class="edit-btn">Editar</button>
                 </div>
            </div>
        `;
}

function dashCheckbox(taskID){
    let checkbox = document.getElementById(`input-checkbox-${taskID}`);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let taskIndex = tasks.findIndex((task) => task.id === taskID);
    tasks[taskIndex].checked = checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

function checkboxTask(task){
    let taskLabel = document.getElementById(`task-${task.id}`);
    let checkbox = document.getElementById(`input-checkbox-${task.id}`);
    checkbox.checked = task.checked;
    taskLabel.innerHTML = task.checked ? `<del>${task.name}</del>` : task.name;
}


function deleteButton(taskID){
    deleteTask(taskID);
    showTasks();
}

function editButton(taskID){
    replaceLabelToInput(taskID);
    replaceButton({"id":taskID,"msgHtml":"Salvar","button":"edit","nameClass":"edit-btn","signal":saveModifiedTask});
    replaceButton({"id":taskID,"msgHtml":"Cancelar","button":"delete","nameClass":"delete-btn","signal":cancelModifiedTask});
}



