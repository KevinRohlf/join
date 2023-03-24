let prio;
let selectedColor;
let selectedCategory;
let selectedContacts = [];
let inAnimation = false;



function initAddTask() {
    renderCategorys();
    renderContacts();
}

function readForm() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    addTask(title, description, date);

}

function addTask(title, description, date) {
    let newTask = {
        'status': 'toDo',
        'title': title.value,
        'description': description.value,
        'category': selectedCategory,
        'contactSelection': selectedContacts,
        'date': date.value,
        'prio': prio,
        'subtasks': subtasks
    }
    tasks.push(newTask);
    console.log(tasks);
    clearForm();
    showTaskAdded();
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
    prio = i;
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('subtasks').innerHTML = '';
    prio = '';
    subtasks = [];
    selectedCategory = [];
    selectedContacts = [];
    renderSelectedContacts();
    renderContacts();
    selectCategory('reload');
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
    for (let i = 0; i < colors.length; i++) {
        content.innerHTML += `<div class="color-circle" onclick="selectColor('${colors[i]}')" style="background-color: ${colors[i]};">`
    }
}

function selectColor(color) {
    selectedColor = color;
}

function selectCategory(i) {
    if (i == 'reload') {
        document.getElementById('selectCategory').innerHTML = 'Select task category';
    } else {
        selectedCategory = categorys[i]['name'];
        document.getElementById('selectCategory').innerHTML = `${categorys[i]['name']} <div style="background-color: ${categorys[i]['color']}; width: 15px;
        height: 15px; border-radius: 100%;"></div> `;
    }
    hideCategorys();
}

function showCategorys() {
    if (!inAnimation) {
        let content = document.getElementById('category');
        content.classList.remove('d-none')
        document.getElementById('categoryShow').style = 'animation: dropdown 2s ease;'
        document.getElementById('arrowCategory').style = 'animation: arrowUp 350ms ease; transform: rotate(180deg);'
        document.getElementById('selectCategory').setAttribute('onclick', 'hideCategorys()');
        document.getElementById('arrowCategory').setAttribute('onclick', 'hideCategorys()');
    }

}

function hideCategorys() {
    let content = document.getElementById('category');
    let categoryShow = document.getElementById('categoryShow')
    inAnimation = true;
    editEndHeight(categoryShow);
    document.getElementById('selectCategory').setAttribute('onclick', 'showCategorys()');
    document.getElementById('arrowCategory').setAttribute('onclick', 'showCategorys()');
    categoryShow.style = 'animation: dropup 500ms ease;';
    document.getElementById('arrowCategory').style = 'animation: arrowDown 350ms ease;';
    setTimeout(() => {
        content.classList.add('d-none');
        inAnimation = false;
    }, 500);

}
function renderContacts() {
    let content = document.getElementById('contact');
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        content.innerHTML += `<label for="cb-subtask-${i}"> <div class="contacts">${contact['name']} <input onclick="addContactToList(${i})" id="cb-subtask-${i}" class="subtask-checkbox" type="checkbox" control-id="ControlID-12"></div></label>`
    }
}

function showContacts() {
    if (!inAnimation) {
        let content = document.getElementById('contact');
        content.classList.remove('d-none')
        document.getElementById('contactShow').style = 'animation: dropdown 2s ease;'
        document.getElementById('arrowContact').style = 'animation: arrowUp 350ms ease; transform: rotate(180deg);'
        document.getElementById('selectContact').setAttribute('onclick', 'hideContacts()');
        document.getElementById('arrowContact').setAttribute('onclick', 'hideContacts()');
    }

}

function hideContacts() {
    let content = document.getElementById('contact');
    let contactShow = document.getElementById('contactShow')
    inAnimation = true;
    editEndHeight(contactShow);
    document.getElementById('selectContact').setAttribute('onclick', 'showContacts()');
    document.getElementById('arrowContact').setAttribute('onclick', 'showContacts()');
    contactShow.style = 'animation: dropup 500ms ease;';
    document.getElementById('arrowContact').style = 'animation: arrowDown 350ms ease;';
    setTimeout(() => {
        content.classList.add('d-none');
        inAnimation = false;
    }, 500);
}

function addContactToList(number) {
    let contact = document.getElementById(`cb-subtask-${number}`);
    selectedContacts.push(contacts[number]['contact_selection']);
    contact.setAttribute('onclick', `removeContactFromList(${number})`);
    renderSelectedContacts();
}

function removeContactFromList(number) {
    let contact = document.getElementById(`cb-subtask-${number}`);
    contact.setAttribute('onclick', `addContactToList(${number})`);
    let index = selectedContacts.indexOf(contacts[number]['contact_selection']);
    selectedContacts.splice(index, 1)
    renderSelectedContacts();
}

function renderSelectedContacts() {
    let content = document.getElementById('selectContact');
    content.innerHTML = '';
    if (selectedContacts.length > 0) {
        for (let i = 0; i < selectedContacts.length; i++) {
            let color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            console.log(color)
            content.innerHTML += `<div class="circle" style="background-color: ${color.toUpperCase()};": >${selectedContacts[i]}</div>`
        }
    } else {
        content.innerHTML = 'Select contacts to assign';
    }

}

function showTaskAdded() {
    let taskAdded = document.getElementById('taskAdded');
    taskAdded.classList.remove('d-none');
    taskAdded.style = 'animation: comeIn 1s ease;';
    setTimeout(() => {
        taskAdded.style = 'animation: comeOut 1s ease;';
    }, 2000);
    setTimeout(() => {
        taskAdded.classList.add('d-none');
    }, 2500);
}

function editEndHeight(content) {
    document.documentElement.style.setProperty('--end-height', content.clientHeight + 'px')
}