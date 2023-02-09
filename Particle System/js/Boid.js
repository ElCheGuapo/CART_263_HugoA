class Boid {
    constructor() {
      this.position = createVector(random(width), random(height), 20);
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(random(2, 4));
      this.acceleration = createVector();
      this.maxForce = 0.2;
      this.maxSpeed = 5;
    }
  
    edges() {
      if (this.position.x > 500) {
        this.position.x = 0;
      } else if (this.position.x < -500) {
        this.position.x = width;
      }
      if (this.position.y > 500) {
        this.position.y = 0;
      } else if (this.position.y < -500) {
        this.position.y = height;
      }
    }
  
    avoid(lostChild) {
      let perceptionRadius = 25;
      let steering = createVector();
      let total = 0;

      let d = dist(this.position.x, this.position.y, lostChild.pos.x, lostChild.pos.y);
      if (d < perceptionRadius) {
        steering.sub(lostChild.velocity);
        total++;
      }

      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }


    align(boids) {
      let perceptionRadius = 25;
      let steering = createVector();
      let total = 0;
      for (let other of boids) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && d < perceptionRadius) {
          steering.add(other.velocity);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    separation(boids) {
      let perceptionRadius = 24;
      let steering = createVector();
      let total = 0;
      for (let other of boids) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && d < perceptionRadius) {
          let diff = p5.Vector.sub(this.position, other.position);
          diff.div(d * d);
          steering.add(diff);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    cohesion(boids) {
      let perceptionRadius = 50;
      let steering = createVector();
      let total = 0;
      for (let other of boids) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && d < perceptionRadius) {
          steering.add(other.position);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
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
  
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(separation);
    }
  
    update() {
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);
    }
    
    show(lostChild) {
      let alpha = (255 - dist(this.position.x, this.position.y, lostChild.pos.x, lostChild.pos.y))*2;

      push();
      noStroke();
      ambientMaterial(0, 0, 180, alpha);
      translate(this.position.x, this.position.y, this.position.z);
      box(random(45, 55), random(45, 55), random(85, 95));
      pop();

      push();
      noStroke();
      translate(this.position.x, this.position.y, this.position.z-15);
      ambientMaterial(0, 0, 50, alpha-180);
      rotateX(0);
      plane(80);
      pop();
    }
  }