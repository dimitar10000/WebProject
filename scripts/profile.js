import { sendRequest } from "./request.js";
import { authorize } from "./authorize.js";

window.addEventListener("load", () => {
    authorize();
    profileStats();
});

function profileStats() {

    var options = {
        method: 'POST',
        params: "",
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/profile_stats.php", options, updateSuccess2, updateFail);
}

function updateSuccess2(response) {
    var obj = JSON.parse(response);

    var nameArea = document.getElementById("username-area");
    nameArea.innerHTML = obj.name;

    var pointsArea = document.getElementById("points-area");
    pointsArea.innerHTML = obj.points;

    var wordsArea = document.getElementById("words-area");
    wordsArea.innerHTML = obj.words;

}

function updateFail() {
    alert("грешка");   
}