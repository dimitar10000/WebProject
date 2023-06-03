import {sendRequest} from "./request.js";

export function updateScore(points) {
    var options = {
        method: 'POST',
        params: "points="+points,
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/update_score.php", options, updateSuccess, updateFail);
}

function updateSuccess(response) {
    
}

function updateFail() {
    alert("грешка");
}