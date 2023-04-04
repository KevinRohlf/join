let tasks = []
let categorys = []
let contacts = []
let cardOpened = false;
let currentContact;
let inAnimation = false;
let currentDraggedElement;

/**
 * This function is used to load the content from the backend
 * 
 * 
 */
async function loadBackend() {
    setURL('https://gruppenarbeit-479-join.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    loadTasks()
}

/**
 * 
 * This function is used to get the containers which will be filled with the content from the backend
 * 
 */
function loadTasks() {
    // console.log(tasks)
    //  console.log(categorys)
    //  console.log(contacts)
    document.getElementById('to-do-container').innerHTML = ''
    document.getElementById('in-progress-container').innerHTML = ''
    document.getElementById('awaiting-feedback-container').innerHTML = ''
    document.getElementById('done-container').innerHTML = ''
    filterTasks()
}

/**
 * 
 * This function is used to so sort the content from the backend
 * 
 */
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


/**
 * 
 * This function is used to render the backend content
 * 
 * @param {object} currentTask 
 * @param {html container} content 
 * @param {number} i 
 */
function forwardTaskContent(currentTask, content, i) {
    renderAllTasks(currentTask, content, i)
    renderContactSelection(currentTask, i)
    renderProgressBar(currentTask, i)
}

/**
 * 
 * This function is used to render the progress bar
 * 
 * @param {number} i 
 */
function renderProgressBar(i) {
    if (tasks[i].subtasks.length > 0) {
        let totalSubtasks = tasks[i].subtasks.length
        let completedSubtasks = 0
        /*  for (let k = 0; k < tasks[i].sTStatus.length; k++) {
              if (tasks[i].sTStatus == true) {
                  completedSubtasks++
              }
          } */
        let progressBar = document.getElementById(`subtask-progress-bar-${i}`)
        progressBar.innerHTML =
    /*html*/`
    <progress id="file" value="${completedSubtasks}" max="${totalSubtasks}"> 32% </progress>
    <label for="file" id="progress-count-${i}">${completedSubtasks}/${totalSubtasks}</label>
    `
    }
}

/**
 * 
 * This function is used to render all tasks
 * 
 * @param {object} currentTask 
 * @param {html container} content 
 * @param {number} i 
 */
function renderAllTasks(currentTask, content, i) {
    content.innerHTML += htmlRenderAllTasks(currentTask, i)
    getPrioImage(currentTask, i)
    getTaskCategoryColor(i)
}

/**
 * 
 * This function is used to render the priority image 
 * 
 * @param {object} currentTask 
 * @param {number} i 
 */
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

/**
 * 
 * This function is used to get the corret color for every category
 * 
 * @param {number} i 
 */
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

/**
 * 
 * This function is used to render the contact selection
 * 
 * @param {object} currentTask 
 * @param {number} i 
 */
function renderContactSelection(currentTask, i) {
    for (let k = 0; k < currentTask.contactSelection.length; k++) {
        for (let j = 0; j < contacts.length; j++) {
            if (currentTask.contactSelection[k] == contacts[j].ID) {
                currentContact = contacts[j].initials
                if (currentTask.contactSelection.length <= 3) {
                    showAllContacts(currentTask, i, currentContact, j)
                    getContactColor(i, k, j)
                } else {
                    showFirstTwoContacts(k, currentTask, i, currentContact, j)
                    getContactColor(i, k, j)
                }
            }
        }
    }
}

/**
 * 
 * This function is used to render all contacts for every task
 * 
 * @param {object} currentTask 
 * @param {number} i 
 * @param {object} currentContact 
 * @param {number} j 
 */
function showAllContacts(currentTask, i, currentContact, j) {
    document.getElementById(`contact-selection-${currentTask.status}_${i}`).innerHTML +=
    /*html*/ `
    <div class="circle" id="${contacts[j].ID}_${i}">${currentContact}</div>
    `
}

/**
 * 
 * This function is used to render the first two contacts for every task, and get a counter for the remaining contacts
 * 
 * @param {number} k 
 * @param {object} currentTask 
 * @param {number} i 
 * @param {object} currentContact 
 */
function showFirstTwoContacts(k, currentTask, i, currentContact) {
    if (k < 2) {
        document.getElementById(`contact-selection-${currentTask.status}_${i}`).innerHTML +=
        /*html*/ `
        <div id="${contacts[j].ID}_${i}">${currentContact}</div>
        `
    } else if (k == 3) {
        document.getElementById(`contact-selection-${currentTask.status}_${i}`).innerHTML +=
        /*html*/ `
        <div id="remaining-contacts-number-${i}">${'+' + (currentTask.contactSelection.length - 2)}</div>
        `
    }
}

/**
 * 
 * This function is used to render the color for every contact
 * 
 * @param {number} i 
 * @param {number} k 
 * @param {number} j 
 */
function getContactColor(i, k, j) {
    for (let l = 0; l < contacts.length; l++) {
        if (k < 3) {
            if (contacts[l].ID == tasks[i].contactSelection[k]) {
                document.getElementById(`${contacts[j].ID}_${i}`).style = `background-color: ${contacts[l].color}`
            }
        } else if (k == 3) {
            document.getElementById(`remaining-contacts-number-${i}`).style = `background-color: ${contacts[l].color}`
        }
    }
}


/**
 * 
 * This function is used to render the detailed view of the clicked task
 * 
 * @param {number} i 
 */
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

/**
 * 
 * This function is used to render the detailed view of the clicked task
 * 
 * @param {number} i 
 * @param {html container} overlay 
 */
function renderCard(i, overlay) {
    overlay.innerHTML = htmlRenderCard(i)
    document.getElementById('card-container').classList.remove('d-none')
}

/**
 * 
 * This funciton is used to stop the overlay onclick function when pressing buttons on the card
 * 
 * @param {string} event 
 */
function stopPropagation(event) {
    event.stopPropagation();
}

/**
 * 
 * This function is used to render the contacts on the card
 * 
 * @param {number} i 
 */
function renderCardContacts(i) {
    let container = document.getElementById('contact-card-container')
    tasks[i].contactSelection.forEach(element => {
        for (let j = 0; j < contacts.length; j++) {
            let contact = contacts[j]
            if (element == contacts[j].ID) {
                container.innerHTML +=
                /*html*/ `
                <div class="contact-card-content">
                    <p class="circle" style="background-color:${contact.color}">${contact.initials}</p> 
                    <p>${contact.name}</p>
                </div>
                `
            }
        }
    });
}

/**
 * 
 * This function is used to render the correct prio image on the card
 * 
 * @param {number} i 
 */
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

/**
 * 
 * This function is used to search all tasks
 * 
 */
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

/**
 * 
 * This function is used to render the edit task section
 * 
 * @param {number} i 
 */
function loadEditTask(i) {
    renderEditTask(i)
    renderContacts(i);
    renderCardContacts(i)
    highlightPrio(i)
}

/**
 * 
 * This function is used to render the edit task section
 * 
 * @param {number} i 
 */
function renderEditTask(i) {
    let content = document.getElementById('card-container')
    content.innerHTML = htmlRenderEditTask(i)
    let subtasks = document.getElementById('edit-task-subtasks-container')
    if (tasks[i].subtasks.length > 0) {
        subtasks.innerHTML = `<p>Subtasks</p>`
        for (let j = 0; j < tasks[i].subtasks.length; j++) {
            subtasks.innerHTML +=
            /*html*/`
                <div class="subtasks">${tasks[i].subtasks[j]} <input onclick="updateSubtask(${j},${i})" id="subtask-${j}" class="checkbox" type="checkbox"></div>
            `
        }
        checkForCompletedSubtasks(i)
    }
}

/**
 * 
 * This function is used to check if the subtasks are completed or not and render the status
 * 
 * @param {number} i 
 */
function checkForCompletedSubtasks(i) {
    for (let j = 0; j < tasks[i].sTStatus.length; j++) {
        if (tasks[i].sTStatus[j] == true) {
            document.getElementById(`subtask-${j}`).checked = true
        }
    }
}

/**
 * 
 * This function is used to update the subtask status in backend
 * 
 * @param {number} j 
 * @param {number} i 
 */
async function updateSubtask(j, i) {
    let checked = document.getElementById(`subtask-${j}`).checked
    if (checked) {
        tasks[i].sTStatus[j] = true;
        await backend.setItem(`tasks`, JSON.stringify(tasks));
    } else {
        tasks[i].sTStatus[j] = false;
        await backend.setItem(`tasks`, JSON.stringify(tasks));
    }
}

/**
 * 
 * This function is used to the change the prio of a task when clicked and update the backend
 * 
 * @param {number} i 
 * @param {string} prio 
 */
async function changePrio(i, prio) {
    tasks[i].prio = `${prio}`
    await backend.setItem(`tasks`, JSON.stringify(tasks));
    highlightPrio(i)
}

/**
 * 
 * This function is used to close the detailed view and load the updates on the tasks
 * 
 * @param {number} i 
 */
function closeForm(i) {
    updateInput(i)
    closeCard()
    loadTasks()
}

/**
 * 
 * This function is used to close the detailed view of the tasks
 * 
 */
function closeCard() {
    cardOpened = false;
    body.classList.remove('overflow-hidden')
    document.getElementById('card-container').classList.add('d-none')
    document.getElementById('overlay').classList.add('d-none')
    if (window.innerWidth < 1000) {
        main.classList.remove('d-none')
    }
}

/**
 * 
 * This function is used to update title, descritpion and date of every task
 * 
 * @param {number} i 
 */
async function updateInput(i) {
    let inputTitle = document.getElementById('edit-task-title')
    let inputDescription = document.getElementById('edit-task-description')
    let inputDate = document.getElementById('edit-task-date')
    if (!inputTitle.value == '')
        tasks[i].title = inputTitle.value
    if (!inputDescription.value == '')
        tasks[i].description = inputDescription.value
    if (!inputDate.value == '')
        tasks[i].date = inputDate.value
    await backend.setItem(`tasks`, JSON.stringify(tasks));
}

/**
 * 
 * This function is used to show the correct prio image
 * 
 * @param {number} i 
 */
function highlightPrio(i) {
    if (tasks[i].prio == 'low')
        taskPrioLow()
    else
        taskPrioNotLow()
    if (tasks[i].prio == 'medium')
        taskPrioMedium()
    else
        taskPrioNotMedium()
    if (tasks[i].prio == 'urgent')
        taskPrioUrgent()
    else
        taskPrioNotUrgent()
}

/**
 * 
 * This function is used to show the correct prio image
 * 
 */
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

/**
 * 
 * This function is used to show the correct prio image
 * 
 */
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

/**
 * 
 * This function is used to show the correct prio image
 * 
 */
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

/**
 * 
 * This function is used to show the correct prio image
 * 
 */
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

/**
 * 
 * This function is used to show the correct prio image
 * 
 */
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

/**
 * 
 * This function is used to show the correct prio image
 * 
 */
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

/**
 * 
 * This function is used to render the contacts in the drop down menu
 * 
 * @param {number} i 
 */
async function renderContacts(i) {
    let content = document.getElementById('contact');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    content.innerHTML = '';
    for (let j = 0; j < contacts.length; j++) {
        let contact = contacts[j];
        content.innerHTML += `<label for="cb-contacts-${j}"> <div class="contacts">${contact['name']} <input onclick="addContactToList(${j},${i})" id="cb-contacts-${j}" class="checkbox" type="checkbox" control-id="ControlID-12"></div></label>`
        if (j == contacts.length - 1) {
            let j = contacts.length
            content.innerHTML += `<label for="cb-subtask-${j}"> <div class="contacts">Intive new contact <input onclick="inviteNewContact(${i})" id="cb-subtask-${j}" class="subtask-checkbox" type="checkbox" control-id="ControlID-12"></div></label>`
        }
    }
}

/**
 * 
 * This function is used to invite a new contact to the task
 * 
 * @param {number} i 
 */
function inviteNewContact(i) {
    let area = 'contact'
    dropup(area)
    let content = document.getElementById('contactShow')
    content.innerHTML = renderInviteNewContactArea(i)
}

/**
 * 
 * This function is used to check if contacts are already part of task
 * 
 * @param {number} i 
 */
function checkForSelectedContacts() {
    for (let j = 0; j < contacts.length; j++) {
        let container = document.getElementById('contact-card-container')
        let i = container.className.slice(0, 1)
        let contact = contacts[j];
        if (tasks[i].contactSelection.includes(contact.ID)) {
            document.getElementById(`cb-contacts-${j}`).checked = true
        }
    }
}

/**
 * 
 * This function is used to show all contacts in drop down menu
 * 
 * @param {number} i 
 */
function showDropDown(i) {
    loadEditTask(i)
}

/**
 * 
 * This function is used to open the drop down menu
 * 
 * @param {string} area 
 * @param {number} i 
 */
function dropdown(area, i) {
    if (!inAnimation) {
        let content = document.getElementById(area);
        let bigArea = area[0].toUpperCase() + area.slice(1);
        content.classList.remove('d-none')
        document.getElementById(area + 'Show').style = 'animation: dropdown 2s ease;'
        document.getElementById(`arrow${bigArea}`).style = 'animation: arrowUp 350ms ease; transform: rotate(180deg);'
        document.getElementById(`select${bigArea}`).setAttribute('onclick', `dropup('${area}')`);
        document.getElementById(`arrow${bigArea}`).setAttribute('onclick', `dropup('${area}')`);
        checkForSelectedContacts(i)
    }
}

/**
 * 
 * This function is used to close the drop down menu
 * 
 * @param {string} area 
 */
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

/**
 * 
 * This function is used to 
 * 
 * @param {string} content 
 */
function editEndHeight(content) {
    document.documentElement.style.setProperty('--end-height', content.clientHeight + 'px')
}

/**
 * 
 * This function is used to add contacts to the task
 * 
 * @param {number} j 
 * @param {number} i 
 */
async function addContactToList(j, i) {
    if (document.getElementById(`cb-contacts-${j}`).checked) {
        tasks[i].contactSelection.push(contacts[j].ID)
        await backend.setItem(`tasks`, JSON.stringify(tasks));
    } else {
        let index = tasks[i].contactSelection.indexOf(contacts[j].ID)
        tasks[i].contactSelection.splice(index, 1)
        await backend.setItem(`tasks`, JSON.stringify(tasks));
    }
}


/*********Drag and Drop Function************/


/**
 * 
 * This function is used to get the dragged Element in a parameter
 * 
 * @param {string} id 
 */
function dragstart_handler(id) {
    currentDraggedElement = id
}

/**
 * 
 * This function is used to stop events while dragging
 * 
 * @param {string} ev 
 */
function dragover_handler(ev) {
    ev.preventDefault();
}

/**
 * 
 * This function is used to drop tasks in a new area
 * 
 * @param {string} status 
 */
async function drop_handler(status) {
    tasks[currentDraggedElement].status = status;
    await backend.setItem(`tasks`, JSON.stringify(tasks));
    loadTasks()
}

/**
 * 
 * This function is used to highlight the areas where tasks can be dropped
 * 
 * @param {string} id 
 */
function highlightArea(id) {
    let container = document.getElementById(id)
    container.classList.remove('d-none')
    let toDoContainer = document.getElementById('to-do-container')
    if (toDoContainer.innerHTML.length == 0) {
        toDoContainer.classList.remove('min-height')
    }
    console.log(toDoContainer.innerHTML.length)
}

/**
 * 
 * This function is used to remove the highlited areas
 * 
 * @param {string} id 
 */
function removeHighlightArea(id) {
    let container = document.getElementById(id)
    container.classList.add('d-none')
}

/**
 * 
 * This function is used to highlight the areas where tasks can be dropped
 * 
 * @param {number} id 
 */
function highliteDragArea(id) {
    let container = document.getElementById(id)
    container.classList.remove('d-none')
}

/**
 * 
 * This function is used to remove the highlited areas
 * 
 * @param {string} id 
 */
function removeHighlightDragArea(id) {
    let container = document.getElementById(id)
    container.classList.add('d-none')

}

/**
 * 
 * This function is used to hide and make visible the date icon
 * 
 */
function hideIcon() {
    let content = document.getElementById('edit-task-date-icon')
    if (!content.classList.contains('d-none')) {
        content.classList.add('d-none')
    } else if (content.classList.contains('d-none')) {
        content.classList.remove('d-none')
    }
}

/*
function removeTest(id) {
    console.log("testtest")
    let element = document.getElementById(id)
    let targetContainer = element.parentElement.parentElement.parentElement.children
    for (let i = 0; i < targetContainer.length; i++) {
        targetContainer[i].lastElementChild.classList.add('d-none')
    }
}
*/