import Item from "./item_class.js";
import { updateScore } from "./update_score.js";
import { updateDictionary } from "./update_dictionary.js";
import { authorize } from "./authorize.js";
import { dragEnd, dragEnter, dragLeave, dragStart, dragOver } from "./drag-functionality.js";
import {
    restartLevel, addGreenMark, showRedMark, removeRedMark, removeRedMarks, showWrongMessage,
    hideWrongMessage, removeLabel, permutateLabels, leave
} from "./common-functions.js";

var roomPoints = 0;
var itemsMatched = 0;

var bedObject = new Item("bed", 0, 0);
var windowObject = new Item("window", 0, 0);
var pictureObject = new Item("picture", 0, 0);
var lampObject = new Item("lamp", 0, 0);
var drawerObject = new Item("drawer", 0, 0);

var dict = {
    bedLabel: "bed",
    windowLabel: "window",
    pictureLabel: "picture",
    lampLabel: "lamp",
    drawerLabel: "drawer"
};

var objects = {
    bed: bedObject,
    window: windowObject,
    picture: pictureObject,
    lamp: lampObject,
    drawer: drawerObject
};

window.addEventListener("load", function () {
    authorize();
    permutateLabels(dict);

    var labels = document.getElementsByClassName("label");

    for (const item of labels) {
        item.addEventListener("dragstart", dragStart);
        item.addEventListener("dragend", dragEnd);
    }

    var targets = document.getElementsByClassName("drop-target");

    for (const element of targets) {
        element.addEventListener("dragenter", dragEnter);
        element.addEventListener("dragover", dragOver);
        element.addEventListener("dragleave", dragLeave);
        element.addEventListener("drop", drop);
        element.setAttribute("draggable", "false");
    };

    var images = document.getElementsByTagName("img");

    for (const element of images) {
        element.setAttribute("draggable", "false");
    }

    var refresh = document.getElementById("refresh-button");
    refresh.addEventListener("click", restartLevel);

    var arrow1 = document.getElementById("green-arrow-left");
    var arrow2 = document.getElementById("green-arrow-right");

    arrow1.addEventListener("click", switchRoomLeft);
    arrow2.addEventListener("click", switchRoomRight);

    var exit = document.getElementById("exitclick");
    exit.addEventListener("click", leave);
});

function switchRoomLeft() {
    if (itemsMatched != 5) {

        let answer = confirm("Сигурни ли сте? Не сте намерили всички обекти и точките ви за нивото няма да се запазят.");

        if (answer == true) {
            window.location.href = "living-room.html";
        }
    }
    else {
        window.location.href = "living-room.html";
    }
}

function switchRoomRight() {
    if (itemsMatched != 5) {
        let answer = confirm("Сигурни ли сте? Не сте намерили всички обекти и точките ви за нивото няма да се запазят.");

        if (answer == true) {

            window.location.href = "study.html";
        }
    }
    else {
        window.location.href = "study.html";
    }
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    const itemID = e.currentTarget.id;
    const labelID = e.dataTransfer.getData('text/plain');

    checkMatch(labelID, itemID);
}


function showFoundAll() {
    var l = document.createElement("label");
    var scene = document.getElementById("scene");

    l.setAttribute("id", "foundall-message");
    l.style.position = "absolute";
    l.style.left = "-200px";
    l.style.right = "0px";
    l.style.top = "0px";
    l.style.margin = "auto";
    l.style.height = "10px";
    l.style.width = "100%";
    l.style.textAlign = "center";
    l.style.borderStyle = "none";

    l.style.fontSize = "25px";
    l.style.color = "green";
    l.style.backgroundColor = "transparent";
    l.style.cursor = "default";
    l.innerHTML = "<b> Браво! Намерихте всички думи. +" + roomPoints + " точки </b>";

    scene.appendChild(l);
}

function showAnswer(itemID, labelID) {
    var item = document.getElementById(itemID).firstElementChild;

    var answer = document.createElement("div");
    answer.style.fontSize = "23px";
    answer.style.position = "absolute";
    answer.classList.add("answer");

    if (itemID == "picture" || itemID == "lamp") {
        answer.style.left = item.style.left + "px";
        answer.style.top = item.style.top - 30 + "px";
    }
    else if (itemID == "drawer") {
        answer.style.left = item.style.left + "px";
        answer.style.top = item.style.top + 200 + "px";
    }
    else {
        answer.style.left = item.style.left + "px";
        answer.style.top = item.style.top + 220 + "px";
    }

    var label = document.getElementById(labelID);
    var word = document.createTextNode(label.textContent);
    answer.appendChild(word);

    item.parentNode.insertBefore(answer, item.nextSibling);
}

function checkMatch(labelID, itemID) {
    if (dict[labelID] == itemID) {
        itemsMatched++;

        var itemObject = objects[itemID];
        itemObject.correctMatches++;

        if (itemObject.correctMatches == 1) {
            if (itemObject.wrongMatches == 0) {
                roomPoints += 3;
            }
            else if (itemObject.wrongMatches == 1) {
                roomPoints += 2;
            }
            else {
                roomPoints += 1;
            }

            var itemElement = document.getElementById(itemID);
            itemElement.removeEventListener("dragenter", dragEnter);
            itemElement.removeEventListener("dragover", dragOver);
            itemElement.removeEventListener("dragleave", dragLeave);
            itemElement.removeEventListener("drop", drop);
        }

        if (itemsMatched == 5) {
            showFoundAll();
            updateScore(roomPoints);
            var refresh = document.getElementById("refresh-button");
            refresh.removeEventListener("click",restartLevel);
        }

        removeRedMarks();
        hideWrongMessage();
        addGreenMark(itemID);

        showAnswer(itemID, labelID);
        removeLabel(labelID);

        updateDictionary(itemID);
    }
    else {
        var itemObject = objects[itemID];
        itemObject.wrongMatches++;

        showRedMark(itemID);
        showWrongMessage();

        setTimeout(hideWrongMessage, 10000);
        setTimeout(() => { removeRedMark(itemID); }, 10000);
    }
}