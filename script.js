const elementContainer = document.getElementById("container-elements");

const inputText = document.getElementById("input-task");

const btnAddTask = document.getElementById("btn-addTask");

const containerError = document.getElementById("container-error");

btnAddTask.addEventListener("click", addTask);

let tasks = [];

function addTask(){
    verifyInputText();
    
}

function verifyInputText(){
    if (inputText.value === "") {
        containerError.innerHTML = "";
        let emptyTaskError = document.createElement('span');
        emptyTaskError.textContent = "*O nome da Tarefa não foi Preenchido";
        emptyTaskError.className = 'empty-task-error';
        containerError.appendChild(emptyTaskError);
        return;
    }
    containerError.innerHTML = "";
}



