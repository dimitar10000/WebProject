import { sendRequest } from "./request.js";

export function authorize() {

    var options = {
        method: 'POST',
        params: "",
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/auth_session.php", options, updateSuccess, updateFail);
}

function updateSuccess(response) {
    if (response == "denied access") {
        location.href = "../php/login.html";
    }
}

function updateFail() {
    alert("грешка");
}