class Player {
    constructor(posX, posY, width, height) {
        this.pos = createVector(posX, posY);
        this.dim = createVector(width, height);
    }

    update() {
        this.display();
        this.pos.add(this.vel);
    }

    display() {
        fill(250);
        rect(this.pos.x-(this.dim.x), this.pos.y-(this.dim.y/2), this.dim.x, this.dim.y);
    }
}