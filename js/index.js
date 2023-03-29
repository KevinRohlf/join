// BACKEND //

async function initRegistration() {
  setURL(
    "https://gruppenarbeit-479-join.developerakademie.net/smallest_backend_ever"
  );
  await downloadFromServer();
  users = JSON.parse(backend.getItem("users")) || [];
}

async function addUsers() {
  let name = document.getElementById("name");
  let email = document.getElementById("signUpEmail");
  let password = document.getElementById("signUpPassword");
  users.push({
    name: name.value,
    email: email.value,
    password: password.value,
  });
  await backend.setItem("users", JSON.stringify(users));
}

function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user = users.find(
    u => u.email == email.value && u.password == password.value
  );
  window.document.location.href = "https://gruppenarbeit-479-join.developerakademie.net/summary.html";
  if (user) {
    console.log(user);
  }
}

function initial() {
  document.getElementById("capaOne").classList.add("animation");
  document.getElementById("capaOneWhite").classList.add("animation");
  document.getElementById("capaOneContainer").classList.add("ausblenden");
  if (window.matchMedia("(max-width: 600px)").matches) {
    document.getElementById("capaOneWhite").classList.add("ausblenden");
  }
  setTimeout(() => {
    let capaOneContainer = document.getElementById("capaOneContainer");
    capaOneContainer.style.zIndex = "0";
  }, 1000);
}

/*Password-Inputfield*/

let inputPW = false;

async function changePWSymbol() {
  let pwInputField = document.getElementById("password");
  let pwSymbol = document.getElementById("pwSymbol");
  if (pwInputField.value == "") {
    pwSymbol.src = "assets/img/lock.svg";
    pwSymbol.classList.remove("cursorPointer");
    pwInputField.type = "password";
    inputPW = false;
  } else if ((pwInputField.type = "password")) {
    pwSymbol.src = "assets/img/crossedEye.svg";
    pwSymbol.classList.add("cursorPointer");
    inputPW = true;
  } else {
    pwSymbol.src = "assets/img/eye.svg";
    pwSymbol.classList.add("cursorPointer");
    inputPW = true;
  }
}

async function visibilityPW() {
  let pw = document.getElementById("password");
  let pwSymbol = document.getElementById("pwSymbol");
  if (inputPW === true) {
    if (pw.type === "password") {
      pw.type = "text";
      pwSymbol.src = "assets/img/eye.svg";
    } else {
      pw.type = "password";
      pwSymbol.src = "assets/img/crossedEye.svg";
    }
  }
}

async function changeSignUpPWSymbol() {
  let pwInputField = document.getElementById("signUpPassword");
  let pwSymbol = document.getElementById("pwSymbol");
  if (pwInputField.value == "") {
    pwSymbol.src = "assets/img/lock.svg";
    pwSymbol.classList.remove("cursorPointer");
    pwInputField.type = "password";
    inputPW = false;
  } else if ((pwInputField.type = "password")) {
    pwSymbol.src = "assets/img/crossedEye.svg";
    pwSymbol.classList.add("cursorPointer");
    inputPW = true;
  } else {
    pwSymbol.src = "assets/img/eye.svg";
    pwSymbol.classList.add("cursorPointer");
    inputPW = true;
  }
}

async function visibilitySignUpPW() {
  let pw = document.getElementById("signUpPassword");
  let pwSymbol = document.getElementById("pwSymbol");
  if (inputPW === true) {
    if (pw.type === "password") {
      pw.type = "text";
      pwSymbol.src = "assets/img/eye.svg";
    } else {
      pw.type = "password";
      pwSymbol.src = "assets/img/crossedEye.svg";
    }
  }
}

function renderSignUp() {
  document.getElementById("forgottenPWContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("notAJoinUser").style.display = "none";
  document.getElementById("resetPWContainer").style.display = "none";
  document.getElementById("signUpContainer").style.display = "flex";
}

function renderLogIn() {
  document.getElementById("forgottenPWContainer").style.display = "none";
  document.getElementById("signUpContainer").style.display = "none";
  document.getElementById("resetPWContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "flex";
  document.getElementById("notAJoinUser").style.display = "flex";
}

function renderForgottenPW() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("notAJoinUser").style.display = "none";
  document.getElementById("signUpContainer").style.display = "none";
  document.getElementById("resetPWContainer").style.display = "none";
  document.getElementById("forgottenPWContainer").style.display = "flex";
}

function renderResetPW() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("notAJoinUser").style.display = "none";
  document.getElementById("signUpContainer").style.display = "none";
  document.getElementById("forgottenPWContainer").style.display = "none";
  document.getElementById("resetPWContainer").style.display = "flex";
}
