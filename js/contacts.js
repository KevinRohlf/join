let contacts = [];
let alphabet = [];
let categorys = [];
let mobile = false;


/**
 * This function is used to load the content from the backend
 * 
 * 
 */
async function init() {
	setURL('https://gruppenarbeit-479-join.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
	contacts = JSON.parse(backend.getItem('contacts')) || [];

	renderContacts();
}


/**
 * This function is used to call other functions
 * 
 * 
 */
function renderContacts() {
	sortAllContacts();
	createAlphabet();
	renderAlphabet();
	renderAllContacts();
}


/**
 * This function is used to sort all contact names alphabetically
 * 
 * 
 */
function sortAllContacts() {
	contacts.sort((a, b) => {
		return a.name.localeCompare(b.name);
	  });
}


/**
 * This function is used to push all not existing first letters of all contact names in an array
 * 
 * 
 */
function createAlphabet() {
	alphabet = [];
	contacts.forEach(function(contact) {
		if (alphabet.indexOf(getFirstLetter(contact)) === -1) {
			alphabet.push(getFirstLetter(contact));
			}
		});
	}


/**
 * This function is used to return the first letter of a contact name
 * 
 * 
 */
function getFirstLetter(contact) {
	return contact["name"].charAt(0);
}


/**
 * This function is used to render first letters of all contacts
 * 
 * 
 */
function renderAlphabet() {
	let contactlist = document.getElementById("contacts-field");
	contactlist.innerHTML = "";
	for (let i = 0; i < alphabet.length; i++) {
		contactlist.innerHTML += htmlTemplateRenderAlphabet(i);
	}
}


/**
 * This function is used to render all contacts in letter structure
 * 
 * 
 */
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


/**
 * This function is used to read new contact values
 * 
 * 
 */
function addToContact() {
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let phone = document.getElementById('phone').value;
	
	newContact(name, email, phone);
}


/**
 * This function is used to create a new contact
 * 
 * @param {string} name - name of new contact
 * @param {string} email - email of new contact
 * @param {string} phone - phone number of new contact
 */
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


function renderSingleContact(i) {
	currentOpenContact = i;
	if (window.innerWidth>widths[1]) {
			renderSingleContactDesktop(i);
		} else {
			mobile = true;
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
	renderSingleContactDetails(i);
	window.addEventListener('resize', function () {
		if (window.innerWidth>widths[1]) {
			document.getElementById('contacts-field').style.display = 'flex';
			document.getElementById('contacts-details').style.display = 'flex';
		} else {
			document.getElementById('contacts-details').style.display = 'none';
			if (mobile) {
				renderSingleContactDetails(i);
			}
		}
	});
}


function renderSingleContactDetails(i) {
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
	mobile = false;
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


/**
 * This funciton is used to stop the overlay onclick function when pressing buttons on the card
 * 
 * @param {string} event
 * 
 */
function doNotClose(event) {
    event.stopPropagation();
}