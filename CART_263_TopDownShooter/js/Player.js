class Player {
    constructor(x, y, size, hp, spd, inv) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.size = size;
        this.hp = hp;
        this.spd = spd;
        this.inv = inv;

        this.center = createVector(this.pos.x + this.size/2, this.pos.y + this.size/2);
    }

    update() {
        this.pos.add(this.vel);
        this.display();
    }

    display() {
        push();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }
}