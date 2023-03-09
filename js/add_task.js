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
    if (i) {
        let selectedBtn = btns.indexOf(i)
        btns.splice(selectedBtn, 1)
        document.getElementById(i).classList.add('btn-on-focus');
    }
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
    setprio();

}

function addSubtask() {
    let subTask = document.getElementById('subtask');
    let content = document.getElementById('subtasks');
    content.innerHTML = '';
    if (subTask.value.length < 2) {
        content.innerHTML += `<div style="color: red;">length to small</div>`;
    } else {
        subtasks.push(subTask.value);
        subTask.value = '';
    }
    renderSubTasks();
}

function renderSubTasks() {
    let content = document.getElementById('subtasks');
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += `<li><input id="cb-subtask-${i}" class="subtask-checkbox" type="checkbox" control-id="ControlID-12"> ${subtask}</li>`;
    }
}
