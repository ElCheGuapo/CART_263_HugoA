class Enemy {
  constructor(x, y, size, sprite, sprite2, hp) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.totalHP = hp;
    this.hp = hp;
    this.sprite = sprite;
    this.sprite2 = sprite2;
    this.size = size;
    this.flipE = false;
  }

  update() {
    this.display();
    this.pos.add(this.vel);
    this.flip();
  }

  flip() {
    if(this.vel.x < 0) {
      this.flipE = true;
      //console.log(this.flipE);
    } else if(this.vel.x > 0) {
      this.flipE = false;
    }
  }

  display() {
    if(this.flipE) {
      push();
      image(this.sprite2, this.pos.x, this.pos.y, this.size, this.size);
      pop();
    } else {
      push();
      image(this.sprite, this.pos.x, this.pos.y, this.size, this.size);
      pop();
    }
    push();
    fill(0);
    rect(this.pos.x-20, this.pos.y - this.size/2, this.size+20, 20);
    fill(255, 50, 50);
    rect(this.pos.x-20, this.pos.y - this.size/2, (this.size+20)*(this.hp/this.totalHP), 20);
    pop();

  }
}
