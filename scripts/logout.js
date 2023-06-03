import { sendRequest } from "./request.js";

window.addEventListener("load", () => {
    logout();
});

function logout() {

    var options = {
        method: 'POST',
        params: "",
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/logout.php", options, updateSuccess, updateFail);
}

function updateSuccess(response) {
    if (response == "success") {
        location.href = "../php/login.html";
    }
}

function updateFail() {
    alert("грешка");
}