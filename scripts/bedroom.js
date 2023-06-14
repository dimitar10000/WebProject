import Item from "./item_class.js";
import { updateScore } from "./update_score.js";
import { updateDictionary } from "./update_dictionary.js";
import { authorize } from "./authorize.js";

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
    permutateLabels();

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
        element.setAttribute("draggable","false");
    };

    var images = document.getElementsByTagName("img");

    for (const element of images) {
        element.setAttribute("draggable","false");
    }

    var refresh = document.getElementById("refresh-button");
    refresh.addEventListener("click", restartLevel);

    var arrow1 = document.getElementById("green-arrow-left");
    var arrow2 = document.getElementById("green-arrow-right");

    arrow1.addEventListener("click", switchRoomLeft);
    arrow2.addEventListener("click", switchRoomRight);
});

function restartLevel() {
    let answer = confirm("Сигурни ли сте? Точките ви за нивото няма да се запазят.");

    if (answer == true) {
        location.reload();
    }
}

function switchRoomLeft() {
    if (itemsMatched != 5) {

        let answer = confirm("Сигурни ли сте? Не сте намерили всички обекти и точките ви за нивото няма да се запазят.");

        if (answer == true) {
            window.location.href = "living-room.html";
        }
    }
    else {
        updateScore(roomPoints);
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
        updateScore(roomPoints);
        window.location.href = "study.html";
    }
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);

    setTimeout(() => {
        e.target.classList.add("hide");
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove("hide");
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

}

function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    const itemID = e.currentTarget.id;
    const labelID = e.dataTransfer.getData('text/plain');

    checkMatch(labelID, itemID);
}

function addGreenMark(itemID) {
    var img = document.createElement("img");
    img.setAttribute("src", "../images/green_mark.gif");
    img.style.position = "absolute";
    img.height = "112";
    img.width = "112";

    img.style.left = "0px";
    img.style.right = "0px";
    img.style.top = "0px";
    img.style.bottom = "0px";
    img.style.margin = "auto";

    var container = document.getElementById(itemID);
    container.appendChild(img);
}

function showRedMark(itemID) {
    var img = document.createElement("img");
    img.setAttribute("src", "../images/red_mark.png");
    img.setAttribute("class", "red-mark");
    img.style.position = "absolute";
    img.height = "54";
    img.width = "72";

    img.style.left = "0px";
    img.style.right = "0px";
    img.style.top = "0px";
    img.style.bottom = "0px";
    img.style.margin = "auto";

    var container = document.getElementById(itemID);
    container.appendChild(img);
}

function removeRedMark(itemID) {
    var container = document.getElementById(itemID);

    var children = container.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.className == "red-mark") {
            child.parentNode.removeChild(child);
        }
    }
}

function showWrongMessage() {
    var l = document.createElement("label");
    var scene = document.getElementById("scene");

    l.setAttribute("id", "wrong-message");
    l.style.position = "absolute";
    l.style.left = "0px";
    l.style.right = "0px";
    l.style.top = "0px";
    l.style.margin = "auto";
    l.style.height = "10px";
    l.style.width = "100%";
    l.style.textAlign = "center";

    l.style.fontSize = "18px";
    l.style.color = "red";
    l.style.cursor = "default";
    l.innerHTML = "<b> Грешка. Провери думата от \"Научи нови думи\" горе в менюто и опитай пак!</b>";

    scene.appendChild(l);
}

function hideWrongMessage() {
    var msg = document.getElementById("wrong-message");
    if (msg != null) {
        msg.remove();
    }
}

function removeLabel(labelID) {
    var label = document.getElementById(labelID);
    label.remove();
}

function showAnswer(itemID, labelID, pos) {
    var item = document.getElementById(itemID);
    var obj = item.getBoundingClientRect();

    var answer = document.createElement("div");
    answer.style.fontSize = "23px";
    answer.style.position = "absolute";
    answer.classList.add("answer");

    if (pos == "above") {
        answer.style.left = obj.left + (item.offsetWidth) / 2 - 170 + "px";
        answer.style.top = obj.top + "px";
    }
    else if (pos == "below") {
        answer.style.left = obj.left + (item.offsetWidth) / 2 - 170 + "px";
        answer.style.top = obj.top + (item.offsetHeight)/2 -70 + "px";
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

        removeRedMark(itemID); // if there is one
        hideWrongMessage();
        addGreenMark(itemID);

        if (itemID == "drawer" || itemID == "bed") {
            showAnswer(itemID, labelID, "below");
        }
        else {
            showAnswer(itemID, labelID, "above");
        }
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

function permutateLabels() {
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

    addLabels(newLabels);
}

function addLabels(labelsArr) {

    var labelsSection = document.getElementById("labels-section");
    var n = Object.keys(dict).length;

    for (let i = 0; i < n; i++) {
        var l = document.createElement("label");
        l.setAttribute("class", "label");
        l.setAttribute("id", labelsArr[i]);
        l.setAttribute("draggable", "true");
        l.innerHTML = "<b>" + dict[labelsArr[i]] + "</b>";

        labelsSection.appendChild(l);
    }
}