/**
Ghost Gunners
Hugo Agnola and Gabriel Garces
In this game, two players compete to get the highest score possible within the time constraints.
*/

let player, noAmoSFX, shootSFX, reloadSFX, playerHitSFX, enemyHitSFX, buySFX, bg, fireTrig, spawnTrig, timer, 
  pixelFont, waveAmnt, score, kills, 
  playerIdle, playerRuning, playerIdle1, playerRuning1, 
  player2Idle, player2Idle1, player2Runing, player2Runing1, 
  enemyRuning, enemyRuning2, 
  gameOver, dmgBorder, displayBorder, playerReloading, flip, vendingMachineSprite, tree1, tree2, tree3, car1, car2, car3, rock1, rock2, tombstone, cityBG, gameTimer, player2Joined, winner, lost;

let enemies = [];
let bullets = [];
let enemyBullets = [];
let assets = [];

let reloadTimer = {
  timeStart: 0
}

let player2 = {
  posX: 0,
  posY: 0,
  flip: false,
  isMoving: false,
  score: 0,
  gameOver: false,
  lost: false
}

let vendingMachine = {
  magPrice: 50,

  posX: 1390,
  posY: 1390
}

var SCENE_W = 1650;
var SCENE_H = 1650;

var socket;

"use strict";

/** _____________________
    Description of preload()
    _____________________
*/

function preload() {
  //images
  playerIdle = loadImage('assets/images/Waltuh/wolt.gif');
  playerRuning = loadImage('assets/images/Waltuh/woltron.gif');

  playerIdle1 = loadImage('assets/images/Waltuh/woltIdle.gif');
  playerRuning1 = loadImage('assets/images/Waltuh/woltron2.gif');


  player2Idle = loadImage('assets/images/Jesse/Yessistand.gif');
  player2Runing = loadImage('assets/images/Jesse/yessirun.gif');

  player2Idle1 = loadImage('assets/images/Jesse/yessiidle.gif');
  player2Runing1 = loadImage('assets/images/Jesse/yessirun2.gif');


  enemyRuning = loadImage('assets/images/runningEnemy.gif');
  enemyRuning2 = loadImage('assets/images/runningEnemy2.gif');

  dmgBorder = loadImage('assets/images/bloodBorder.png');
  bg = loadImage('assets/images/BG.png');
  cityBG = loadImage('assets/images/cityBG.png');
  vendingMachineSprite = loadImage('assets/images/VendingMachine.png');
  tree1 = loadImage('assets/images/Trees/Tree1.png');
  tree2 = loadImage('assets/images/Trees/Tree2.png');
  tree3 = loadImage('assets/images/Trees/Tree3.png');

  car1 = loadImage('assets/images/Cars/car1.png');
  car2 = loadImage('assets/images/Cars/car2.png');
  car3 = loadImage('assets/images/Cars/truck.png');

  rock1 = loadImage('assets/images/Rocks/Rock1.png');
  rock2 = loadImage('assets/images/Rocks/Rock2.png');

  tombstone = loadImage('assets/images/Tombstone.png');

  //fonts
  pixelFont = loadFont('assets/fonts/Coolville.ttf');

  //sounds
  noAmoSFXnoAmoSFX = loadSound('assets/sounds/outOfAmoSFX.mp3');
  shootSFX = loadSound('assets/sounds/shootSFX.mp3');
  reloadSFX = loadSound('assets/sounds/reloadSFX.mp3');
  playerHitSFX = loadSound('assets/sounds/playerHIT.mp3');
  enemyHitSFX = loadSound('assets/sounds/enemyHIT.mp3');
  buySFX = loadSound('assets/sounds/buySFX.mp3');
}

/** _____________________
    Description of setup()
    _____________________
*/

function setup() {
  createCanvas(1920, 900);

  createPlayer1();
  createAssets();

  //GAMEPLAY VARS
  waveAmnt = 5;
  score = 0;
  kills = 0;
  fireTrig = false;
  spawnTrig = false;
  gameOver = false;
  playerReloading = false;
  displayBorder = false;
  flip = false;
  player2Joined = false;
  lost = false;
  timer = 0;
  gameTimer = 100000;

  //CREATE IN-GAME TIMER
  setInterval(function() {
    for (let i = 0; i <= 5; i++) {
      timer++;
    }
    if(player2Joined && !player2.gameOver && !gameOver) {
      gameTimer--;
    }
  }, 10);

  //SETUP SOCKET EMITER + ENDPOINT
  socket = io.connect('http://hugos-macbook-air.local:3000/');
  socket.on('otherPlayer', function(playerData) {
    player2.posX = playerData.posX;
    player2.posY = playerData.posY;
    player2.flip = playerData.flipped;
    player2.isMoving = playerData.isMoving;
    player2.score = playerData.pScore;
    player2.lost = playerData.lost;
    player2.gameOver = playerData.gameOver;

    player2Joined = true;
  });

  setInterval(emitData, 50);
}

//emit player data to server
function emitData() {

  var playerData = {
    posX: player.pos.x,
    posY: player.pos.y,
    flipped: flip,
    isMoving: player.playerIsMoving,
    pScore: score,
    gameOver: gameOver,
    lost: lost
  }

  //console.log("sending data to server: "+ playerData);
  socket.emit('player', playerData);
}

//setup player object
function createPlayer1(){
  let amo = {
    amoTotal: 45,
    amoInMag: 15
  };

  player = new Player(SCENE_W-150, SCENE_H-150, 70, 100, playerIdle, playerRuning, playerIdle1, playerRuning1, amo);
}

//create scene
function createAssets() {
  let GraveStone1 = new sceneAsset(680, 1375, 50, 60, tombstone);
  let GraveStone2 = new sceneAsset(620, 1375, 50, 60, tombstone);
  let GraveStone3 = new sceneAsset(620, 1525, 50, 60, tombstone);
  let GraveStone4 = new sceneAsset(680, 1525, 50, 60, tombstone);
  let GraveStone5 = new sceneAsset(620, 1675, 50, 50, tombstone);
  let GraveStone6 = new sceneAsset(680, 1675, 50, 50, tombstone);

  let GraveStone7 = new sceneAsset(380, 1375, 50, 60, tombstone);
  let GraveStone8 = new sceneAsset(440, 1375, 50, 60, tombstone);
  let GraveStone9 = new sceneAsset(380, 1525, 50, 60, tombstone);
  let GraveStone10 = new sceneAsset(440, 1525, 50, 60, tombstone);
  let GraveStone11 = new sceneAsset(380, 1675, 50, 50, tombstone);
  let GraveStone12 = new sceneAsset(440, 1675, 50, 50, tombstone);

  let vehicle1 = new sceneAsset(273, 250, 200, 100, car1);
  let vehicle2 = new sceneAsset(880, 285, 200, 100, car3);
  let vehicle3 = new sceneAsset(1490, 320, 200, 100, car2);

  let Wood1 = new sceneAsset(248, 728, 150, 200, tree2);
  let Wood2 = new sceneAsset(635, 555, 150, 200, tree1);
  let Wood3 = new sceneAsset(636, 1140, 150, 200, tree3);
  let Wood4 = new sceneAsset(132, 1220, 150, 200, tree1);
  let Wood5 = new sceneAsset(1504, 988, 150, 200, tree2);
  let Wood6 = new sceneAsset(1095, 552, 150, 200, tree3);
  let Wood7 = new sceneAsset(208, 344, 150, 200, tree2);
  let Wood8 = new sceneAsset(1232, 0, 150, 200, tree1);
  let Wood9 = new sceneAsset(664, 0, 150, 200, tree3);
  let Wood10 = new sceneAsset(80, 0, 150, 200, tree1);
  let Wood11 = new sceneAsset(1200, 996, 150, 200, tree3);

  let Stone1 = new sceneAsset(76, 1650, 85, 85, rock1);
  let Stone2 = new sceneAsset(420, 1106, 70, 70, rock2);
  let Stone3 = new sceneAsset(1584, 640, 85, 85, rock1);
  let Stone4 = new sceneAsset(1532, 890, 80, 80, rock1);
  let Stone5 = new sceneAsset(1300, 660, 90, 90, rock2);
  let Stone6 = new sceneAsset(976, 952, 90, 90, rock1);
  let Stone7 = new sceneAsset(568, 504, 90, 90, rock1);
  let Stone8 = new sceneAsset(1228, 1160, 90, 90, rock2);
  let Stone9 = new sceneAsset(1556, 132, 80, 80, rock2);
  let Stone10 = new sceneAsset(68, 692, 65, 65, rock1);
  let Stone11 = new sceneAsset(360, 80, 70, 70, rock2);
  let Stone12 = new sceneAsset(692, 856, 80, 80, rock1);
  let Stone13 = new sceneAsset(772, 1376, 75, 75, rock1);
  let Stone14 = new sceneAsset(1000, 1650, 80, 80, rock2);

  let V_Mashine = new sceneAsset(1370, 1375, 100, 100, vendingMachineSprite);

  assets.push(GraveStone1);
  assets.push(GraveStone2);
  assets.push(GraveStone3);
  assets.push(GraveStone4);
  assets.push(GraveStone5);
  assets.push(GraveStone6);
  assets.push(GraveStone7);
  assets.push(GraveStone8);
  assets.push(GraveStone9);
  assets.push(GraveStone10);
  assets.push(GraveStone11);
  assets.push(GraveStone12);

  assets.push(vehicle1);
  assets.push(vehicle2);
  assets.push(vehicle3);

  assets.push(Wood1);
  assets.push(Wood2);
  assets.push(Wood3);
  assets.push(Wood4);
  assets.push(Wood5);
  assets.push(Wood6);
  assets.push(Wood7);
  assets.push(Wood8);
  assets.push(Wood9);
  assets.push(Wood10);
  assets.push(Wood11);

  assets.push(Stone1);
  assets.push(Stone2);
  assets.push(Stone3);
  assets.push(Stone4);
  assets.push(Stone5);
  assets.push(Stone6);
  assets.push(Stone7);
  assets.push(Stone8);
  assets.push(Stone9);
  assets.push(Stone10);
  assets.push(Stone11);
  assets.push(Stone12);
  assets.push(Stone13);
  assets.push(Stone14);

  assets.push(V_Mashine);
}

//player shoot
function mousePressed() {
  playerShoot();
}

//spawn enemies based on wave algorithm
function enemySpawnTimer() {
  if (timer % 500 === 0 && enemies.length < waveAmnt) {
    createEnemies();
  }
}

//create enemy object
function createEnemies() {
  let Ex = random(0, 10);
  if (Ex > 5) {
    Ex = SCENE_W;
  } else if (Ex < 5) {
    Ex = 0;
  }
  let Ey = random(0, SCENE_H);

  let enemy = new Enemy(10, Ey, 70, enemyRuning, enemyRuning2, 100+(kills*3));
  enemies.push(enemy);
}

//pew pew for all enemies
function enemyShoot() {
  if (enemies.length > 0 && timer % 300 === 0) {
    for (let enemy of enemies) {
      let v = createVector(player.pos.x - enemy.pos.x, player.pos.y - enemy.pos.y);
      v.normalize();
      v.mult(13);

      let bullet = {
        pos: createVector(enemy.pos.x + 50, enemy.pos.y + 50),
        vel: v
      };
      enemyBullets.push(bullet);
    }
  }
}

//create bullet for player shooting
function playerShoot() {
  if(player.amo.amoInMag > 0 || playerReloading){
    let v = createVector(camera.mouseX - (player.pos.x+player.size/2), camera.mouseY - (player.pos.y+player.size/2));
    v.normalize();
    v.mult(20);

    player.amo.amoInMag -= 1;

    let bullet = {
      pos: createVector(player.pos.x + 50, player.pos.y + 50),
      vel: v
    };
    // socket.emit('newBullet', bullet);
    bullets.push(bullet);
    shootSFX.play();
    //console.log(bullets);
  } else {
    noAmoSFX.play();
  }
}

//move enemies based on distance from player
function enemyMovement() {
  for (let enemy of enemies) {
    let d = dist(enemy.pos.x, enemy.pos.y, player.pos.x, player.pos.y);
    if(enemies.length > 0) {
      if (enemy.pos.x < 600 || enemy.pos.x > 1000 && d <= 200) {
        let v = createVector(player.pos.x - enemy.pos.x, player.pos.y - enemy.pos.y);
        v.normalize();
        v.mult(0.2*score);
        enemy.vel = v;
      }
      if(d >= 1500) {
        enemy.splice;
      }
    }
  }
}

//select appropriate sprite for player
function flipPlayer() {
  if(player.playerIsMoving) {
    if(camera.mouseX < player.pos.x) {
      flip = true;
      player.currentSprite = player.spriteRun1;
    } else {
      flip = false;
      player.currentSprite = player.spriteRun;
    }
  } else {
    if(camera.mouseX < player.pos.x) {
      flip = true;
      player.currentSprite = player.spriteIdle1;
    } else {
      flip = false;
      player.currentSprite = player.spriteIdle;
    }
  }
}

//move player with WASD
function playerMovement() {
  if (keyIsDown(65)) {
    player.pos.add(-4, 0);
    player.playerIsMoving = true;
  }

  if (keyIsDown(68)) {
    player.pos.add(4, 0);
    player.playerIsMoving = true;
  }

  if (keyIsDown(87)) {
    player.pos.add(0, -4);
    player.playerIsMoving = true;
  }

  if (keyIsDown(83)) {
    player.pos.add(0, 4);
    player.playerIsMoving = true;
  }
}

//reset player moving variable (for sprite changing)
function keyReleased() {
  player.playerIsMoving = false;
}


function keyPressed() {

  //if game over: any input = reset
  if(gameOver) {
    player.amo.amoInMag = 15;
    player.amo.amoTotal = 45;
    player.hp = 100;
    waveAmnt = 5;
    score = 0;
    gameTimer = 10000;
    winner = "null";

    fireTrig = false;
    spawnTrig = false;
    timer = 0;

    setTimeout(function() {
      gameOver = false;
    }, 1000);
  }

  //reload amo
  if (key === 'r' && player.amo.amoInMag<15 && !playerReloading && player.amo.amoTotal > 0) {
    reloadTimer.timeStart = timer;
    console.log(player.pos);
    reloadSFX.play();
    playerReloading = true;
  }
  
  //dist between player and vending machine;
  let d = dist(player.pos.x+(player.size/2), player.pos.y+(player.size/2), 1420, 1425);
  
  //Buy from vending machine
  if(key === 'e' && d <= 150) {
    if(score >= 8) {
      player.amo.amoTotal += 15;
      score -= 8;
      buySFX.play();
    }
  }

}

//check if enemies are hit by player bullets
function bulletCollisionEnemy() {
  for (let enemy of enemies) {
    for (let bullet of bullets) {

      /**
      FIX THIS ISSUE :
      >>>>>> Uncaught TypeError: Cannot read properties of undefined (reading 'pos') <<<<<<
      */

      let d = dist(bullet.pos.x, bullet.pos.y, enemy.pos.x + 50, enemy.pos.y + 50);

      if (d < enemy.size / 2) {
        //calc dmg + play sfx + remove bullet
        enemy.hp -= 70;
        enemyHitSFX.play();
        bullets.splice(bullets.indexOf(bullet), 1);

        //kill enemy
        if(enemy.hp <= 0) {
          enemies.splice(enemies.indexOf(enemy), 1);
          kills += 1;
          bullets.splice(bullets.indexOf(bullet), 1);
        }

        score ++;
      }
    }
  }
}

//check if player is hit by an enemy bullet
function bulletCollisionPlayer() {
  for (let bullet of enemyBullets) {
    //dist between bullet and player
    let d = dist(bullet.pos.x, bullet.pos.y, player.pos.x + 50, player.pos.y + 50);

    //check if in hitbox
    if (d < player.size / 2) {
      displayBorder = true;
      enemyBullets.splice(enemyBullets.indexOf(bullet), 1);
      //dmg player + play sfx + display hit border
      player.hp -= 10;
      playerHitSFX.play();
      setTimeout(function() {
        displayBorder = false;
      }, 500);
    }
  }
}

//check if enemy is touching player
function physicalCollisionPlayer() {
  for (let enemy of enemies) {
    let d = dist(enemy.pos.x, enemy.pos.y, player.pos.x + 50, player.pos.y + 50);

    if (d < player.size / 2) {
      displayBorder = true;
      enemies.splice(enemies.indexOf(enemy), 1);
      player.hp -= 10;
      playerHitSFX.play();
      setTimeout(function() {
        displayBorder = false;
      }, 500);
    }
  }
}

//dmg vfx
function displayDMGBorder() {
  if(displayBorder) {
    camera.off();
    push();
    image(dmgBorder, 0, 0, width, height);
    pop();
  }
}

function handleEnemyWaves() {
  //increase wave cap by one every 10 points in 'score'
  let waveNumber = (waveAmnt - 5);
  if ((waveNumber * 5) < score && score % 5 === 0) {
    waveAmnt ++;
  }
}

//player handler function
function handlePlayer() {
  //move display and check for dmg functions
  player.update();
  playerMovement();
  flipPlayer();
  bulletCollisionPlayer();

  //handle player reloading
  if(playerReloading) {
    if(reloadTimer.timeStart + 500 <= timer) {

      let bulletsReloaded = 15 - player.amo.amoInMag;

      if(player.amo.amoTotal < bulletsReloaded) {

        player.amo.amoInMag += player.amo.amoTotal;
        player.amo.amoTotal = 0;
        playerReloading = false;
      } else {

        player.amo.amoInMag += bulletsReloaded;
        player.amo.amoTotal -= bulletsReloaded;
        playerReloading = false;
      }

    }
  }
}

function handlePlayer2() {
  //console.log(player2);
  push();
  if(player2.flip) {
    if(player2.isMoving) {
      image(player2Runing1, player2.posX, player2.posY, player.size, player.size);
    } else {
      image(player2Idle1, player2.posX, player2.posY, player.size, player.size);
    }
  } else {
    if(player2.isMoving) {
      image(player2Runing, player2.posX, player2.posY, player.size, player.size);
    } else {
      image(player2Idle, player2.posX, player2.posY, player.size, player.size);
    }
  }
  pop();

  if(player2.lost) {
    gameOver = true;
    winner = "Player 1";
  }
}

// everything that has to do with the enemies
function handleEnemies() {
  //check if spawn
  enemySpawnTimer();
  handleEnemyWaves();

  //move the enemies
  for (let enemy of enemies) {
    let d = dist(enemy.pos.x, enemy.pos.y, player.pos.x, player.pos.y);
    enemy.update();
    enemyMovement();
    if (d <= 300) {
      enemyShoot();
    }
    bulletCollisionEnemy();
  }
  if(enemies.length === 0 && enemies.length <= waveAmnt) {
    createEnemies();
  }
}

//update the bullets
function handleBullets() {
  //display bullets
  if (bullets.length > 0) {
    for (let bullet of bullets) {
      fill(200, 100, 100);
      circle(bullet.pos.x, bullet.pos.y, 10);
      bullet.pos.add(bullet.vel);
    }
  }

  //display enemy bullets
  if (enemyBullets.length > 0) {
    for (let bullet of enemyBullets) {
      fill(200, 100, 100);
      circle(bullet.pos.x, bullet.pos.y, 10);
      bullet.pos.add(bullet.vel);
    }
  }
  removeBullet();
}

//make sure player cannot pass through objects in scene
function handleEnvCollision(asset) {
  let d = dist(asset.pos.x+(asset.size.x/2), asset.pos.y+(asset.size.y/2), player.pos.x+(player.size/2), player.pos.y+(player.size/2));

  //if player is on the top of asset
  if (player.pos.y+(player.size/2) <= asset.pos.y+(asset.size.y/2)) {
    if(d <= player.size) {
      player.pos.y -= 4;
    }
  //if player is on the bottom of asset
  }
  if(player.pos.y+(player.size/2) >= asset.pos.y+(asset.size.y/2)) {
    if(d <= player.size) {
        player.pos.y += 4;
    }//if player is on the left of asset
  }
  if (player.pos.x+(player.size/2) <= asset.pos.x+(asset.size.x/2)) {
    if(d <= player.size) {
    player.pos.x -= 4;
  }
  //if player is on the right of asset
  }
  if(player.pos.x+(player.size/2) >= asset.pos.x+(asset.size.x/2)) {
    if(d <= player.size) {
    player.pos.x += 4;
    }
  }
}

//display the environment
function handleEnv() {
  for(let asset of assets) {
    push();
    fill(0);
    image(asset.sprite, asset.pos.x, asset.pos.y, asset.size.x, asset.size.y);
    pop();

    handleEnvCollision(asset);
  }
  handleVendingMachine();
}

//display vending machine
function handleVendingMachine() {
  //dist between player and vending machine;
  let d = dist(player.pos.x+(player.size/2), player.pos.y+(player.size/2), 1420, 1425);

  //if player is close enough have text appear above player to indicate they can buy
  if(d <= 150) {
    push();
    textFont(pixelFont);
  
    textSize(30);
    fill(255, 150, 150);
    text("Press e To Buy Amo", player.pos.x, player.pos.y-50, 250, 300);
  
    textSize(30);
    fill(20, 250, 0);
    text("Press e To Buy Amo", player.pos.x, player.pos.y-50, 250, 300);
  
    pop();
  }
}

//check if bullet should be removed
function removeBullet() {
  for (let bullet of bullets) {
    if(bullet.x < 0 || bullet.x > width) {
      bullets.splice(indexOf(bullet), 1);
    } else if(bullet.y < 0 || bullet.y > height) {
      bullets.splice(indexOf(bullet), 1);
    }
  }
}

//glue p5play camera to player pos
function handleCamera() {
  camera.zoom = 1.8;
  //
  camera.position.x = player.pos.x;
  camera.position.y = player.pos.y;

  //limit the ghost movements
  if(player.pos.x < 0)
    player.pos.x = 0;
  if(player.pos.y < 0)
    player.pos.y = 0;
  if(player.pos.x > SCENE_W)
    player.pos.x = SCENE_W;
  if(player.pos.y > SCENE_H)
    player.pos.y = SCENE_H;
}

//display all necessary ui
function handleUI() {
  //display health points
  push();
  textFont(pixelFont);
  textSize(100);
  //shadow
  fill(40, 40, 40);
  text(player.hp, width - 295, 100, 100, 100);

  //main
  fill(20, 250, 0);
  text(player.hp, width - 300, 100, 100, 100);
  pop();

  //display score player 1
  push();
  textFont(pixelFont);
  textSize(100);
  //shadow
  fill(100, 100, 255);
  text("score: " + score, 145, 60, 500, 100);
  
  //main
  fill(0, 20, 255);
  text("score: " + score, 140, 60, 500, 100);
  pop();

  //display time left
  push();
  textFont(pixelFont);
  textSize(60);
  //shadow
  fill(10, 10, 50);
  text("time left: " + gameTimer, width/2-100, 60, 500, 100); 

  //main
  fill(0, 190, 250);
  text("time left: " + gameTimer, width/2-98, 60, 500, 100); 
  pop();

  //display score player 2
  push();
  textFont(pixelFont);
  textSize(40);
  //shadow
  fill(100, 100, 255);
  text("P2 score: " + player2.score, 245, 125, 500, 100); 

  //main
  fill(0, 20, 255);
  text("P2 score: " + player2.score, 240, 125, 500, 100);  
  pop();

  //display amo
  push();
  textFont(pixelFont);
  textSize(50);
  //shadow
  fill(0, 0, 0);
  text(player.amo.amoInMag + " / " + player.amo.amoTotal, 150, height - 60, 500, 100);
  
  //main
  fill(200, 0, 0);
  text(player.amo.amoInMag + " / " + player.amo.amoTotal, 145, height - 60, 500, 100);
  textSize(50);
  pop();

  displayDMGBorder();
}

//keep player within bounds
function handleBorders() {
  map(player.pos.x, 0, SCENE_W);
  map(player.pos.y, 0, SCENE_H);
}

/** _____________________
    Description of draw()
    _____________________
*/

function draw() {
  if(player.hp <= 0) {
    gameOver = true;
    lost = true;
    winner = "Player 2";
  } else if(player2.gameOver) {
    gameOver = true;
    winner = "Player 1";
  }

  if(!gameOver) {
    background(0);
    image(bg, 50, 50, SCENE_W, SCENE_H);
    image(cityBG, 100, -550, SCENE_W, 600);

    handleEnv();

    handlePlayer();
    handlePlayer2();
    handleEnemies();
    
    handleBorders();

    handleBullets();
    handleCamera();
  }

  camera.off();
  handleUI();

  if(gameTimer <= 0) {
    gameOver = true;
    if(player2.score > score) {
      winner = "Player 2";
    }
  }

  if(gameOver) {
    camera.off();
    enemies = [];
    bullets = [];
    enemyBullets = [];

    push();
    textFont(pixelFont);
    fill(20);
    rect(0, 0, width, height);
    fill(255, 50, 50);
    textSize(50);
    text("Kills: " + kills, width/2-100, height/2-350, 300, 200);
    textSize(50);
    text("Score: " + score, width/2-100, height/2-300, 300, 200);
    textSize(100);
    text("GAME\nOVER", width/2-100, height/2-200, 100, 200);

    textSize(60);
    text(winner + " Wins!", width/2-175, height/2, 500, 200);
    textSize(30);
    text("score: " + player2.score, width/2-150, height/2+50, 550, 200);

    textSize(30);
    fill(255, 50, 50);
    text("press any key to continue", width/2-80, height/2+200, 200, 400);
    pop();
  }
}