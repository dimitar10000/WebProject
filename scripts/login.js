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

    sendRequest("../php/login.php", options, updateSuccess, updateFail);
}

function updateSuccess(response) {
    if(response == "success") {
        location.href = "../php/welcome.html";
    }
    else {
        location.href = "../php/login_fail.html";
    }
}

function updateFail() {
    alert("грешка");
}