const btn = document.getElementById("contact-btn");
const overlay = document.getElementById('add-contact-overlay');
const addContact = document.getElementById('add-contact');

function addContactOpen(event) {
overlay.style.display = 'flex';
addContact.style = 'animation:slide-in .5s ease;';
btn.disabled = true;
btn.style.backgroundColor = '#D1D1D1';
}


function addContactClose() {
addContact.style = 'animation:slide-out .5s ease;';
setTimeout(() => {
	overlay.style.display = "none";
	btn.disabled = false;
	btn.style.backgroundColor = '#2A3647';
}, 400);
}


function doNotClose(event) {
    event.stopPropagation();
}