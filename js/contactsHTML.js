function htmlTemplateRenderAllContacts(contact, i) {
    return /*html*/ `
    <div onclick="renderSingleContact(${i}); doNotClose(event)" class="contact" tabindex="0">
        <div class="initial-circle" style="background-color: ${contact['color']};">
            ${contact['initials']}
        </div>
        <div>
            <p>${contact['name']}</p>
            <a href="mailto:${contact['email']}">${contact['email']}</a>
        </div>
    </div>	
    `;
}


function htmlTemplateRenderSingleContact(contact, i) {
    return /*html*/ `
    <div>
        <div class="single-contact-name">
            <div class="initial-circle big-circle" style="background-color: ${contact['color']};">
                ${contact['initials']}
            </div>
            <div class="single-contact-task">
                <p>${contact['name']}</p>
                <a href="#"><img src="./assets/img/plus-blue-icon.svg">Add Task</a>
            </div>
        </div>
        <div class="single-contact-edit">
            <p>Contact Information</p>
            <a href="#" onclick="editContactOpen(${i})"><img src="./assets/img/pen-icon.svg">Edit Contact</a>
        </div>
        <div class="single-contact-contact">
            <p>Email</p>
            <a href="mailto:${contact['email']}">${contact['email']}</a>
            <p>Phone</p>
            <span>${contact['phone']}</span>
        </div>
    </div>
`;
}


function htmlTemplateEditSingleContact(contact) {
    return /*html*/ `
    <div class="input-container">
        <img src="./assets/img/name-icon.svg">
        <input type="text" value="${contact['name']}" id="name" class="input" required>
    </div>
    <div class="input-container">
        <img src="./assets/img/email-icon.svg">
        <input type="email" value="${contact['email']}" id="email" class="input" required>
    </div>
    <div class="input-container">
        <img src="./assets/img/phone-icon.svg">
        <input type="tel" value="${contact['phone']}" id="phone" pattern="^[+]?[0-9]{4,20}$"
            class="input" required>
    </div>
`;
}