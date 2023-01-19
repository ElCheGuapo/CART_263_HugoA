/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let Player1, Player2, Ball, Score1, Score2, gameStart;
let Balls = [];

let gameWidth = 800;
let gameHeight = 700;

/**
nada
*/
function preload() {

}

/**
init players, ball and game state
*/
function setup() {
    createCanvas(gameWidth, gameHeight);
    initPlayersAndBall();

    gameStart = false;
    Score1 = 0;
    Score2 = 0;
}

function initPlayersAndBall() {
    Player1 = new Player(50, gameHeight/2, 20, 200);
    Player2 = new Player(gameWidth - 50, gameHeight/2, 20, 200);
    let r = random(-10, 10);
    while (r <= 5, r >= -5) {
        r = random(-10, 10); 
    }
    let element = new Element(gameWidth/2, gameHeight/2, r, 0, 40);
    Balls.push(element);
}



function handleGame() {
    Player1.update();
    Player2.update();
    handleMovement();
    for (var i = 0; i < Balls.length; i++) {
        Balls[i].update();
        handleBallAndScore(Balls[i]);
        handleCollision(Balls[i]);
    }
    
}

function handleBallAndScore(ting) {
    if(ting.pos.x <= 0) {
        Score2 ++;
        resetBall(ting);
    } else if(ting.pos.x >= gameWidth) {
        Score1 ++;
        resetBall(ting);
    }
}

function resetBall(ting) {

    ting.pos.x = gameWidth/2;
    ting.pos.y = gameHeight/2;
    ting.vel.y = 0;
    let r = random(-10, 10);
    while (r <= 5, r >= -5) {
        r = random(-10, 10); 
    }
    ting.vel.x = r;
}

function handleCollision(Ball) {
    if(Ball.pos.y <= 0 || Ball.pos.y >= gameHeight) {
        Ball.vel.y *= -1;
    }

    if(Ball.vel.x < 0) {
        
        if(Ball.pos.x - Player1.pos.x <= 0) {
            if(Ball.pos.y <= Player1.pos.y + (Player1.dim.y/2) && Ball.pos.y >= Player1.pos.y - (Player1.dim.y/2)) {
                let tempNewVelY = Ball.pos.y - Player1.pos.y;
                Ball.vel.y = tempNewVelY/10;
                console.log(dist(Ball.pos.x, Ball.pos.y, Player1.pos.x, Player1.pos.y));
                Ball.vel.x *= -1.5;
            }
        }
    } else {
        if(Ball.pos.x - Player2.pos.x >= 0 && Ball.vel.x > 0) {
            if(Ball.pos.y <= Player2.pos.y + (Player2.dim.y/2) && Ball.pos.y >= Player2.pos.y - (Player2.dim.y/2)) {
                let tempNewVelY = Ball.pos.y - Player2.pos.y;
                Ball.vel.y = tempNewVelY/10;
                console.log(dist(Ball.pos.x, Ball.pos.y, Player2.pos.x, Player2.pos.y));
                Ball.vel.x *= -1.5;
            }
        }
    }
}

function keyPressed() {
    if(keyCode === 13) {
        gameStart = true;
    }
}

function handleMovement() {
    //Player1
    if(Player1.pos.y >= 0 && Player1.pos.y <= gameHeight){
        if (keyIsDown(87)) { //key w
            Player1.pos.y -= 15;
        } else if(keyIsDown(83)) { //key s
            Player1.pos.y += 15;
        }
    } else if (Player1.pos.y >= gameHeight) {
        Player1.pos.y -= 2;
    } else if (Player1.pos.y <= 0) {
        Player1.pos.y += 2;
    }
        

    if(Player2.pos.y >= 0 && Player2.pos.y <= gameHeight){
        //Player 2
        if (keyIsDown(UP_ARROW)) {
            Player2.pos.y -= 15;
        } else if (keyIsDown(DOWN_ARROW)) {
            Player2.pos.y += 15;
        }
    } else if (Player2.pos.y >= gameHeight) {
        Player2.pos.y -= 2;
    } else if (Player2.pos.y <= 0) {
        Player2.pos.y += 2;
    }
}


function drawUI() {
    push();
    textSize(30);
    strokeWeight(2);
    fill(250);

    textAlign(LEFT, TOP);
    text(Score1, 50, 50);

    textAlign(RIGHT, TOP);
    text(Score2, gameWidth-50, 50);
    pop();

    push();
    strokeWeight(2);
    fill(250);
    rect(gameWidth/2-5, 0, 10, gameHeight);
    pop();
}

/**
Description of draw()
*/
function draw() {
    if(gameStart) {
        background(20);
        drawUI();
        handleGame();
    } else {
        background(220);

        push();
        fill(250);
        textAlign(CENTER);
        text('Press Enter to start', 50, 50);
        pop();
    }
}