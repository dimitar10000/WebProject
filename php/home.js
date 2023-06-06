import { sendRequest } from "./request.js";

window.addEventListener("load", () => {
    createDB();
});

function createDB() {

    var options = {
        method: 'POST',
        params: "",
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/create_db.php", options, updateSuccess1, updateFail);
}

function updateSuccess1(response) {

}

function updateFail() {
    alert("грешка");
}