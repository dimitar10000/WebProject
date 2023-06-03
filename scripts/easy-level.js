window.addEventListener("load",function() {
    permutateLabels();

    var labels = document.getElementsByClassName("label");

    for (const item of labels) {
        item.addEventListener("dragstart",dragStart);
        item.addEventListener("dragend",dragEnd);
    }

    var targets = document.getElementsByClassName("drop-target");

    for(const element of targets) {
        element.addEventListener("dragenter",dragEnter);
        element.addEventListener("dragover",dragOver);
        element.addEventListener("dragleave",dragLeave);
        element.addEventListener("drop",drop);
    };
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);

    setTimeout(() => {
    e.target.classList.add("hide");
    },0);
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

    checkMatch(labelID,itemID);
    
    //const draggable = document.getElementById(labelID);
    //draggable.classList.remove('hide');
}

function addGreenMark(itemID) {
    var img = document.createElement("img");
        img.setAttribute("src", "../images/green_mark.gif");
        img.style.position = "absolute";
        img.height = "112";
        img.width = "112";
        img.style.right = "0";
        img.style.top = "0";

        var container = document.getElementById(itemID);
        container.appendChild(img);
}

function removeLabel(labelID) {
    var label = document.getElementById(labelID);
    label.remove();
}

function showAnswer(itemID,labelID) {
    var item = document.getElementById(itemID);
    var obj = item.getBoundingClientRect();

    var answer = document.createElement("div");
    answer.style.fontSize = "23px";
    answer.style.position = "absolute";
    answer.classList.add("answer");

    answer.style.left = obj.left + (item.offsetWidth)/2 - 40 + "px";
    answer.style.top = obj.top - 40 + "px";

    var label = document.getElementById(labelID);
    var word = document.createTextNode(label.textContent);
    answer.appendChild(word);

    item.parentNode.insertBefore(answer, item.nextSibling);
}

function checkMatch(labelID, itemID) {
    if(dict[labelID] == itemID) {
        addGreenMark(itemID);
        showAnswer(itemID,labelID);
        removeLabel(labelID);
    }
}

function permutateArr(arr) {
    let currentIndex = arr.length,  randomIndex;

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

    for(let i = 0; i < n; i++) {
        var l = document.createElement("label");
        l.setAttribute("class", "label");
        l.setAttribute("id", labelsArr[i]);
        l.setAttribute("draggable", "true");
        l.innerHTML = "<b>" + dict[labelsArr[i]] + "</b>";

        labelsSection.appendChild(l);
    }
}