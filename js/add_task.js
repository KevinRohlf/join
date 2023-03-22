let prio;
let selectedColor;
let selectedCategory;



function initAddTask() {
    renderCategorys();
    renderContacts();
}

function readForm() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    
    let contact_selection = document.getElementById('contact_selection');
    let date = document.getElementById('date');
    addTask(title, description, contact_selection, date);

}

function addTask(title, description, contact_selection, date) {
    let newTask = {
        'status': toDo,
        'title': title.value,
        'description': description.value,
        'category': selectedCategory,
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
    let content = document.getElementById('categoryShow');
    document.getElementById('newCategoryInput').classList.remove('d-none');
    content.classList.add('d-none');
    renderCategoryColors();
}

function addNewCategory() {
    let content = document.getElementById('newCategory').value;
    let newCategory = {
        'name': content,
        'color': selectedColor
    }
    categorys.push(newCategory);
    closeNewCategoryInput();
    renderCategorys();
}

function closeNewCategoryInput() {
    document.getElementById('newCategoryInput').classList.add('d-none');
    renderCategorys();
    document.getElementById('categoryShow').classList.remove('d-none');
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
        if (category['name'] == 'New Category') {
            content.innerHTML += `<div class="categorys" onclick="showNewCategoryInput()">${category['name']}</div>`
        } else if (category['name'] != 'New Category') {
            content.innerHTML += `<div class="categorys" onclick="selectCategory(${i})">${category['name']} <div style="background-color: ${category['color']}; width: 15px;
            height: 15px; border-radius: 100%;"></div></div>`
        }
    }
}

function renderCategoryColors() {
    let colors = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00', '#E200BE', '#0038FF'];
    let content = document.getElementById('categoryColors');
    content.innerHTML = '';
    for(let i = 0; i < colors.length; i++) {
        content.innerHTML += `<div class="color-circle" onclick="selectColor('${colors[i]}')" style="background-color: ${colors[i]};">`
    }
}

function selectColor(color) {
    selectedColor = color;
}

function selectCategory(i) {
    selectedCategory = categorys[i]['name'];
    document.getElementById('selectCategory').innerHTML = `${categorys[i]['name']} <div style="background-color: ${categorys[i]['color']}; width: 15px;
    height: 15px; border-radius: 100%;"></div> `;
    hideCategorys();
}

function showCategorys() {
    let content = document.getElementById('category');
    content.classList.remove('d-none')
    document.getElementById('categoryShow').style = 'animation: dropdown 2s ease;'
    document.getElementById('arrowCategory').style = 'animation: arrowUp 350ms ease; transform: rotate(180deg);'
    document.getElementById('selectCategory').setAttribute('onclick','hideCategorys()');
    document.getElementById('arrow').setAttribute('onclick','hideCategorys()');
}

function hideCategorys() {
    let content = document.getElementById('category');
    content.classList.add('d-none');
    document.getElementById('categoryShow').style = 'animation: dropup 2s ease;'
    document.getElementById('arrowCategory').style = 'animation: arrowDown 350ms ease;'
    document.getElementById('selectCategory').setAttribute('onclick','showCategorys()');
    document.getElementById('arrow').setAttribute('onclick','showCategorys()');
}

function renderContacts() {
    let content = document.getElementById('contact');
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        content.innerHTML += `<div class="contacts">${contact['name']} <input id="cb-subtask-${i}" class="subtask-checkbox" type="checkbox" control-id="ControlID-12"></div>`
    }
}

function showContacts() {
    let content = document.getElementById('contact');
    content.classList.remove('d-none')
    document.getElementById('contactShow').style = 'animation: dropdown 2s ease;'
    document.getElementById('arrowContact').style = 'animation: arrowUp 350ms ease; transform: rotate(180deg);'
    document.getElementById('selectContact').setAttribute('onclick','hideContacts()');
    document.getElementById('arrow').setAttribute('onclick','hideContacts()');
}

function hideContacts() {
    let content = document.getElementById('contact');
    content.classList.add('d-none')
    document.getElementById('contactShow').style = 'animation: dropup 2s ease;'
    document.getElementById('arrowContact').style = 'animation: arrowDown 350ms ease;'
    document.getElementById('selectContact').setAttribute('onclick','showContacts()');
    document.getElementById('arrow').setAttribute('onclick','showContacts()');
}