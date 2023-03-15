let allContacts = [];

function loadAllContacts() {
	let allContactsAsString = localStorage.getItem('allContacts');

	if (allContactsAsString) {
		allContacts = JSON.parse(allContactsAsString);
	}

	renderAllContacts();
}


function renderAllContacts() {
	let contactsContent = document.getElementById('contacts');
    contactsContent.innerHTML = '';

    for (let i = 0; i < allContacts.length; i++) {
		const contact = allContacts[i];
		contactsContent.innerHTML +=  htmlTemplateRenderAllContacts(contact, i);
    }
}


/* new contact */
function addToContact() {
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let phone = document.getElementById('phone').value;
	let initials = getInitials(name);
	let initialColor = getColor();

	let contact = {
		'name': name,
		'email': email,
		'phone': phone,
		'initials': initials,
		'color': initialColor
	};

	allContacts.push(contact);

	clearInput();
	saveAllContacts();
	renderAllContacts();
}


function getInitials(fullName) {
	let names = fullName.toString().split(' '),
			initials = names[0].substring(0, 1).toUpperCase();
		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
}


function getColor() {
	return (
	  "#" + Math.random().toString(16).slice(2, 8)
	);
  }


function clearInput() {
	document.getElementById('name').value = '';
	document.getElementById('email').value = '';
	document.getElementById('phone').value = '';
}


function saveAllContacts() {
	let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);
}


/* show single contact */
let singleContactOverlay = document.getElementById('single-contact-overlay');
let contactContent = document.getElementById('show-contact');

function renderSingleContact(i) {
	let contact = allContacts[i];
	contactContent.innerHTML = '';
	singleContactOverlay.style.display = 'flex';
	contactContent.style = 'animation:slide-in .5s ease;';
	contactContent.innerHTML += htmlTemplateRenderSingleContact(contact, i);
}


function closeSingleContact() {
	contactContent.style = 'animation:slide-out .5s ease;';
	setTimeout(() => {
		singleContactOverlay.style.display = "none";
	}, 400);
}


function editSingleContact(i) {
	let contact = allContacts[i];
	let formContent = document.getElementById('contact-form-content');
	formContent.innerHTML += htmlTemplateEditSingleContact(contact);
}


/* show & hide contact box */
const btn = document.getElementById("contact-btn");
const addContactOverlay = document.getElementById('add-contact-overlay');
const editContactOverlay = document.getElementById('edit-contact-overlay');
const addContact = document.getElementById('add-contact');
const editContact = document.getElementById('edit-contact');


function addContactOpen() {
	addContactOverlay.style.display = 'flex';
	addContact.style = 'animation:slide-in .5s ease;';
	btn.disabled = true;
	btn.style.backgroundColor = '#D1D1D1';
}


function addContactClose() {
	addContact.style = 'animation:slide-out .5s ease;';
	setTimeout(() => {
		addContactOverlay.style.display = "none";
		btn.disabled = false;
		btn.style.backgroundColor = '#2A3647';
	}, 400);
}


function editContactOpen(i) {
	editContactOverlay.style.display = 'flex';
	editContact.style = 'animation:slide-in .5s ease;';
	editSingleContact(i);
}


function editContactClose() {
	editContact.style = 'animation:slide-out .5s ease;';
	setTimeout(() => {
		editContactOverlay.style.display = "none";
	}, 400);
}


function doNotClose(event) {
    event.stopPropagation();
}


