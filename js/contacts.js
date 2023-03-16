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
	
	newContact(name, email, phone);
}


function newContact(name, email, phone) {
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

	addContactClose();
	clearInput();
	saveAllContacts();
	loadAllContacts();
}


function getInitials(fullName) {
	let names = fullName.toString().split(' ');
	if (names.length === 1) {
		initials = names[0].substring(0, 1).toUpperCase() 
		+ names[0].substring(1, 2);
	} else {
		initials = names[0].substring(0, 1).toUpperCase() 
		+ names[names.length - 1].substring(0, 1).toUpperCase();
	}
	return initials;
}


function getColor() {
	return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
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


/* delate contact */
function delateActiveContact(i) {
	allContacts.splice(i, 1);

	editContactClose();
	closeSingleContact();
	saveAllContacts();
	loadAllContacts();
}


/* save contact */
function saveActiveContact(i) {
	let name = document.getElementById('edit-name').value;
	let email = document.getElementById('edit-email').value;
	let phone = document.getElementById('edit-phone').value;
	
	newContact(name, email, phone);
	delateActiveContact(i);
}


/* show single contact */
let singleContactOverlay = document.getElementById('single-contact-overlay');
let contactContent = document.getElementById('show-contact');

function renderSingleContact(i) {
	let contact = allContacts[i];
	contactContent.innerHTML = '';
	singleContactOverlay.style.display = 'flex';
	contactContent.style = 'animation:slide-in .5s ease;';
	contactContent.innerHTML = '';
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
	let formContent = document.getElementById('contact-field-content');
	formContent.innerHTML = '';
	formContent.innerHTML += htmlTemplateEditSingleContact(contact, i);
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