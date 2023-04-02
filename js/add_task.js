let prio;
let selectedColor;
let selectedCategory;
let selectedContacts = [];
let inAnimation = false;
let sTStatus = [];



async function initAddTask() {
    setURL('https://gruppenarbeit-479-join.developerakademie.net/smallest_backend_ever');
    renderCategorys();
    renderContacts();
    editCreateBtnOnMobile();

}


function readForm() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    addTask(title, description, date);
}

async function addTask(title, description, date) {

    let newTask = {
        'status': 'toDo',
        'title': title.value,
        'description': description.value,
        'category': selectedCategory,
        'contactSelection': selectedContacts,
        'date': date.value,
        'prio': prio,
        'subtasks': subtasks,
        'sTStatus': sTStatus
    };
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    tasks.push(newTask);
    await backend.setItem('tasks', JSON.stringify(tasks));
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
    sTStatus = []; 
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
        sTStatus.push('false');
        subTask.value = '';
    };
    renderSubTasks();
}

function showNewCategoryInput() {
    let content = document.getElementById('categoryShow');
    document.getElementById('newCategoryInput').classList.remove('d-none');
    content.classList.add('d-none');
    renderCategoryColors();
}

async function addNewCategory() {
    let content = document.getElementById('newCategory').value;
    let newCategory = {
        'name': content,
        'color': selectedColor
    };
    categorys.push(newCategory);
    await backend.setItem('categorys', JSON.stringify(categorys));
    closeNewCategoryInput();
    renderCategorys();
}

function closeNewCategoryInput() {
    document.getElementById('newCategoryInput').classList.add('d-none');
    document.getElementById('categoryShow').classList.remove('d-none');
}

function renderSubTasks() {
    let content = document.getElementById('subtasks');
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += `<li><input id="cb-subtask-${i}" class="checkbox" type="checkbox" control-id="ControlID-12"> ${subtask}</li>`;
    }
}

async function renderCategorys() {
    let content = document.getElementById('category');
    content.innerHTML = '';
    content.innerHTML += `<div class="categorys" onclick="showNewCategoryInput()">New Category</div>`
    await downloadFromServer();
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    for (let i = 0; i < categorys.length; i++) {
        let category = categorys[i];
        content.innerHTML += `<div class="categorys" onclick="selectCategory(${i})">${category['name']} <div style="background-color: ${category['color']}; width: 15px;
            height: 15px; border-radius: 100%;"></div></div>`
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
    dropup('category');
}

async function renderContacts() {
    let content = document.getElementById('contact');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        content.innerHTML += `<label for="cb-contacts-${contacts[i]['ID']}"> <div class="contacts">${contact['name']} <input onclick="addContactToList(${contacts[i]['ID']})" id="cb-contacts-${contacts[i]['ID']}" class="checkbox" type="checkbox" control-id="ControlID-12"></div></label>`
    }
}

function dropdown(area) {
    if (!inAnimation) {
        let content = document.getElementById(area);
        let bigArea = area[0].toUpperCase() + area.slice(1);
        content.classList.remove('d-none')
        document.getElementById(area + 'Show').style = 'animation: dropdown 2s ease;'
        document.getElementById(`arrow${bigArea}`).style = 'animation: arrowUp 350ms ease; transform: rotate(180deg);'
        document.getElementById(`select${bigArea}`).setAttribute('onclick', `dropup('${area}')`);
        document.getElementById(`arrow${bigArea}`).setAttribute('onclick', `dropup('${area}')`);
    }
}

function dropup(area) {
    let content = document.getElementById(area);
    let areaShow = document.getElementById(area + 'Show')
    inAnimation = true;
    let bigArea = area[0].toUpperCase() + area.slice(1);
    editEndHeight(areaShow);
    document.getElementById('select' + bigArea).setAttribute('onclick', `dropdown('${area}')`);
    document.getElementById('arrow' + bigArea).setAttribute('onclick', `dropdown('${area}')`);
    areaShow.style = 'animation: dropup 500ms ease;';
    document.getElementById('arrow' + bigArea).style = 'animation: arrowDown 350ms ease;';
    setTimeout(() => {
        content.classList.add('d-none');
        inAnimation = false;
    }, 500);
}

function addContactToList(id) {
    let contact = document.getElementById(`cb-contacts-${id}`);
    selectedContacts.push(id);
    contact.setAttribute('onclick', `removeContactFromList(${id})`);
    renderSelectedContacts();
}

function removeContactFromList(id) {
    let contact = document.getElementById(`cb-contacts-${id}`);
    contact.setAttribute('onclick', `addContactToList(${id})`);
    for (let i = 0; i < contacts.length; i++) {
        let index = selectedContacts.indexOf(id);
        if (index != -1) {
            selectedContacts.splice(index, 1)
        }
    }


    renderSelectedContacts();
}

function renderSelectedContacts() {
    let content = document.getElementById('selectContact');
    content.innerHTML = '';
    if (selectedContacts.length > 0) {
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i]['ID'];
            for (let j = 0; j < selectedContacts.length; j++) {
                if (contact == selectedContacts[j]) {
                    content.innerHTML += `<div class="circle" style="background-color: ${contacts[i]['color']};": >${contacts[i]['initials']}</div>`
                }
            }

        }

        //    for (let i = 0; i < selectedContacts.length; i++) {
        //        content.innerHTML += `<div class="circle" style="background-color: ${contacts[i]['color']};": >${selectedContacts[i]}</div>`
        //    }
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

function editCreateBtnOnMobile() {
    setInterval(() => {
        let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width < 1000) {
            document.getElementById('createBtn').innerHTML = `Create
        <svg width="18" height="15" viewBox="0 0 18 15" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7.5L7 13.5L17 1.5" stroke="white" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    	`
        } else {
            document.getElementById('createBtn').innerHTML = `Create Task
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7.5L7 13.5L17 1.5" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>`
        }
    }, 500);

}