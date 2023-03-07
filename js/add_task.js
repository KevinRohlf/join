let prio;
let subtasks = [];




function readForm() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let contact_selection = document.getElementById('contact_selection');
    let date = document.getElementById('date');
    addTask(title, description, category, contact_selection, date);

}

function addTask(title, description, category, contact_selection, date) {
    let newTask = {
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'contactSelection': contact_selection.value,
        'date': date.value,
        'prio': prio,
        'subtasks': subtasks
    }
    tasks.push(newTask);
    console.log(newTask);
    clearForm();
}

function setprio(i) {
    prio = '';
    prio = i;
}

function clearForm() {
    title.value = '';
    description.value = '';
    category.value = '';
    contact_selection.value = '';
    date.value = '';
    prio = '';
    subtasks = [];
}

function addSubtask() {
    let subTask = document.getElementById('subtask');
    let content = document.getElementById('subtasks');
    subtasks.push(subTask.value);
    content.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += `<div>${subtask}</div>`;
    }

    subTask.value = '';

}