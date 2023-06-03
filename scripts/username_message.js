import {sendRequest} from "./request.js";

window.addEventListener("load", () => {

    var form = document.getElementById("form");
    form.addEventListener("submit",send);
});

function send(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var options = {
        method: 'POST',
        params: "username="+username+"&password="+password,
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/registration.php", options, updateSuccess, updateFail);
}

function updateSuccess(response) {
    if(response == "exists") {
        username_exists_alert();
    }
    else {
        location.href = "../php/register_success.html";
    }
}

function updateFail() {
    alert("грешка");
}

function username_exists_alert() {
    var label = document.getElementById("label");
    label.hidden = false;
    setTimeout(hide_label,10000);
}

function hide_label() {
    var label = document.getElementById("label");
    label.hidden = true;
}