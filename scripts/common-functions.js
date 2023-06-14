export function restartLevel() {
    let answer = confirm("Сигурни ли сте? Точките ви за нивото няма да се запазят.");

    if (answer == true) {
        location.reload();
    }
}

export function addGreenMark(itemID) {
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

export function showRedMark(itemID) {
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

export function removeRedMark(itemID) {
    var container = document.getElementById(itemID);

    var children = container.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.className == "red-mark") {
            child.parentNode.removeChild(child);
        }
    }
}

export function removeRedMarks() {
    var marks = document.getElementsByClassName("red-mark");

    for(const mark of marks) {
        mark.remove();
    }
}

export function showWrongMessage() {
    var l = document.createElement("label");
    var scene = document.getElementById("scene");

    l.setAttribute("id", "wrong-message");
    l.style.position = "absolute";
    l.style.left = "-200px";
    l.style.right = "0px";
    l.style.top = "0px";
    l.style.margin = "auto";
    l.style.height = "10px";
    l.style.width = "100%";
    l.style.textAlign = "center";
    l.style.borderStyle = "none";

    l.style.fontSize = "18px";
    l.style.color = "red";
    l.style.backgroundColor = "transparent";
    l.style.cursor = "default";
    l.innerHTML = "<b> Грешка. Провери думата от \"Научи нови думи\" горе в менюто и опитай пак!</b>";

    scene.appendChild(l);
}

export function hideWrongMessage() {
    var msg = document.getElementById("wrong-message");
    if (msg != null) {
        msg.remove();
    }
}

export function removeLabel(labelID) {
    var label = document.getElementById(labelID);
    label.remove();
}

export function permutateArr(arr) {
    let currentIndex = arr.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

export function permutateLabels(dict) {
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

    addLabels(newLabels,dict);
}

export function addLabels(labelsArr,dict) {

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

export function leave() {
    let answer = confirm("Сигурни ли сте? Не сте намерили всички обекти и точките ви за нивото няма да се запазят.");

    if (answer == true) {
        window.location.href = "logout.html";
    }
}