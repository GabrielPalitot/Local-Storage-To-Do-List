const elementContainer = document.getElementById("container-elements");

const inputText = document.getElementById("input-task");

const btnAddTask = document.getElementById("btn-addTask");

const containerError = document.getElementById("container-error");

btnAddTask.addEventListener("click", addTask);

let tasks = [];

function showTasks(){
    let taskCardStructure = `
            <div class="task-card-container">
                <div class="container-card-input">
                    <input type="checkbox" />
                    <span>Nome da Tarefa</span>
                </div>
                <div>
                    <button>Deletar</button>
                    <button>Editar</button>
                 </div>
            </div>
        `
        elementContainer.innerHTML += taskCardStructure;
}

showTasks();

function addTask(){
    if(!verifyInputText()){
        return;
    }
    const taskData = {"id": generationID(), "name": inputText.value};
    tasks.push(JSON.stringify(taskData));
    localStorage.setItem("tasks",tasks);
    inputText.value = "";
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

function saveInLocalStorage(taskData){

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


