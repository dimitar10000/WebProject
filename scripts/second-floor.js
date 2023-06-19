import Item from "./item_class.js";
import { updateScore } from "./update_score.js";
import { updateDictionary } from "./update_dictionary.js";
import { authorize } from "./authorize.js";
import { dragEnd,dragEnter,dragLeave,dragStart,dragOver} from "./drag-functionality.js";
import {restartLevel,addGreenMark,showRedMark,removeRedMark,removeRedMarks,
hideWrongMessage,removeLabel,leave} from "./common-functions.js";

var roomPoints = 0;
var itemsMatched = 0;

var sofaObject = new Item("sofa", 0, 0);
var armchairObject = new Item("armchair", 0, 0);
var tvObject = new Item("tv", 0, 0);
var tableObject = new Item("table", 0, 0);
var remoteObject = new Item("remote control", 0, 0);
var doorObject = new Item("door", 0, 0);
var chairObject = new Item("chair", 0, 0);
var booksObject = new Item("books", 0, 0);
var pensObject = new Item("pens", 0, 0);
var laptopObject = new Item("laptop", 0, 0);
var phoneObject = new Item("phone", 0, 0);
var deskObject = new Item("desk", 0, 0);

var dict = {
    sofaLabel: "sofa",
    armchairLabel: "armchair",
    tvLabel: "tv",
    tableLabel: "table",
    remoteLabel: "remote control",
    doorLabel: "door",
    chairLabel: "chair",
    booksLabel: "books",
    pensLabel: "pens",
    laptopLabel: "laptop",
    phoneLabel: "phone",
    deskLabel: "desk"
};

var objects = {
    sofa: sofaObject,
    armchair: armchairObject,
    tv: tvObject,
    table: tableObject,
    remoteControl: remoteObject,
    door: doorObject,
    chair: chairObject,
    books: booksObject,
    pens: pensObject,
    laptop: laptopObject,
    phone: phoneObject,
    desk: deskObject
};

var livingRoomObjects = [sofaObject, armchairObject, tvObject, tableObject, remoteObject];
var studyObjects = [doorObject, chairObject, booksObject, pensObject, laptopObject, phoneObject, deskObject];

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

    var arrow2 = document.getElementById("green-arrow-up");
    arrow2.addEventListener("click", switchRoomUp);

    var exit = document.getElementById("exitclick");
    exit.addEventListener("click", leave);
});


function showWrongMessage(scene) {
    var l = document.createElement("label");

    l.setAttribute("id", "wrong-message");
    l.style.position = "absolute";
    l.style.left = "0px";
    l.style.right = "0px";
    l.style.top = "0px";
    l.style.margin = "auto";
    l.style.height = "10px";
    l.style.width = "100%";
    l.style.textAlign = "center";
    l.style.borderStyle = "none";

    l.style.fontSize = "18px";
    l.style.color = "red";
    l.style.cursor = "default";
    l.style.backgroundColor = "transparent";
    l.innerHTML = "<b> Грешка. Провери думата от \"Научи нови думи\" горе в менюто и опитай пак!</b>";

    scene.appendChild(l);
}

function permutateArr(arr) {
    let currentIndex = arr.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

function permutateLabels(dict) {
    var n = Object.keys(dict).length;

    var numbers = [];

    for (let i = 0; i < n; i++) {
        numbers[i] = i;
    }

    numbers = permutateArr(numbers);
    var labels = Object.keys(dict);

    var newLabels = [];

    for (let i = 0; i < n; i++) {
        let newIndex = numbers[i];
        newLabels[i] = labels[newIndex];
    }

    addLabels(newLabels,dict);function addLabels(labelsArr,dict) {

        var labelsSection = document.getElementById("labels-section1");
        var n = Object.keys(dict).length;
    
        for (let i = 0; i < n/2; i++) {
            var l = document.createElement("label");
            l.setAttribute("class", "label");
            l.setAttribute("id", labelsArr[i]);
            l.setAttribute("draggable", "true");
            l.innerHTML = "<b>" + dict[labelsArr[i]] + "</b>";
    
            labelsSection.appendChild(l);
        }
    
        var labelsSection2 = document.getElementById("labels-section2");
    
        for (let i = n/2; i < n; i++) {
            var l = document.createElement("label");
            l.setAttribute("class", "label");
            l.setAttribute("id", labelsArr[i]);
            l.setAttribute("draggable", "true");
            l.innerHTML = "<b>" + dict[labelsArr[i]] + "</b>";
    
            labelsSection2.appendChild(l);
        }
    }
}



function switchRoomUp() {
    if (itemsMatched != 10) {
        let answer = confirm("Сигурни ли сте? Не сте намерили всички обекти и точките ви за нивото няма да се запазят.");

        if (answer == true) {

            window.location.href = "first-floor.html";
        }
    }
    else {
        window.location.href = "first-floor.html";
    }
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    const itemID = e.currentTarget.id;
    const labelID = e.dataTransfer.getData('text/plain');

    checkMatch(labelID, itemID);
}

function studyObject(itemID) {
    for (var i = 0; i < studyObjects.length; i++) {
        if (itemID == studyObjects[i].name) {
            return true;
        }
    }

    return false;
}

function showFoundAll() {
    var l = document.createElement("label");
    var scene = document.getElementById("scene1");

    l.setAttribute("id", "foundall-message");
    l.style.position = "absolute";
    l.style.left = "0px";
    l.style.right = "0px";
    l.style.top = "0px";
    l.style.margin = "auto";
    l.style.height = "10px";
    l.style.width = "100%";
    l.style.textAlign = "center";
    l.style.borderStyle = "none";

    l.style.fontSize = "25px";
    l.style.color = "green";
    l.style.cursor = "default";
    l.style.backgroundColor = "transparent";
    l.innerHTML = "<b> Браво! Намерихте всички думи. +" + roomPoints + " точки </b>";

    scene.appendChild(l);
}

function showAnswer(itemID, labelID) {
    var item = document.getElementById(itemID).firstElementChild;

    var answer = document.createElement("div");
    answer.style.fontSize = "23px";
    answer.style.position = "absolute";
    answer.classList.add("answer");

    if (studyObject(itemID)) {
        if (itemID == "phone") {
            answer.style.left = item.style.left + "px";
            answer.style.top = item.style.top + 30 + "px";
        }
        else if(itemID == "chair" || itemID == "desk"){
            answer.style.left = item.style.left + 50 + "px";
            answer.style.top = item.style.top + 200 + "px";
        }
        else {
            answer.style.left = item.style.left + 30 + "px";
            answer.style.top = item.style.top - 30 + "px";
        }
    }
    else {
        if (itemID == "table") {
            answer.style.left = item.style.left + 50 + "px";
            answer.style.top = item.style.top + 100 + "px";
        }
        else {
            answer.style.left = item.style.left + 50 + "px";
            answer.style.top = item.style.top - 30 + "px";
        }
        
    }

    var label = document.getElementById(labelID);
    var word = document.createTextNode(label.textContent);
    answer.appendChild(word);

    item.parentNode.insertBefore(answer, item.nextSibling);
}

function checkMatch(labelID, itemID) {

    var itemObject;

    if (itemID == "remote-control") {
        itemObject = objects["remoteControl"];
    }
    else {
        itemObject = objects[itemID];
    }

    var cond = dict[labelID] == "remote control" && itemID == "remote-control";

    if (dict[labelID] == itemID || cond) {
        itemsMatched++;

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

        if(itemsMatched == 12) {
            updateScore(roomPoints);
            showFoundAll();
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
        itemObject.wrongMatches++;

        if (livingRoomObjects.includes(itemObject)) {
            var scene = document.getElementById("scene1");
            showWrongMessage(scene);
        }
        else {
            var scene = document.getElementById("scene2");
            showWrongMessage(scene);
        }

        showRedMark(itemID);

        setTimeout(hideWrongMessage, 10000);
        setTimeout(() => { removeRedMark(itemID); }, 10000);
    }
}