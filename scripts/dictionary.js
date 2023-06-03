import { sendRequest } from "./request.js";
import { authorize } from "./authorize.js";

window.addEventListener("load", () => {
    authorize();
    getWords();
});


function getWords() {

    var options = {
        method: 'POST',
        params: "",
        contentType: 'application/x-www-form-urlencoded'
    }

    sendRequest("../php/get_words.php", options, updateSuccess, updateFail);
}

function updateSuccess(response) {
    var obj = JSON.parse(response);

    var words = [];

    for (const field of obj) {
        words.push(field.word);
    }

    showWords(words);
}

function showWords(arr) {
    var wordPic = {
        armchair: "../images/armchair.png",
        bed: "../images/bed.png",
        books: "../images/books.png",
        chair: "../images/chair.png",
        cooker: "../images/cooker.png",
        desk: "../images/desk.png",
        door: "../images/door.png",
        drawer: "../images/drawer.png",
        fridge: "../images/fridge.png",
        fruitBowl: "../images/fruit_bowl.png",
        lamp: "../images/lamp.png",
        laptop: "../images/laptop.png",
        newspaper: "../images/newspaper.png",
        pens: "../images/pens.png",
        phone: "../images/phone.png",
        picture: "../images/picture.png",
        remoteControl: "../images/remote_control.png",
        smallTable: "../images/small table.png",
        sofa: "../images/sofa.png",
        table: "../images/table.png",
        tv: "../images/tv.png",
        window: "../images/window.png"
    }

    for (const word of arr) {
        var container = document.createElement("div");
        var obj = document.createElement("img");

        if (word == "fruit-bowl") {
            obj.setAttribute("src", wordPic["fruitBowl"]);
        }
        else if (word == "remote-control") {
            obj.setAttribute("src", wordPic["remoteControl"]);
        }
        else if (word == "small-table") {
            obj.setAttribute("src", wordPic["smallTable"]);
        }
        else {
            obj.setAttribute("src", wordPic[word]);
        }

        obj.style.height = "300px";
        obj.style.width = "200px";
        obj.style.objectFit = "contain";

        container.style.marginTop = "50px";
        container.style.marginBottom = "50px";

        container.appendChild(obj);
        var sect = document.getElementById("words-section");
        sect.appendChild(container);
    }
}

function updateFail() {
    alert("грешка");
}