let contacts = [];
let alphabet = [];
let currentOpenContact;

async function init() {
	setURL('https://gruppenarbeit-479-join.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
	contacts = JSON.parse(backend.getItem('contacts')) || [];

	renderContacts();
}


function renderContacts() {
	sortAllContacts();
	createAlphabet();
	renderAlphabet();
	renderAllContacts();
}


// sort all contacts
function sortAllContacts() {
	contacts.sort((a, b) => {
		return a.name.localeCompare(b.name);
	  });
}


// create all letters of existing contacts
function createAlphabet() {
	alphabet = [];
	contacts.forEach(function(contact) {
		if (alphabet.indexOf(getFirstLetter(contact)) === -1) {
			alphabet.push(getFirstLetter(contact));
			}
		});
	}


function getFirstLetter(contact) {
	return contact["name"].charAt(0);
}
  

// render all letters of existing contacts
function renderAlphabet() {
	let contactlist = document.getElementById("contacts-field");
	contactlist.innerHTML = "";
	for (let i = 0; i < alphabet.length; i++) {
		contactlist.innerHTML += htmlTemplateRenderAlphabet(i);
	}
}


// render all contacts in letter structure
function renderAllContacts() {
	for (let i = 0; i < contacts.length; i++) {
		let firstLetter = getFirstLetter(contacts[i]);
		for (let j = 0; j < alphabet.length; j++) {
		  let letterOfAlphabet = alphabet[j];
		  if (letterOfAlphabet == firstLetter) {
				document.getElementById(`group-${firstLetter}`).innerHTML +=
			  	htmlTemplateRenderAllContacts(contacts[i], i);
		  	}
		};
	};
}


// read new contact vaules
function addToContact() {
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let phone = document.getElementById('phone').value;
	
	newContact(name, email, phone);
}


// create new contact
async function newContact(name, email, phone) {
	let initials = getInitials(name);
	let initialColor = getColor();
	let id = Date.now();

	let newContact = {
        'name': name,
        'email': email,
        'phone': phone,
		'initials': initials,
		'color': initialColor,
		'ID': id
    }
    contacts.push(newContact);
    await backend.setItem('contacts', JSON.stringify(contacts));

	addContactClose();
	clearInput();
	displayConfirm();
	init();
}


// seperate initials of all names
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


// save contact
async function saveActiveContact(i) {
	let newName = document.getElementById('edit-name').value;
	let newEmail = document.getElementById('edit-email').value;
	let newPhone = document.getElementById('edit-phone').value;
	contacts[i].name = newName;
	contacts[i].email = newEmail;
	contacts[i].phone = newPhone;
	await backend.setItem('contacts', JSON.stringify(contacts));

	closeSingleContactDesktop();
	closeSingleContactMobile();
	editContactClose();
	displayConfirmUpdate();
	init();
}


function displayConfirm() {
    let contact = document.getElementById('confirm');

	displayConformation(contact);
}


function displayConfirmUpdate() {
    let contact = document.getElementById('confirmUpdate');

	displayConformation(contact);
}


function displayConformation(contact) {
    setTimeout(() => {
        contact.classList.remove('d-none');
    }, 1000);
    setTimeout(() => {
		contact.classList.add('d-none');
    }, 4000);
}


// show single contact
let singleContactOverlay = document.getElementById('single-contact-overlay');
let contactContent = document.getElementById('show-contact');
const widths = [0, 1400];

/*
window.addEventListener('resize', function () {
	renderSingleContact(currentOpenContact);
});
*/

function renderSingleContact(i) {
	currentOpenContact = i;
	if (window.innerWidth>widths[1]) {
		renderSingleContactDesktop(i);
		} else {
		renderSingleContactMobile(i);
		}
}


function renderSingleContactDesktop(i) {
	singleContactOverlay.style.display = 'flex';
	contactContent.style = 'animation:slide-in .5s ease;';
	contactContent.innerHTML = '';
	contactContent.innerHTML += htmlTemplateRenderSingleContact(contacts[i], i);
}


function renderSingleContactMobile(i) {
	document.getElementById('contacts-field').style.display = 'none';
	singleContactOverlay.style.display = 'flex';
	contactContent.style = 'animation:none;';
	contactContent.style.display = 'flex';
	contactContent.innerHTML = '';
	contactContent.innerHTML += htmlTemplateRenderSingleContact(contacts[i], i);
	document.getElementById('contacts-details').style.display = 'flex';
	document.getElementById('contact-btn').style.display = 'none';
}


function closeSingleContactDesktop() {
	contactContent.style = 'animation:slide-out .5s ease;';
	setTimeout(() => {
		singleContactOverlay.style.display = "none";
	}, 400);
}


function closeSingleContactMobile() {
	document.getElementById('contacts-field').style.display = 'flex';
	singleContactOverlay.style.display = 'none';
	document.getElementById('contacts-details').style.display = 'none';
	document.getElementById('contact-btn').style.display = 'flex';
}


function editSingleContact(i) {
	let formContent = document.getElementById('contact-field-content');
	formContent.innerHTML = '';
	formContent.innerHTML += htmlTemplateEditSingleContact(contacts[i], i);
}


// show & hide contact box
const btn = document.getElementById("contact-btn");
const addContactOverlay = document.getElementById('add-contact-overlay');
const editContactOverlay = document.getElementById('edit-contact-overlay');
const addContact = document.getElementById('add-contact');
const editContact = document.getElementById('edit-contact');
const overlay = document.getElementById('bg-overlay');


function addContactOpen() {
	addContactOverlay.style.display = 'flex';
	addContact.style = 'animation:slide-in .5s ease;';
	overlay.style.display = 'flex';
}


function addContactClose() {
	addContact.style = 'animation:slide-out .5s ease;';
	setTimeout(() => {
		addContactOverlay.style.display = "none";
		overlay.style.display = 'none';	
	}, 300);
}


function editContactOpen(i) {
	editContactOverlay.style.display = 'flex';
	editContact.style = 'animation:slide-in .5s ease;';
	overlay.style.display = 'flex';
	editSingleContact(i);
}


function editContactClose() {
	editContact.style = 'animation:slide-out .5s ease;';
	setTimeout(() => {
		editContactOverlay.style.display = "none";
		overlay.style.display = 'none';	
	}, 300);
}


function doNotClose(event) {
    event.stopPropagation();
}