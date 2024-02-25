const addTaskFormElement = document.querySelector("#add-task-form");
const errorElement = document.querySelector("#error");

showTasks();

addTaskFormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const addTaskElement = document.querySelector("#add-task");

    let addTaskValue = addTaskElement.value;

    if (addTaskValue == "") {
        addTaskElement.classList.add('border-red');
        errorElement.innerText = 'Please enter the task!';
    } else {
        addTaskElement.classList.remove('border-red');
        errorElement.innerText = '';

        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        let tasks = [];

        if (localTasks) {
            tasks = localTasks;
        }

        tasks.push(addTaskValue);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        addTaskElement.value = '';

        showTasks();
    }
});

function showTasks() {
    const tasksSectionElement = document.querySelector("#tasks-section");
    let tasksContainerElement = '';

    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    if (localTasks) {
        localTasks.forEach((value, index) => {
            tasksContainerElement += `<div id="task-container">
            <input type="text" class="input-field" name="input" id="input-${index}" value="${value}" readonly>
            <button type="button" id="edit-${index}" onclick="editTask(${index})" class="btn btn-edit">Edit</button>
            <button type="button" id="delete-${index}" onclick="deleteTask(${index})" class="btn btn-delete">Delete</button>
        </div>`;
        });

        tasksSectionElement.innerHTML = tasksContainerElement;
    }
}

function editTask(id) {
    const inputElement = document.querySelector(`#input-${id}`);
    const btnEditElement = document.querySelector(`#edit-${id}`);

    if (btnEditElement.innerText == 'Edit') {
        inputElement.removeAttribute('readonly');
        btnEditElement.innerText = 'Save';
        const inputLength = inputElement.value.length;
        inputElement.setSelectionRange(inputLength, inputLength);
        inputElement.focus();
    } else {
        inputElement.setAttribute('readonly', true);
        btnEditElement.innerText = 'Edit';

        let inputValue = inputElement.value;
        let localTasks = JSON.parse(localStorage.getItem('tasks'));

        localTasks[id] = inputValue;
        localStorage.setItem('tasks', JSON.stringify(localTasks));
    }
}

if (inputElement.value == "") {

    inputElement.classList.add('border-red');
    inputElement.setAttribute('readonly', false);
    btnEditElement.innerText = 'Save';
} else {

    inputElement.classList.remove('border-red');
    btnEditElement.innerText = 'Edit';
    inputElement.setAttribute('readonly', true);
    inputElement.innerText = '';

}

// console.log(inputElement);
// console.log(btnEditElement);


function deleteTask(id) {
    localTasks = JSON.parse(localStorage.getItem('tasks'));
    localTasks.splice(id, 1);
    localStorage.setItem('tasks', JSON.stringify(localTasks));
    showTasks();
}