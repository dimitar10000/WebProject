import {sendRequest} from "./request.js";

export function updateDictionary(word) {
    var options = {
        method: 'POST',
        params: "word="+word,
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/update_dictionary.php", options, updateSuccess, updateFail);
}

function updateSuccess(response) {
    
}

function updateFail() {
    alert("грешка");
}