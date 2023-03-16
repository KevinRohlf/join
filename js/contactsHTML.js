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


function htmlTemplateEditSingleContact(contact, i) {
    return /*html*/ `
    <div class="contact-field">
        <div class="contact-user-icon">
            <div class="initial-circle big-circle" style="background-color: ${contact['color']};">
                ${contact['initials']}
            </div>
        </div>
        <div>
            <a onclick="editContactClose()" class="contact-close">
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.9616 7.65393L7.65388 22.9617" stroke="#2A3647" stroke-width="2"
                        stroke-linecap="round" />
                    <path d="M22.8172 23.1061L7.50941 7.79832" stroke="#2A3647" stroke-width="2"
                        stroke-linecap="round" />
                </svg>
            </a>
            <form onsubmit="saveActiveContact(${i})">
                <div class="contact-form">
                    <div class="input-container">
                        <img src="./assets/img/name-icon.svg">
                        <input type="text" value="${contact['name']}" id="edit-name" class="input" required>
                    </div>
                    <div class="input-container">
                        <img src="./assets/img/email-icon.svg">
                        <input type="email" value="${contact['email']}" id="edit-email" class="input" required>
                    </div>
                    <div class="input-container">
                        <img src="./assets/img/phone-icon.svg">
                        <input type="tel" value="${contact['phone']}" id="edit-phone" pattern="^[+]?[0-9]{4,20}$"
                        class="input" required>
                    </div>
                </div>
                <div class="submit-container">
                    <button onclick="delateActiveContact(${i})" class="submit-btn cancel">Delete</button>
                    <button type="submit" class="submit-btn save">Save</button>
                </div>
            </form>
        </div>
    </div>
`;
}