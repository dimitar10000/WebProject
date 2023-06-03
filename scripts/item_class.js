class Item {
    name;
    correctMatches;
    wrongMatches;

    constructor(name,correctMatches,wrongMatches) {
        this.name = name;
        this.correctMatches = correctMatches;
        this.wrongMatches = wrongMatches;
    }
}

export default Item;