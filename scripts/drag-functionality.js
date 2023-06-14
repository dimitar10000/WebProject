export function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);

    setTimeout(() => {
        e.target.classList.add("hide");
    }, 0);
}

export function dragEnd(e) {
    e.target.classList.remove("hide");
}

export function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

export function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

}

export function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
}