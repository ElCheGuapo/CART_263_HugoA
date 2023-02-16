//Boid system tutorial followed from Daniel Shiffman @thecodingtrain

class Boid {
    constructor() {
      this.pos = createVector(random(width), random(height), 20);
      this.vel = p5.Vector.random2D();
      this.vel.setMag(random(2, 4));
      this.acc = createVector();
      this.maxForce = 0.2;
      this.maxSpeed = 5;
    }
  
    edges() {
      if (this.pos.x > 500) {
        this.pos.x = 0;
      } else if (this.pos.x < -500) {
        this.pos.x = width;
      }
      if (this.pos.y > 500) {
        this.pos.y = 0;
      } else if (this.pos.y < -500) {
        this.pos.y = height;
      }
    }
  
    avoid(lostChild) {
      let perceptionRadius = 25;
      let steering = createVector();
      let total = 0;

      let d = dist(this.pos.x, this.pos.y, lostChild.pos.x, lostChild.pos.y);
      if (d < perceptionRadius) {
        steering.sub(lostChild.vel);
        total++;
      }

      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.vel);
        steering.limit(this.maxForce);
      }
      return steering;
    }


    align(boids) {
      let perceptionRadius = 25;
      let steering = createVector();
      let total = 0;
      for (let other of boids) {
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (other != this && d < perceptionRadius) {
          steering.add(other.vel);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.vel);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    separation(boids) {
      let perceptionRadius = 24;
      let steering = createVector();
      let total = 0;
      for (let other of boids) {
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (other != this && d < perceptionRadius) {
          let diff = p5.Vector.sub(this.pos, other.pos);
          diff.div(d * d);
          steering.add(diff);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.vel);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    cohesion(boids) {
      let perceptionRadius = 50;
      let steering = createVector();
      let total = 0;
      for (let other of boids) {
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (other != this && d < perceptionRadius) {
          steering.add(other.pos);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.sub(this.pos);
        steering.setMag(this.vel);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    flock(boids, lostChild) {
      let alignment = this.align(boids);
      let avoidance = this.avoid(lostChild);
      let cohesion = this.cohesion(boids);
      let separation = this.separation(boids);
  
      avoidance.mult(1);
      alignment.mult(0.5);
      cohesion.mult(0.1);
      separation.mult(5);
  
      this.acc.add(alignment);
      this.acc.add(cohesion);
      this.acc.add(separation);
    }
  
    update() {
      this.pos.add(this.vel);
      this.vel.add(this.acceleration);
      this.vel.limit(this.maxSpeed);
      this.acc.mult(0);
    }
    

    //display boid as 3d object which fades in when closing in on lost child object

    show(lostChild) {
      let alpha = (255 - dist(this.pos.x, this.pos.y, lostChild.pos.x, lostChild.pos.y))*2;

      push();
      noStroke();
      ambientMaterial(0, 0, 180, alpha);
      translate(this.pos.x, this.pos.y, this.pos.z);
      box(random(45, 55), random(45, 55), random(85, 95));
      pop();

      push();
      noStroke();
      translate(this.pos.x, this.pos.y, this.pos.z-15);
      ambientMaterial(0, 0, 50, alpha-180);
      rotateX(0);
      plane(80);
      pop();
    }
  }