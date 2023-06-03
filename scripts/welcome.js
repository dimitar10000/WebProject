import { sendRequest } from "./request.js";
import { authorize } from "./authorize.js";

window.addEventListener("load", () => {
    addName();
    authorize();
    createDictionary();
});

function createDictionary() {

    var options = {
        method: 'POST',
        params: "",
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/create_dictionary.php", options, updateSuccess1, updateFail);
}

function updateSuccess1(response) {

}

function addName() {

    var options = {
        method: 'POST',
        params: "",
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/get_name.php", options, updateSuccess2, updateFail);
}

function updateSuccess2(response) {
    var sessionArea = document.getElementById("session-name");
    sessionArea.innerHTML = response;
}

function updateFail() {
    alert("грешка");
}