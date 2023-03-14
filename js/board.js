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
        'prio': 'Very High',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Awaiting Feedback',
        'title': 'Accounting invoices',
        'description': 'Write open invoices for customer',
        'category': 'Backoffice',
        'contactSelection': ['CB', 'PE'],
        'date': 'xxx',
        'prio': 'Very High',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Done',
        'title': 'Social media strategy',
        'description': 'Develope an ad campaign for brand positioning',
        'category': 'Marketing',
        'contactSelection': ['KR', 'PE'],
        'date': 'xxx',
        'prio': 'Very High',
        'subtasks': 'xxx'
    },
    {
        'task_status': 'Awaiting Feedback',
        'title': 'Video Cut',
        'description': 'Edit the new company video',
        'category': 'Media',
        'contactSelection': ['KR', 'PE'],
        'date': 'xxx',
        'prio': 'Very High',
        'subtasks': 'xxx'
    },



]


function loadTasks() {
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
        i++
    });
}



function renderAllTasks(element, content, i) {
    content.innerHTML +=
        /*html*/ `
        <div id="${i}" class="board-content" draggable="true" ondragstart="dragstart_handler(event)">
            <div>${element.category}</div>
            <div>${element.title}</div>
            <div>${element.description}</div>
            <div id="contact-selection-${element.task_status}_${i}"></div>
        </div>
        `
}



function renderContactSelection(element, i) {
    element.contactSelection.forEach(contact => {
        document.getElementById(`contact-selection-${element.task_status}_${i}`).innerHTML +=
        /*html*/ `
        <div>${contact}</div>
        `
    });
}


function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
}
function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}
function drop_handler(ev) {
    // console.log(window)
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
  /*  if (!ev.target.getAttribute("ondrop")) {
        console.log("Test")
        return false;
    }*/
    const data = ev.dataTransfer.getData("text");
    document.getElementById('in-progress-container').appendChild(document.getElementById(data));
}

/*
window.addEventListener('mouseover', (event) => {
    console.log(event)
})
*/








/*

function renderToDo(element) {
    
    let content = document.getElementById('to-do-container')
    content.innerHTML +=
         `    
            <div>${element.category}</div>
            <div>${element.title}</div>
            <div>${element.description}</div>
            <div id="contact-selection-${element.task_status}"></div>
        `
}


function renderInProgress(element) {
    let content = document.getElementById('in-progress-container')
    content.innerHTML +=
        `    
            <div>${element.category}</div>
            <div>${element.title}</div>
            <div>${element.description}</div>
            <div id='contact-selection-${element.task_status}'></div>
        `
}


function renderAwaitingFeedback(element) {
    let content = document.getElementById('awaiting-feedback-container')
    content.innerHTML +=
        `    
            <div>${element.category}</div>
    
        `
}


function renderDone(element) {
    let content = document.getElementById('done-container')
    content.innerHTML +=
         `    
            <div>${element.category}</div>
    
        `
}

*/