class SceneAsset {
    constructor(x, y, sizeX, sizeY) {
        this.pos = createVector(x, y);
        this.dimensions = createVector(sizeX, sizeY);
    }

    display() {
        push();
        fill(0);
        rect(this.pos.x, this.pos.y, this.dimensions.x, this.dimensions.y);
        pop();
    }
}