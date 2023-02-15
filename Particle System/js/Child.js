class Child{
    constructor(x, y, z) {
        this.pos = createVector(x, y, z);
        this.vel = createVector(0, 0, 0);
        this.targetPoint = createVector(random(-50,50), random(-50, 50), 0);
    }

    update() {

        //confine new target location to the edges of the map
        if(dist(this.pos.x, this.pos.y, this.targetPoint.x, this.targetPoint.y) > 2) {
            this.pos.add(this.vel);
        } else {
            this.targetPoint.x += random(-50, 50);
            this.targetPoint.y += random(-50, 50);
            
            while(this.targetPoint.x > 300 && this.targetPoint.x < - 300 && this.targetPoint.y > 300 && this.targetPoint.y < -300) {
                this.targetPoint.x += random(-50, 50);
                this.targetPoint.y += random(-50, 50);
            }
            this.setVel();
        }
    }

    //set a new random walking speed
    setVel() {
        this.vel.x = this.targetPoint.x - this.pos.x;
        this.vel.y = this.targetPoint.y - this.pos.y;
        this.vel.normalize();
        this.vel.mult(random(1, 4));
    }
}