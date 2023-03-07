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
    console.log(tasks);
    clearForm();
}

function setprio(i) {
    let btns = ['urgent', 'medium', 'low']
    let selectedBtn = btns.indexOf(i)
    btns.splice(selectedBtn, 1)
    document.getElementById(i).classList.add('btn-on-focus');
    btns.forEach(e => {
        document.getElementById(e).classList.remove('btn-on-focus');
    });
    prio = '';
    prio = i;
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('contact_selection').value = '';
    document.getElementById('date').value = '';
    document.getElementById('subtasks').innerHTML = '';
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
