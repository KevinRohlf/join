function summary() {
    date();
    greeting();
    mobileGreeting();
}


function date() {
    newDate = new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'});
    document.getElementById('newDate').innerHTML = newDate;
}


function greeting() {
    let greet;
    let myDate = new Date();
    let hrs = myDate.getHours();

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 18)
        greet = 'Good Afternoon';
    else if (hrs >= 18 && hrs <= 24)
        greet = 'Good Evening';

    document.getElementById('greeting').innerHTML = greet;
}


function mobileGreeting() {
    if (window.innerWidth <= 1500) {
        setTimeout(mobileGreetingDisappears, 3000);
    } else {
        document.getElementById('greeting-container').classList.remove('d-none');
    }
}
  

function mobileGreetingDisappears() {
    document.getElementById('greeting-container').classList.add('d-none');
}
  