

let tasks = []
let categorys = []
let contacts = []
let cardOpened = false;
let currentContact
let inAnimation = false;
let currentDraggedElement;

/*
let currentTasks = []
let p = 0
*/



async function loadBackend() {
    setURL('https://gruppenarbeit-479-join.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    loadTasks()
}


function loadTasks() {
    console.log(tasks)
    console.log(categorys)
    console.log(contacts)
    document.getElementById('to-do-container').innerHTML = ''
    document.getElementById('in-progress-container').innerHTML = ''
    document.getElementById('awaiting-feedback-container').innerHTML = ''
    document.getElementById('done-container').innerHTML = ''
    filterTasks()
}


function filterTasks() {
    for (let i = 0; i < tasks.length; i++) {
        let currentTask = tasks[i]
        if (currentTask.status == 'toDo') {
            let content = document.getElementById('to-do-container')
            forwardTaskContent(currentTask, content, i)
        } else if (currentTask.status == 'inProgress') {
            let content = document.getElementById('in-progress-container')
            forwardTaskContent(currentTask, content, i)
        } else if (currentTask.status == 'awaitingFeedback') {
            let content = document.getElementById('awaiting-feedback-container')
            forwardTaskContent(currentTask, content, i)
        } else if (currentTask.status == 'done') {
            let content = document.getElementById('done-container')
            forwardTaskContent(currentTask, content, i)
        }
    }
}


function forwardTaskContent(currentTask, content, i) {
    renderAllTasks(currentTask, content, i)
    renderContactSelection(currentTask, i)
}


function renderAllTasks(currentTask, content, i) {
    content.innerHTML += htmlRenderAllTasks(currentTask, i)
    getPrioImage(currentTask, i)
    getTaskCategoryColor(i)
}


function getPrioImage(currentTask, i) {
    let content = document.getElementById(`${currentTask.prio}_${i}`)
    if (content.id == `low_${i}`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-low.svg'
        content.appendChild(img)
    } else if (content.id == `medium_${i}`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-medium.svg'
        content.appendChild(img)
    } else if (content.id == `urgent_${i}`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-urgent.svg'
        content.appendChild(img)
    }
}


function getTaskCategoryColor(i) {
    for (let j = 0; j < categorys.length; j++) {
        if (categorys[j].name == tasks[i].category) {
            document.getElementById(i).firstElementChild.style = `background-color: ${categorys[j].color}`
            if (cardOpened) {
                document.getElementById('card-container').children[1].style = `background-color: ${categorys[j].color}`
            }
        }
    }
}


function renderContactSelection(currentTask, i) {
    //let currentContact
    for (let k = 0; k < currentTask.contactSelection.length; k++) {
        currentContact = currentTask.contactSelection[k]
        if (currentTask.contactSelection.length <= 3) {
            showAllContacts(currentTask, i, currentContact)
            getContactColor(currentContact, i, k)
        } else {
            showFirstTwoContacts(k, currentTask, i, currentContact)
            getContactColor(currentContact, i, k)
        }
    }
}


function showAllContacts(currentTask, i, currentContact) {
    document.getElementById(`contact-selection-${currentTask.status}_${i}`).innerHTML +=
    /*html*/ `
    <div id="${currentContact}_${i}">${currentContact}</div>
    `
}


function showFirstTwoContacts(k, currentTask, i, currentContact) {
    if (k < 2) {
        document.getElementById(`contact-selection-${currentTask.status}_${i}`).innerHTML +=
        /*html*/ `
        <div id="${currentContact}_${i}">${currentContact}</div>
        `
    } else if (k == 3) {
        document.getElementById(`contact-selection-${currentTask.status}_${i}`).innerHTML +=
        /*html*/ `
        <div id="remaining-contacts-number-${i}">${'+' + (currentTask.contactSelection.length - 2)}</div>
        `
    }
}


function getContactColor(currentContact, i, k) {

    for (let j = 0; j < contacts.length; j++) {
        if (k < 2) {
            if (contacts[j].initials == currentContact) {
                document.getElementById(`${currentContact}_${i}`).style = `background-color: ${contacts[j].color}`
            }
        } else if (k == 3) {
            document.getElementById(`remaining-contacts-number-${i}`).style = `background-color: ${contacts[j].color}`
        }
    }
}



function loadCard(i) {
    cardOpened = true
    if (window.innerWidth < 1000) {
        main.classList.add('d-none')
    }
    body.classList.add('overflow-hidden')
    let overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none')
    renderCard(i, overlay)
    renderCardContacts(i)
    getCardPrioImg(i)
    getTaskCategoryColor(i)
}


function renderCard(i, overlay) {
    overlay.innerHTML = htmlRenderCard(i)
    document.getElementById('card-container').classList.remove('d-none')
}


function stopPropagation(event) {
    event.stopPropagation();
}


function renderCardContacts(i) {
    /*   let currentColor
       for (let j = 0; j < contacts.length; j++) {
           if (contacts[j].initials == currentContact) {
               console.log(currentContact)
               currentColor = contacts[j].color
           }
       }*/
    let container = document.getElementById('contact-card-container')
    tasks[i].contactSelection.forEach(element => {
        for (let j = 0; j < contacts.length; j++) {
            let contact = contacts[j]
            if (element == contacts[j].initials) {
                container.innerHTML +=
                /*html*/ `
                <div class="contact-card-content">
                    <p style="background-color:${contact.color}">${contact.initials}</p> 
                    <p>${contact.name}</p>
                </div>
       `
            }
        }
    });
}


function getCardPrioImg(i) {
    let content = document.getElementById(`card-${tasks[i].prio}`)
    if (content.id == `card-low`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-low copy.svg'
        content.appendChild(img)
    } else if (content.id == `card-medium`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-medium copy.svg'
        content.appendChild(img)
    } else if (content.id == `card-urgent`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-urgent copy.svg'
        content.appendChild(img)
    }
}


function searchTasks() {
    let input = document.getElementById('find-task-input')
    for (let i = 0; i < tasks.length; i++) {
        let content = document.getElementById(`${i}`)
        if ((tasks[i].title.toLowerCase().includes(input.value.toLowerCase()))) {
            content.classList.remove('d-none')
        } else if ((tasks[i].description.toLowerCase().includes(input.value.toLowerCase()))) {
            content.classList.remove('d-none')
        } else {
            content.classList.add('d-none')
        }
    }
}


function loadEditTask(i) {
    console.log(i)
    renderEditTask(i)
    renderContacts(i);
    renderCardContacts(i)
    highlightPrio(i)
}


function renderEditTask(i) {
    let content = document.getElementById('card-container')
    content.innerHTML = htmlRenderEditTask(i)

}


async function changePrio(i, prio) {
    tasks[i].prio = `${prio}`
    await backend.setItem(`tasks`, JSON.stringify(tasks));
    highlightPrio(i)
}


function closeForm(i) {
    updateInput(i)
    closeCard()
    loadTasks()
}


function closeCard() {
    cardOpened = false;
    body.classList.remove('overflow-hidden')
    document.getElementById('card-container').classList.add('d-none')
    document.getElementById('overlay').classList.add('d-none')
    if (window.innerWidth < 1000) {
        main.classList.remove('d-none')
    }
}


async function updateInput(i) {
    let inputTitle = document.getElementById('edit-task-title')
    let inputDescription = document.getElementById('edit-task-description')
    let inputDate = document.getElementById('edit-task-date')
    if (!inputTitle.value == '') {
        tasks[i].title = inputTitle.value
    }
    if (!inputDescription.value == '') {
        tasks[i].description = inputDescription.value
    }

    if (!inputDate.value == '') {
        tasks[i].date = inputDate.value
    }
    await backend.setItem(`tasks`, JSON.stringify(tasks));
}


function highlightPrio(i) {
    if (tasks[i].prio == 'low') {
        taskPrioLow()
    } else {
        taskPrioNotLow()
    }
    if (tasks[i].prio == 'medium') {
        taskPrioMedium()
    } else {
        taskPrioNotMedium()
    }
    if (tasks[i].prio == 'urgent') {
        taskPrioUrgent()
    } else {
        taskPrioNotUrgent()
    }
}


function taskPrioLow() {
    let content = document.getElementById('prio-area-low')
    content.style = 'background-color:#7AE229'
    let text = content.children[0]
    let svgPath1 = content.children[1].children[0]
    let svgPath2 = content.children[1].children[1]
    text.style.color = '#FFFFFF'
    svgPath1.style.fill = '#FFFFFF'
    svgPath2.style.fill = '#FFFFFF'
}


function taskPrioNotLow() {
    let content = document.getElementById('prio-area-low')
    content.style = 'background-color:#FFFFFF'
    let text = content.children[0]
    let svgPath1 = content.children[1].children[0]
    let svgPath2 = content.children[1].children[1]
    text.style.color = '#7AE229'
    svgPath1.style.fill = '#7AE229'
    svgPath2.style.fill = '#7AE229'
}


function taskPrioMedium() {
    let content = document.getElementById('prio-area-medium')
    content.style = 'background-color:#FFA800'
    let text = content.children[0]
    let svgPath1 = content.children[1].children[0].children[0]
    let svgPath2 = content.children[1].children[0].children[1]
    text.style.color = '#FFFFFF'
    svgPath1.style.fill = '#FFFFFF'
    svgPath2.style.fill = '#FFFFFF'
}


function taskPrioNotMedium() {
    let content = document.getElementById('prio-area-medium')
    content.style = 'background-color:#FFFFFF'
    let text = content.children[0]
    let svgPath1 = content.children[1].children[0].children[0]
    let svgPath2 = content.children[1].children[0].children[1]
    text.style.color = '#FFA800'
    svgPath1.style.fill = '#FFA800'
    svgPath2.style.fill = '#FFA800'
}


function taskPrioUrgent() {
    let content = document.getElementById('prio-area-urgent')
    content.style = 'background-color:#FF3D00'
    let text = content.children[0]
    let svgPath1 = content.children[1].children[0].children[0]
    let svgPath2 = content.children[1].children[0].children[1]
    text.style.color = '#FFFFFF'
    svgPath1.style.fill = '#FFFFFF'
    svgPath2.style.fill = '#FFFFFF'
}


function taskPrioNotUrgent() {
    let content = document.getElementById('prio-area-urgent')
    content.style = 'background-color:#FFFFFF'
    let text = content.children[0]
    let svgPath1 = content.children[1].children[0].children[0]
    let svgPath2 = content.children[1].children[0].children[1]
    text.style.color = '#FF3D00'
    svgPath1.style.fill = '#FF3D00'
    svgPath2.style.fill = '#FF3D00'
}


/*********Edit Task Dropdown Menu************/

async function renderContacts(i) {
    let content = document.getElementById('contact');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    content.innerHTML = '';
    for (let j = 0; j < contacts.length; j++) {
        let contact = contacts[j];
        content.innerHTML += `<label for="cb-contacts-${j}"> <div class="contacts">${contact['name']} <input onclick="addContactToList(${j})" id="cb-contacts-${j}" class="checkbox" type="checkbox" control-id="ControlID-12"></div></label>`
        if (j == contacts.length - 1) {
            let j = contacts.length
            content.innerHTML += `<label for="cb-subtask-${j}"> <div class="contacts">Intive new contact <input onclick="inviteNewContact(${i})" id="cb-subtask-${j}" class="subtask-checkbox" type="checkbox" control-id="ControlID-12"></div></label>`
        }
    }
}


function inviteNewContact(i) {
    let area = 'contact'
    dropup(area)
    let content = document.getElementById('contactShow')
    content.innerHTML =
    /*html*/ `
    <div class="invite-contact-container">
        <input class="invite-contact-input" type="email" placeholder="Contact email">
        <div>
            <div>
                <svg width="26" height="26" viewBox="2 2 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="closeCard()">
                    <path d="M22.9614 7.65381L7.65367 22.9616" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    <path d="M22.8169 23.106L7.50914 7.7982" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <div>
                <svg width="2" height="31" viewBox="0 0 2 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V31" stroke="#D1D1D1"/>
                </svg>
            </div>
            <div onclick="showDropDown(${i})">
                <svg width="18" height="18" viewBox="0 -2 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.5L7 13.5L17 1.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    </div>
    `
}

function showDropDown(i) {
    loadEditTask(i)
}


function dropdown(area) {
    console.log(area)
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
    console.log(inAnimation)
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


function editEndHeight(content) {
    document.documentElement.style.setProperty('--end-height', content.clientHeight + 'px')
}


function addContactToList(number) {
    let contact = document.getElementById(`cb-contacts-${number}`);
    selectedContacts.push(contacts[number]['initials']);
    contact.setAttribute('onclick', `removeContactFromList(${number})`);
    renderSelectedContacts();
}


function removeContactFromList(number) {
    let contact = document.getElementById(`cb-contacts-${number}`);
    contact.setAttribute('onclick', `addContactToList(${number})`);
    let index = selectedContacts.indexOf(contacts[number]['initials']);
    selectedContacts.splice(index, 1)
    renderSelectedContacts();
}


function renderSelectedContacts() {
    let content = document.getElementById('selectContact');
    content.innerHTML = '';
    if (selectedContacts.length > 0) {
        for (let i = 0; i < selectedContacts.length; i++) {
            content.innerHTML += `<div class="circle" style="background-color: ${contacts[i]['color']};": >${selectedContacts[i]}</div>`
        }
    } else {
        content.innerHTML = 'Select contacts to assign';
    }
}




/*********Drag and Drop Function************/




function dragstart_handler(id) {
    currentDraggedElement = id
    // id.dataTransfer.setDragImage(image, xOffset, yOffset);

}


function dragover_handler(ev) {
    ev.preventDefault();
}


async function drop_handler(status) {
    tasks[currentDraggedElement].status = status;
    await backend.setItem(`tasks`, JSON.stringify(tasks));
    loadTasks()
}


function highlightArea(id) {
    let container = document.getElementById(id)
    container.classList.remove('d-none')
    /* let originContainer = container.parentElement.parentElement.children[1].lastElementChild.id
     console.log(id)
     console.log(originContainer)
     if (!originContainer == id) {
         container.classList.remove('d-none')
     }
 */
}


function removeHighlightArea(id) {
    let container = document.getElementById(id)
    container.classList.add('d-none')
}


function highliteDragArea(id) {

    let container = document.getElementById(id)

    container.classList.remove('d-none')
}


function removeHighlightDragArea(id) {
    let container = document.getElementById(id)
    container.classList.add('d-none')

}


function removeTest(id) {
    let element = document.getElementById(id)
    //console.log(element.parentElement.parentElement.parentElement.children/*[0].lastElementChild*/)

    let targetContainer = element.parentElement.parentElement.parentElement.children
    for (let i = 0; i < targetContainer.length; i++) {
        // console.log(targetContainer[i].lastElementChild)
        targetContainer[i].lastElementChild.classList.add('d-none')
    }


    // .currentNode.nextElementSibling
}