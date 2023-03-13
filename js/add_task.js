function init() {
    renderCategorys();
}

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
    document.getElementById('taskAdded').classList.remove('d-none');
    document.getElementById('taskAdded').style = 'animation: comeIn 1s ease;';
    setTimeout(() => {
        document.getElementById('taskAdded').style = 'animation: comeOut 1s ease;';
    }, 2000);
    setTimeout(() => {
        document.getElementById('taskAdded').classList.add('d-none');
    }, 2500);
}

function setprio(i) {
    let btns = ['urgent', 'medium', 'low']
    let btnColor = ['#FF3D00', '#FFA800', '#7AE229']
    if (i) {
        let selectedBtn = btns.indexOf(i)
        btns.splice(selectedBtn, 1)
        document.getElementById(i).classList.add('btn-on-focus');
        document.getElementById(i).style = `background-color: ${btnColor[selectedBtn]};`;
    }
    btns.forEach(e => {
        document.getElementById(e).classList.remove('btn-on-focus');
        document.getElementById(e).style = ``;
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

function showNewCategoryInput() {
    let content = document.getElementById('category');
    if (content.value == 'New Category') {
        document.getElementById('newCategoryInput').classList.remove('d-none');
        content.classList.add('d-none');
    }
}

function addNewCategory() {
    let content = document.getElementById('newCategory').value;
    categorys.push(content);
    closeNewCategoryInput();
    renderCategorys();
}

function closeNewCategoryInput() {
    document.getElementById('newCategoryInput').classList.add('d-none');
    renderCategorys();
    document.getElementById('category').classList.remove('d-none');
}

function renderSubTasks() {
    let content = document.getElementById('subtasks');
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += `<li><input id="cb-subtask-${i}" class="subtask-checkbox" type="checkbox" control-id="ControlID-12"> ${subtask}</li>`;
    }
}

function renderCategorys() {
    let content = document.getElementById('category');
    content.innerHTML = '';
    for (let i = 0; i < categorys.length; i++) {
        let category = categorys[i];
        if (category == 'New Category') {
            content.innerHTML += `<option value="${category}">${category}</option>`
        }
        if (category == 'Select task category') {
            content.innerHTML += `<option value disabled selected hidden>${category}</option>`
        } 
        if(category != 'New Category' && category != 'Select task category') {
            content.innerHTML += `<option value="${category}">${category}</option>`
        }
    }
}
