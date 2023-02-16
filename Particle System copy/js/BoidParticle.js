class BoidParticle {
    constructor(x, y ,z) {
        this.size = createVector(random(30, 50), random(30, 50), random(30, 50));
        this.pos = createVector(x,y,z);
        this.vel = createVector(random(-1, 1), random(-1, 1), random(2.5, 0.5));
        this.alpha = 255;
    }

    update() {
        this.pos.add(this.vel);
        this.alpha -= 5;
        this.size.div(1.07);
    }

    end() {
        return this.alpha < 0;
    }

    show() {
        push();
        rectMode(CENTER);
        noStroke();
        fill(0, 30, 50, this.alpha);
        translate(this.pos.x, this.pos.y, this.pos.z);
        box(10);
        pop();
    }
}