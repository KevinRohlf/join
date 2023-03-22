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
/*
function init() {
    setURL('http://f01545d7@wilhelm-teicke.developerakademie.net/smallest_backend_ever');
    loadBackend();
}


async function loadBackend() {
  
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    backend.setItem('Test', 'Hallo')
}
*/

















let currentDraggedElement;

function loadTasks() {
    document.getElementById('to-do-container').innerHTML = ''
    document.getElementById('in-progress-container').innerHTML = ''
    document.getElementById('awaiting-feedback-container').innerHTML = ''
    document.getElementById('done-container').innerHTML = ''
    renderTasks()
}


function renderTasks() {
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
        renderTaskCategoryColor(i)
        i++

    });
}



function renderAllTasks(element, content, i) {
    content.innerHTML +=
        /*html*/ `
        <div id="${i}" class="board-content" draggable="true" ondragstart="dragstart_handler(${i})">
            <div class="task-category">${element.category}</div>
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
    container.classList.add('drag-area-highlight')
}

function removeHighlightArea(id) {
    let container = document.getElementById(id)
    container.classList.remove('drag-area-highlight')
}

