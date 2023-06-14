import { sendRequest } from "./request.js";
import { authorize } from "./authorize.js";
import {leave} from "./common-functions.js"

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

function getTranslation(word) {
    if (word == "armchair") return "кресло";
    else if (word == "bed") return "легло";
    else if (word == "books") return "книги";
    else if (word == "chair") return "стол";
    else if (word == "cooker") return "печка";
    else if (word == "desk") return "бюро";
    else if (word == "door") return "врата";
    else if (word == "drawer") return "чекмедже";
    else if (word == "fridge") return "хладилник";
    else if (word == "fruit-bowl") return "купа за плодове";
    else if (word == "lamp") return "лампа";
    else if (word == "laptop") return "лаптоп";
    else if (word == "newspaper") return "вестник";
    else if (word == "pens") return "химикали";
    else if (word == "phone") return "телефон";
    else if (word == "picture") return "картина";
    else if (word == "remote-control") return "дистанционно управление";
    else if (word == "small-table") return "маса";
    else if (word == "sofa") return "диван";
    else if (word == "table") return "маса";
    else if (word == "tv") return "телевизор";
    else if (word == "window") return "прозорец";

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
        container.style.marginBottom = "20px";

        container.appendChild(obj);
        var sect = document.getElementById("words-section");
        sect.appendChild(container);

        var lab = document.createElement("label");
        var translation = getTranslation(word);

        if (word == "fruit-bowl") {
            lab.innerHTML = "fruit bowl";
        }
        else if (word == "remote-control") {
            lab.innerHTML = "remote control";
        }
        else if (word == "small-table") {
            lab.innerHTML = "table";
        }
        else {
            lab.innerHTML = word;
        }
        
        lab.innerHTML += " - " + translation;
        lab.style.alignContent = "center";
        sect.appendChild(lab);
    }
}

function updateFail() {
    alert("грешка");
}