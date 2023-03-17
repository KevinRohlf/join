
function init() {
  includeHTML()
  loadTasks()
}



function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

/*
window.onresize = function () {
  if (window.innerWidth < 600) {
    document.getElementById('legalnotice').classList.add('d-none')
    document.getElementById('logo').classList.add('d-none')
    document.getElementById('headline').classList.add('d-none')
    document.getElementById('help-icon').classList.add('d-none')
    document.getElementById('mobile-logo').classList.remove('d-none')
  } else {
    document.getElementById('legalnotice').classList.remove('d-none')
    document.getElementById('logo').classList.remove('d-none')
    document.getElementById('headline').classList.remove('d-none')
    document.getElementById('help-icon').classList.remove('d-none')
    document.getElementById('mobile-logo').classList.add('d-none')
  }
}
*/

function toggleLogoutBtn() {
  let btn = document.getElementById('mobile-topmenu-container')
  let overlay = document.getElementById('overlay')
  if (btn.classList.contains('d-none')) {
    btn.classList.remove('d-none')
    overlay.classList.remove('d-none')
  } else {
    btn.classList.add('d-none')
    overlay.classList.add('d-none')
  }

}


function removeOverlay() {
  document.getElementById('mobile-topmenu-container').classList.add('d-none')
  document.getElementById('overlay').classList.add('d-none')
}

