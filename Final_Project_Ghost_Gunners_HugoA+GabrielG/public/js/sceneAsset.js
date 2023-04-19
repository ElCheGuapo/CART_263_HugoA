class sceneAsset {
    constructor(x, y, sizeX, sizeY, sprite) {
        this.pos = createVector(x, y);
        this.sprite = sprite;
        this.size = createVector(sizeX, sizeY);
    }
}