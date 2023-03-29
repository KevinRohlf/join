let task = [
    {
        'task_status': 'To do',
        'title': 'Website redesign',
        'description': 'Modify the contents of the main website...',
        'category': 'Design',
        'contactSelection': ['WT', 'KR', 'CB', 'PE'],
        'date': '22/02/2022',
        'prio': 'Low',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'In progress',
        'title': 'Call potential clients',
        'description': 'Make the product presentation to prospect buyers',
        'category': 'Sales',
        'contactSelection': ['KR', 'CB', 'PE'],
        'date': '11/11/2011',
        'prio': 'Urgent',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Awaiting Feedback',
        'title': 'Accounting invoices',
        'description': 'Write open invoices for customer',
        'category': 'Backoffice',
        'contactSelection': ['CB', 'PE'],
        'date': '01/01/2024',
        'prio': 'Medium',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Done',
        'title': 'Social media strategy',
        'description': 'Develope an ad campaign for brand positioning',
        'category': 'Marketing',
        'contactSelection': ['KR', 'PE'],
        'date': '13/12/2023',
        'prio': 'Medium',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Awaiting Feedback',
        'title': 'Video Cut',
        'description': 'Edit the new company video',
        'category': 'Media',
        'contactSelection': ['KR', 'PE', 'KR', 'KR', 'KR', 'KR'],
        'date': '29/03/2023',
        'prio': 'Low',
        'subtasks': 'xxx'
    },
]

let usersFromLocal = []
let currentTasks = []
let p = 0
let inAnimation = false;


async function loadBackend() {
    /*  setURL('https://gruppenarbeit-479-join.developerakademie.net/smallest_backend_ever');
      await downloadFromServer();
      users = JSON.parse(backend.getItem('users')) || [];
      loadUsersFromStorage()*/
    loadTasks()
}


function loadUsersFromStorage() {
    usersFromLocal = JSON.parse(localStorage.getItem('users')) || [];
    console.log(usersFromLocal)
    currentTasks = usersFromLocal[0].user_1[0].tasks
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
    if (window.innerWidth < 1000) {
        main.classList.add('d-none')
    }
    body.classList.add('overflow-hidden')
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
                <svg id="cross-svg" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="closeCard()">
                    <path d="M22.9614 7.65381L7.65367 22.9616" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                    <path d="M22.8169 23.106L7.50914 7.7982" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <div>   
                    <svg id="arrow-svg" class="d-none" width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.06825 9.95833H23.2917C24.1432 9.95833 24.8334 10.6486 24.8334 11.5C24.8334 12.3514 24.1432 13.0417 23.2917 13.0417H6.06825L13.2478 20.2212C13.8498 20.8232 13.8498 21.7992 13.2478 22.4011C12.6458 23.0031 11.6698 23.0031 11.0679 22.4011L1.58096 12.9142C0.799914 12.1332 0.799913 10.8668 1.58096 10.0858L11.0679 0.59887C11.6698 -0.00309756 12.6458 -0.00309813 13.2478 0.598869C13.8498 1.20084 13.8498 2.17682 13.2478 2.77879L6.06825 9.95833Z" fill="black"/>
                    </svg>
                </div>
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
                <div onclick="loadEditTask(${i})">
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
    body.classList.remove('overflow-hidden')
    document.getElementById('card-container').classList.add('d-none')
    document.getElementById('overlay').classList.add('d-none')
    if (window.innerWidth < 1000) {
        main.classList.remove('d-none')
    }
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


function loadEditTask(i) {
    renderEditTask(i)
    renderContacts(i);
    renderCardContacts(i)
    highlightPrio(i)
}


function renderEditTask(i) {
    let content = document.getElementById('card-container')
    content.innerHTML =
    /*html*/ `
    <div>
        <div></div>
        <form class="edit-task-form"; onsubmit="return false;">
            <div>
                <p>Title</p>
                <input type="text" placeholder="${task[i].title}" id="edit-task-title">
            </div>
            <div>
                <p>Description</p>
                <input type="textarea" placeholder="${task[i].description}" id="edit-task-description">
            </div>
            <div class="edit-task-date-container">
                <p>Due Date</p>
                <input type="text" placeholder="${task[i].date}" onfocus="(this.type='date')" onblur="(this.type='text')" id="edit-task-date">
                <div class="edit-task-date-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.8334 2.49984H22.3335C22.6429 2.49984 22.9397 2.62275 23.1584 2.84155C23.3772 3.06034 23.5002 3.35708 23.5002 3.6665V22.3332C23.5002 22.6426 23.3772 22.9393 23.1584 23.1581C22.9397 23.3769 22.6429 23.4998 22.3335 23.4998H1.66667C1.35725 23.4998 1.0605 23.3769 0.841709 23.1581C0.622916 22.9393 0.5 22.6426 0.5 22.3332V3.6665C0.5 3.35708 0.622916 3.06034 0.841709 2.84155C1.0605 2.62275 1.35725 2.49984 1.66667 2.49984H6.16674V1.1665C6.16674 0.614219 6.61446 0.166504 7.16674 0.166504H7.50008C8.05236 0.166504 8.50007 0.614219 8.50007 1.1665V2.49984H15.5001V1.1665C15.5001 0.614219 15.9478 0.166504 16.5001 0.166504H16.8334C17.3857 0.166504 17.8334 0.614219 17.8334 1.1665V2.49984ZM2.50016 8.99984V21.4998H21.5002V8.99984H2.50016ZM5.00005 15.1665C5.00006 14.6142 5.44778 14.1665 6.00005 14.1665H9.83341C10.3857 14.1665 10.8334 14.6142 10.8334 15.1665V16.4998C10.8334 17.0521 10.3857 17.4998 9.83341 17.4998H6.00002C5.44773 17.4998 5.00001 17.0521 5.00002 16.4998L5.00005 15.1665Z" fill="black"/>
                    </svg>
                </div>
            </div>
            <div>
                <p>Prio</p>
                <div class="edit-task-prio-container" >
                    <div id="prio-area-urgent" onclick="changePrio(${i}, 'Urgent')">
                    <p>Urgent</p>
                        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_39163_1044)">
                                <path d="M18.9043 14.7547C18.6696 14.7551 18.4411 14.6803 18.2522 14.5412L10.0001 8.458L1.74809 14.5412C1.63224 14.6267 1.50066 14.6887 1.36086 14.7234C1.22106 14.7582 1.07577 14.7651 0.933305 14.7437C0.790837 14.7223 0.653973 14.6732 0.530528 14.599C0.407083 14.5247 0.299474 14.427 0.213845 14.3112C0.128216 14.1954 0.0662437 14.0639 0.0314671 13.9243C-0.00330956 13.7846 -0.0102098 13.6394 0.0111604 13.497C0.0543195 13.2095 0.21001 12.9509 0.443982 12.7781L9.34809 6.20761C9.53679 6.06802 9.76536 5.99268 10.0001 5.99268C10.2349 5.99268 10.4635 6.06802 10.6522 6.20761L19.5563 12.7781C19.7422 12.915 19.8801 13.1071 19.9503 13.327C20.0204 13.5469 20.0193 13.7833 19.9469 14.0025C19.8746 14.2216 19.7349 14.4124 19.5476 14.5475C19.3604 14.6826 19.1352 14.7551 18.9043 14.7547Z" fill="#FF3D00"/>
                                <path d="M18.9043 9.00568C18.6696 9.00609 18.4411 8.93124 18.2522 8.79214L10.0002 2.70898L1.7481 8.79214C1.51412 8.96495 1.22104 9.0378 0.93331 8.99468C0.645583 8.95155 0.386785 8.79597 0.213849 8.56218C0.0409137 8.32838 -0.0319941 8.03551 0.011165 7.74799C0.054324 7.46048 0.210015 7.20187 0.443986 7.02906L9.3481 0.458588C9.5368 0.318997 9.76537 0.243652 10.0002 0.243652C10.2349 0.243652 10.4635 0.318997 10.6522 0.458588L19.5563 7.02906C19.7422 7.16598 19.8801 7.35809 19.9503 7.57797C20.0204 7.79785 20.0193 8.03426 19.947 8.25344C19.8746 8.47262 19.7349 8.66338 19.5476 8.79847C19.3604 8.93356 19.1352 9.00608 18.9043 9.00568Z" fill="#FF3D00"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_39163_1044">
                                    <rect width="20" height="14.5098" fill="white" transform="translate(0 0.245117)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div id="prio-area-medium" onclick="changePrio(${i}, 'Medium')">
                    <p>Medium</p>
                        <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_39163_1051)">
                                <path d="M18.9041 8.22528H1.09589C0.805242 8.22528 0.526498 8.10898 0.320979 7.90197C0.11546 7.69495 0 7.41419 0 7.12143C0 6.82867 0.11546 6.5479 0.320979 6.34089C0.526498 6.13388 0.805242 6.01758 1.09589 6.01758H18.9041C19.1948 6.01758 19.4735 6.13388 19.679 6.34089C19.8845 6.5479 20 6.82867 20 7.12143C20 7.41419 19.8845 7.69495 19.679 7.90197C19.4735 8.10898 19.1948 8.22528 18.9041 8.22528Z" fill="#FFA800"/>
                                <path d="M18.9041 2.98211H1.09589C0.805242 2.98211 0.526498 2.86581 0.320979 2.6588C0.11546 2.45179 0 2.17102 0 1.87826C0 1.5855 0.11546 1.30474 0.320979 1.09772C0.526498 0.890712 0.805242 0.774414 1.09589 0.774414L18.9041 0.774414C19.1948 0.774414 19.4735 0.890712 19.679 1.09772C19.8845 1.30474 20 1.5855 20 1.87826C20 2.17102 19.8845 2.45179 19.679 2.6588C19.4735 2.86581 19.1948 2.98211 18.9041 2.98211Z" fill="#FFA800"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_39163_1051">
                                    <rect width="20" height="7.45098" fill="white" transform="translate(0 0.774414)"/>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <div id="prio-area-low" onclick="changePrio(${i}, 'Low')">
                    <p>Low</p>
                        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 9.00614C9.7654 9.00654 9.53687 8.9317 9.34802 8.79262L0.444913 2.22288C0.329075 2.13733 0.231235 2.02981 0.15698 1.90647C0.0827245 1.78313 0.033508 1.64638 0.0121402 1.50404C-0.031014 1.21655 0.0418855 0.923717 0.214802 0.689945C0.387718 0.456173 0.646486 0.300615 0.934181 0.257493C1.22188 0.21437 1.51493 0.287216 1.74888 0.460004L10 6.54248L18.2511 0.460004C18.367 0.374448 18.4985 0.312529 18.6383 0.277782C18.7781 0.243035 18.9234 0.236141 19.0658 0.257493C19.2083 0.278844 19.3451 0.328025 19.4685 0.402225C19.592 0.476425 19.6996 0.574193 19.7852 0.689945C19.8708 0.805697 19.9328 0.937168 19.9676 1.07685C20.0023 1.21653 20.0092 1.36169 19.9879 1.50404C19.9665 1.64638 19.9173 1.78313 19.843 1.90647C19.7688 2.02981 19.6709 2.13733 19.5551 2.22288L10.652 8.79262C10.4631 8.9317 10.2346 9.00654 10 9.00614Z" fill="#7AE229"/>
                            <path d="M10 14.7547C9.7654 14.7551 9.53687 14.6802 9.34802 14.5412L0.444913 7.97142C0.210967 7.79863 0.0552944 7.54005 0.0121402 7.25257C-0.031014 6.96509 0.0418855 6.67225 0.214802 6.43848C0.387718 6.20471 0.646486 6.04915 0.934181 6.00603C1.22188 5.96291 1.51493 6.03575 1.74888 6.20854L10 12.291L18.2511 6.20854C18.4851 6.03575 18.7781 5.96291 19.0658 6.00603C19.3535 6.04915 19.6123 6.20471 19.7852 6.43848C19.9581 6.67225 20.031 6.96509 19.9879 7.25257C19.9447 7.54005 19.789 7.79863 19.5551 7.97142L10.652 14.5412C10.4631 14.6802 10.2346 14.7551 10 14.7547Z" fill="#7AE229"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div>
                <p>Assigned to</p>
                <div id="contactShow" class="dropdown">
                    <div onclick="dropdown('contact')" class="flex gap-10" id="selectContact">
                        Select contacts to assign
                    </div>
                    <div id="contact" class="flex-column d-none">
                    </div>
                        <img class="arrow" id="arrowContact" src="./assets/img/arrow-down.svg">
                </div>
            </div>
            <div id="contact-card-container">
            </div>
            <div class="edit-task-btn-container">
            <button id="edit-task-btn" onclick="closeForm(${i})">
                <p>OK</p>
                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.5L7 13.5L17 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            </div>
        </form>
    </div>
    `
}


function changePrio(i, prio) {
    task[i].prio = `${prio}`
    highlightPrio(i) 
}


function closeForm(i) {
    updateInput(i)
    closeCard()
    loadTasks()
}


function updateInput(i) {
    let inputTitle = document.getElementById('edit-task-title')
    let inputDescription = document.getElementById('edit-task-description')
    let inputDate = document.getElementById('edit-task-date')
    task[i].title = inputTitle.value
    task[i].description = inputDescription.value
    task[i].date = inputDate.value
}


function highlightPrio(i) {
    if (task[i].prio == 'Low') {
        let content = document.getElementById('prio-area-low')
        content.style = 'background-color:#7AE229'
        let text = content.children[0]
        let svgPath1 = content.children[1].children[0]
        let svgPath2 = content.children[1].children[1]
        text.style.color = '#FFFFFF'
        svgPath1.style.fill = '#FFFFFF'
        svgPath2.style.fill = '#FFFFFF'
    } else {
        let content = document.getElementById('prio-area-low')
        content.style = 'background-color:#FFFFFF'
        let text = content.children[0]
        let svgPath1 = content.children[1].children[0]
        let svgPath2 = content.children[1].children[1]
        text.style.color = '#7AE229'
        svgPath1.style.fill = '#7AE229'
        svgPath2.style.fill = '#7AE229'
    }
    if (task[i].prio == 'Medium') {
        let content = document.getElementById('prio-area-medium')
        content.style = 'background-color:#FFA800'
        let text = content.children[0]
        let svgPath1 = content.children[1].children[0].children[0]
        let svgPath2 = content.children[1].children[0].children[1]
        text.style.color = '#FFFFFF'
        svgPath1.style.fill = '#FFFFFF'
        svgPath2.style.fill = '#FFFFFF'
    } else {
        let content = document.getElementById('prio-area-medium')
        content.style = 'background-color:#FFFFFF'
        let text = content.children[0]
        let svgPath1 = content.children[1].children[0].children[0]
        let svgPath2 = content.children[1].children[0].children[1]
        text.style.color = '#FFA800'
        svgPath1.style.fill = '#FFA800'
        svgPath2.style.fill = '#FFA800'
    }
    if (task[i].prio == 'Urgent') {
        let content = document.getElementById('prio-area-urgent')
        content.style = 'background-color:#FF3D00'
        let text = content.children[0]
        let svgPath1 = content.children[1].children[0].children[0]
        let svgPath2 = content.children[1].children[0].children[1]
        text.style.color = '#FFFFFF'
        svgPath1.style.fill = '#FFFFFF'
        svgPath2.style.fill = '#FFFFFF'
    } else {
        let content = document.getElementById('prio-area-urgent')
        content.style = 'background-color:#FFFFFF'
        let text = content.children[0]
        let svgPath1 = content.children[1].children[0].children[0]
        let svgPath2 = content.children[1].children[0].children[1]
        text.style.color = '#FF3D00'
        svgPath1.style.fill = '#FF3D00'
        svgPath2.style.fill = '#FF3D00'
    }
}
/*
function clearIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

*/


/*********Edit Task Dropdown Menu************/


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


function renderContacts(i) {
    let contacts = task[i].contactSelection
    let content = document.getElementById('contact');
    content.innerHTML = '';
    for (let j = 0; j < contacts.length; j++) {
        let contact = contacts[j];
        content.innerHTML += `<label for="cb-subtask-${j}"> <div class="contacts">${contact} <input onclick="addContactToList(${j})" id="cb-subtask-${j}" class="subtask-checkbox" type="checkbox" control-id="ControlID-12"></div></label>`
        if (j == contacts.length - 1) {
            let j = contacts.length
            content.innerHTML += `<label for="cb-subtask-${j}"> <div class="contacts">Intive new contact <input onclick="addContactToList(${j})" id="cb-subtask-${j}" class="subtask-checkbox" type="checkbox" control-id="ControlID-12"></div></label>`
        }
    }
}


function editEndHeight(content) {
    document.documentElement.style.setProperty('--end-height', content.clientHeight + 'px')
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
            let color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            content.innerHTML += `<div class="circle" style="background-color: ${color.toUpperCase()};": >${selectedContacts[i]}</div>`
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