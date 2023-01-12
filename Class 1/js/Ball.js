class Element {

    constructor (posX, posY, velX, velY, size) {
        this.pos = createVector(posX, posY);
        this.vel = createVector(velX, velY);
        this.size = size;
    }

    update() {
        this.display();
        this.pos.add(this.vel);
    }

    display() {
        fill(250);
        ellipse(this.pos.x-(this.size/2), this.pos.y-(this.size/2), this.size, this.size);
    }
}