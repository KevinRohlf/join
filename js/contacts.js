let allContacts = [];
let alphabet = [];


function loadAllContacts() {
	let allContactsAsString = localStorage.getItem('allContacts');
	if (allContactsAsString) {
		allContacts = JSON.parse(allContactsAsString);
	}
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
	allContacts.sort((a, b) => {
		return a.name.localeCompare(b.name);
	  });
}


// create all letters of existing contacts
function createAlphabet() {
	alphabet = [];
	allContacts.forEach(function(contact) {
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
	let contactlist = document.getElementById("contacts");
	contactlist.innerHTML = "";
	for (let i = 0; i < alphabet.length; i++) {
		contactlist.innerHTML += htmlTemplateRenderAlphabet(i);
	}
}


// render all contacts in letter structure
function renderAllContacts() {
	for (let i = 0; i < allContacts.length; i++) {
		let firstLetter = getFirstLetter(allContacts[i]);
		for (let j = 0; j < alphabet.length; j++) {
		  let letterOfAlphabet = alphabet[j];
		  if (letterOfAlphabet == firstLetter) {
				document.getElementById(`group-${firstLetter}`).innerHTML +=
			  	htmlTemplateRenderAllContacts(allContacts[i], i);
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
function newContact(name, email, phone) {
	let initials = getInitials(name);
	let initialColor = getColor();

	let contact = {
		'name': name,
		'email': email,
		'phone': phone,
		'initials': initials,
		'color': initialColor,
	};

	allContacts.push(contact);
	addContactClose();
	clearInput();
	saveAllContacts();
	loadAllContacts();
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


function saveAllContacts() {
	let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);
}


// save contact
function saveActiveContact(i) {
	let newName = document.getElementById('edit-name').value;
	let newEmail = document.getElementById('edit-email').value;
	let newPhone = document.getElementById('edit-phone').value;
	allContacts[i].name = newName;
	allContacts[i].email = newEmail;
	allContacts[i].phone = newPhone;
	saveAllContacts();
	loadAllContacts();
	closeSingleContact();
	editContactClose();
}


// show single contact
let singleContactOverlay = document.getElementById('single-contact-overlay');
let contactContent = document.getElementById('show-contact');

function renderSingleContact(i) {
	singleContactOverlay.style.display = 'flex';
	contactContent.style = 'animation:slide-in .5s ease;';
	contactContent.innerHTML = '';
	contactContent.innerHTML += htmlTemplateRenderSingleContact(allContacts[i], i);
}


function closeSingleContact() {
	contactContent.style = 'animation:slide-out .5s ease;';
	setTimeout(() => {
		singleContactOverlay.style.display = "none";
	}, 400);
}


function editSingleContact(i) {
	let formContent = document.getElementById('contact-field-content');
	formContent.innerHTML = '';
	formContent.innerHTML += htmlTemplateEditSingleContact(allContacts[i], i);
}


// show & hide contact box
const btn = document.getElementById("contact-btn");
const addContactOverlay = document.getElementById('add-contact-overlay');
const editContactOverlay = document.getElementById('edit-contact-overlay');
const addContact = document.getElementById('add-contact');
const editContact = document.getElementById('edit-contact');


function addContactOpen() {
	addContactOverlay.style.display = 'flex';
	addContact.style = 'animation:slide-in .5s ease;';
}


function addContactClose() {
	addContact.style = 'animation:slide-out .5s ease;';
	setTimeout(() => {
		addContactOverlay.style.display = "none";
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
