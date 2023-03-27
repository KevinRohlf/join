let task = [
    {
        'task_status': 'To do',
        'title': 'Website redesign',
        'description': 'Modify the contents of the main website...',
        'category': 'Design',
        'contactSelection': ['WT', 'KR', 'CB', 'PE'],
        'date': 'xxx',
        'prio': 'Low',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'In progress',
        'title': 'Call potential clients',
        'description': 'Make the product presentation to prospect buyers',
        'category': 'Sales',
        'contactSelection': ['KR', 'CB', 'PE'],
        'date': 'xxx',
        'prio': 'Urgent',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Awaiting Feedback',
        'title': 'Accounting invoices',
        'description': 'Write open invoices for customer',
        'category': 'Backoffice',
        'contactSelection': ['CB', 'PE'],
        'date': 'xxx',
        'prio': 'Medium',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Done',
        'title': 'Social media strategy',
        'description': 'Develope an ad campaign for brand positioning',
        'category': 'Marketing',
        'contactSelection': ['KR', 'PE'],
        'date': 'xxx',
        'prio': 'Medium',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Awaiting Feedback',
        'title': 'Video Cut',
        'description': 'Edit the new company video',
        'category': 'Media',
        'contactSelection': ['KR', 'PE', 'KR', 'KR', 'KR', 'KR'],
        'date': 'xxx',
        'prio': 'Low',
        'subtasks': 'xxx'
    },
]

let usersFromLocal = []
let currentTasks = []
let p = 0



async function loadBackend() {
    setURL('https://gruppenarbeit-479-join.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    loadUsersFromStorage()
    loadTasks()
}


function loadUsersFromStorage() {
    usersFromLocal = JSON.parse(localStorage.getItem('users')) || [];
    console.log(usersFromLocal)
    currentTasks =  usersFromLocal[0].user_1[0].tasks
    console.log(currentTasks)
    for (let k = 0; k < currentTasks.length; k++) {
        console.log(currentTasks[k])
    }
}


let currentDraggedElement;

function loadTasks() {
    document.getElementById('to-do-container').innerHTML = ''
    document.getElementById('in-progress-container').innerHTML = ''
    document.getElementById('awaiting-feedback-container').innerHTML = ''
    document.getElementById('done-container').innerHTML = ''
    renderTasks()
}


function renderTasks() {
   // for (let j = 0; i < users[p].)
    let i = 0
    task.forEach(element => {
        if (element.task_status == 'To do') {
            // renderToDo(element)
            // renderContactSelection(element)
            let content = document.getElementById('to-do-container')
            renderAllTasks(element, content, i)
            renderContactSelection(element, i)
        } else if (element.task_status == 'In progress') {
            // renderInProgress(element)
            // renderContactSelection(element)
            let content = document.getElementById('in-progress-container')
            renderAllTasks(element, content, i)
            renderContactSelection(element, i)
        } else if (element.task_status == 'Awaiting Feedback') {
            // renderAwaitingFeedback(element)
            let content = document.getElementById('awaiting-feedback-container')
            renderAllTasks(element, content, i)
            renderContactSelection(element, i)
        } else if (element.task_status == 'Done') {
            // renderDone(element)
            let content = document.getElementById('done-container')
            renderAllTasks(element, content, i)
            renderContactSelection(element, i)
        }
       // renderTaskCategoryColor(i)
        i++

    });
}



function renderAllTasks(element, content, i) {
    content.innerHTML +=
        /*html*/ `
        <div id="${i}" class="board-content" draggable="true" onclick="loadCard(${i})" ondragstart="dragstart_handler(${i})"  ondragend="removeTest(${i})">
            <div class="task-category ${element.category}">${element.category}</div>
            <div class="task-title">${element.title}</div>
            <div class="task-description">${element.description}</div>
            <div class="prio-and-contact-container">
                <div class="contact-selection" id="contact-selection-${element.task_status}_${i}"></div>
                <div id="${element.prio}_${i}"></div>
            </div>
            
        </div>
        `
    getPrioImage(element, i)
}


function renderContactSelection(element, i) {
    for (let k = 0; k < element.contactSelection.length; k++) {
        if (element.contactSelection.length <= 3) {
            document.getElementById(`contact-selection-${element.task_status}_${i}`).innerHTML +=
            /*html*/ `
            <div>${element.contactSelection[k]}</div>
            `
        } else {
            if (k < 2) {
                document.getElementById(`contact-selection-${element.task_status}_${i}`).innerHTML +=
                /*html*/ `
                <div>${element.contactSelection[k]}</div>
                `
            } else {
                document.getElementById(`contact-selection-${element.task_status}_${i}`).innerHTML +=
                /*html*/ `
                <div>${'+' + (element.contactSelection.length - 2)}</div>
                `
                break
            }
        }

    }
    /*  element.contactSelection.forEach(contact => {
          document.getElementById(`contact-selection-${element.task_status}_${i}`).innerHTML +=
          `
          <div>${contact}</div>
          `*/
    randomBackgroundColor(element, i)
    //});
}

/*
function renderTaskCategoryColor(i) {
    let content = document.getElementById(`${i}`)
    if (content.firstElementChild.textContent == 'Design') {
        content.firstElementChild.classList.add('design')
    } else if (content.firstElementChild.textContent == 'Sales') {
        content.firstElementChild.classList.add('sales')
    } else if (content.firstElementChild.textContent == 'Backoffice') {
        content.firstElementChild.classList.add('backoffice')
    } else if (content.firstElementChild.textContent == 'Marketing') {
        content.firstElementChild.classList.add('marketing')
    } else if (content.firstElementChild.textContent == 'Media') {
        content.firstElementChild.classList.add('media')
    }
}
*/

function loadCard(i) {
    let overlay = document.getElementById('overlay')
    overlay.classList.remove('d-none')
    renderCard(i, overlay)
   // renderCardCategoryColor()
    renderCardContacts(i)
    getCardPrioImg(i)
}


function renderCard(i) {
    overlay.innerHTML =
    /*html*/ `
        <div id="card-container" class="d-none" onclick="stopPropagation(event)">
            <div class="card-close-icon-container">
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="closeCard()">
                    <path d="M22.9614 7.65381L7.65367 22.9616" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    <path d="M22.8169 23.106L7.50914 7.7982" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="task-category ${task[i].category}" style="font-size: 27px;">${task[i].category}</div>
            <div class="card-title">${task[i].title}</div>
            <div class="card-description">${task[i].description}</div>
            <div class="card-date-container">
                <p>Due date:</p>
                <p>${task[i].date}</p>
            </div>
            <div class="card-prio-container">
                <p>Priority:</p>
                <p class="card-prio" id="card-${task[i].prio}">${task[i].prio}</p>
            </div>
            <div>
                <p style="font-weight: 700; font-size: 21px">Assigned to:</p>
                <div id="contact-card-container"></div>
            </div>
            <div class="edit-task-container">
                <div>
                    <svg width="21" height="31" viewBox="0 0 21 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.94494 22.5155L7.76427 25.4404L20.4074 4.60829C20.694 4.13616 20.5435 3.52113 20.0714 3.23459L16.9618 1.34736C16.4897 1.06082 15.8746 1.21127 15.5881 1.6834L2.94494 22.5155Z" fill="white"/>
                    <path d="M2.35987 23.4792L7.1792 26.4041L2.45058 28.6889L2.35987 23.4792Z" fill="white"/>
                    </svg>
                </div>
            </div>
        </div>
    `
    document.getElementById('card-container').classList.remove('d-none')
}


function stopPropagation(event) {
    event.stopPropagation();
}


function closeCard() {
    document.getElementById('card-container').classList.add('d-none')
    document.getElementById('overlay').classList.add('d-none')
}
/*
function renderCardCategoryColor() {
    let content = document.getElementById('card-container')
    if (content.firstElementChild.textContent == 'Design') {
        content.firstElementChild.classList.add('design')
    } else if (content.firstElementChild.textContent == 'Sales') {
        content.firstElementChild.classList.add('sales')
    } else if (content.firstElementChild.textContent == 'Backoffice') {
        content.firstElementChild.classList.add('backoffice')
    } else if (content.firstElementChild.textContent == 'Marketing') {
        content.firstElementChild.classList.add('marketing')
    } else if (content.firstElementChild.textContent == 'Media') {
        content.firstElementChild.classList.add('media')
    }
}
*/
function renderCardContacts(i) {
    let container = document.getElementById('contact-card-container')
    task[i].contactSelection.forEach(element => {
        container.innerHTML +=
       /*html*/ `
       <div class="contact-card-content">
            <p style="background-color:red">${element}</p>
            <p>Name</p>
        </div>
       `
    });
}


function randomBackgroundColor(element, i) {
    let children = document.getElementById(`contact-selection-${element.task_status}_${i}`).children
    for (let j = 0; j < children.length; j++) {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        let bgColor = 'rgb(' + r + ',' + g + ',' + b + ')'
        children[j].style.backgroundColor = bgColor
    }
}


function getPrioImage(element, i) {
    let content = document.getElementById(`${element.prio}_${i}`)
    if (content.id == `Low_${i}`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-low.svg'
        content.appendChild(img)
    } else if (content.id == `Medium_${i}`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-medium.svg'
        content.appendChild(img)
    } else if (content.id == `Urgent_${i}`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-urgent.svg'
        content.appendChild(img)
    }
}


function getCardPrioImg(i) {
    let content = document.getElementById(`card-${task[i].prio}`)
    if (content.id == `card-Low`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-low copy.svg'
        content.appendChild(img)
    } else if (content.id == `card-Medium`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-medium copy.svg'
        content.appendChild(img)
    } else if (content.id == `card-Urgent`) {
        let img = document.createElement('img')
        img.src = 'assets/img/prio-urgent copy.svg'
        content.appendChild(img)
    }
}


function searchTasks() {
    let input = document.getElementById('find-task-input')
    for (let i = 0; i < task.length; i++) {
        let content = document.getElementById(`${i}`)
        if ((task[i].title.toLowerCase().includes(input.value.toLowerCase()))) {
            content.classList.remove('d-none')
        } else if ((task[i].description.toLowerCase().includes(input.value.toLowerCase()))) {
            content.classList.remove('d-none')
        } else {
            content.classList.add('d-none')
        }
    }
}


function dragstart_handler(id) {
    currentDraggedElement = id
    // id.dataTransfer.setDragImage(image, xOffset, yOffset);

}


function dragover_handler(ev) {
    ev.preventDefault();
}


function drop_handler(task_status) {
    task[currentDraggedElement].task_status = task_status;
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
