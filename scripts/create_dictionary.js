import {sendRequest} from "./request.js";

export function createDictionary() {
    var options = {
        method: 'POST',
        params: "",
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/create_dictionary.php", options, createSuccess, createFail);
}

function createSuccess(response) {
    
}

function createFail() {
    alert("error");
}