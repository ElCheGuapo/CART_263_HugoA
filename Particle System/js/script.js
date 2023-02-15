/**
Can't Find it's Mother
Hugo Agnola
40116274


*/

"use strict";
//particles for lost child
let particles = [];

//boid particles WIP
let boidParticles = [];

//boid array
const flock = [];

//misc variables
let angleY, angleX, cam, lostChild, HDRI, floorTexture1,grassPatch1;

//cam settings
let camMovement = {
  x: 0,
  y: 0
};

/**
load skydome texture, load floor texture, load test grass patch (not implemented)
*/
function preload() {
  HDRI = loadImage('assets/images/sky2.png');
  floorTexture1 = loadImage('assets/images/grass1.png');
  grassPatch1 = loadImage('assets/images/grassModel1.png');
}

/**
make canvas as 3D, create the lost child object, create the boid flock, set original angle of rotating sky dome
*/
function setup() {
  createCanvas(1000, 600, WEBGL);
  lostChild = new Child(0, 0, 0);
  lostChild.setVel();
  createFlock();

  angleX = 0.7;
  angleY = 0.7;
}

//particle system for lost child.
function childParticleSystem() {
    let p;
    for (let i = 0; i < 2; i++) {
        p = new Particle(lostChild.pos.x, lostChild.pos.y, 20);
        particles.push(p);
    }

    for (p of particles) {
        p.update();
        p.show();
        if(p.end()) {
            particles.splice(p, 1);
        }
    }
}

//create array of boids.
function createFlock() {
  for (let i = 0; i < 40; i++) {
    flock.push(new Boid());
  }
}

//update and handle all boid agents within the array
function handleBoids() {
    let p;
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock, lostChild);
        boid.update();
        boid.show(lostChild);
    }  
}

function scene() {
  ambientLight(255, 255, 220);
  pointLight(255, 255, 220, 0, 100, 600);

  //sky HDRI
  push();
  rotateX(angleX);
  rotateY(angleY);
  translate(0, 0, 0);
  noStroke();
  texture(HDRI);
  sphere(1500);
  pop();

  //ground plane
  push();
  translate(0, 0, 0);
  noStroke();
  texture(floorTexture1);
  plane(4000);
  pop();

  angleX += 0.0005;
  angleY += 0.0001;
}


//lock camera on child, and update class
function handleLostChild() {
  lostChild.update();
  camMovement.x += lostChild.vel.x;
  camMovement.y += lostChild.vel.y;
}


function draw() {
  background(20);
  rectMode(CENTER);

  //setup 3D camera
  cam = createCamera();
  cam.move(0 + lostChild.pos.x, 800+ lostChild.pos.y, -250);
  cam.tilt(-1.5);

  //rotateZ(0.4);
  scene();
  handleLostChild();
  handleBoids();
  childParticleSystem();
  
}