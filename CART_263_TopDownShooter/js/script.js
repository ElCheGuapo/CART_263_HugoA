/**
Fightopia Frenzy
Hugo Agnola, Gaberiel Nicholas Garces
*/

"use strict";

let player, toggles;
let players = [];
let inv = [];
let assets = [];

/**
Description of preload
*/
function preload() {

}
//fix the libraries

/**
Description of setup
*/
function setup() {
    createCanvas(1000, 700);
    createPlayer();
    createScene();

    toggles = {
        toggleInv: false,
        toggleReload: false,
        toggleMap: false,
        toggleOverworld: true
    }
}

function createPlayer() {
    player = new Player(width/2, height/2, 30, 100, 10, inv);
}

function createScene() {
    let newAsset = new SceneAsset(100, 100, 70, 70);
    assets.push(newAsset);
}

function fetchOtherPlayers() {


}

function keyPressed() {

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.vel.x = -player.spd;
    } else if (keyCode === RIGHT_ARROW) {
        player.vel.x = player.spd;
    }

    if (keyCode === UP_ARROW) {
        player.vel.y = -player.spd;
    } else if (keyCode === DOWN_ARROW) {
        player.vel.y = player.spd;
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW && player.vel.x != 0) {
        player.vel.x += player.spd;
    }
    if (keyCode === RIGHT_ARROW && player.vel.x != 0) {
        player.vel.x -= player.spd;
    }
    if (keyCode === UP_ARROW && player.vel.y != 0) {
        player.vel.y += player.spd;
    }
    if (keyCode === DOWN_ARROW && player.vel.y != 0) {
        player.vel.y -= player.spd;
    }
}

function handleUI() {
    if (toggles.toggleOverworld) {
        push();
        fill(50);
        rect(width - 150, height - 75, 100, 25);

        fill(50);
        rect(width - 150, height - 75, player.hp/100, 25);
        pop();
    }
}

//GAMEPLAY HANDLERS
function handlePlayerOne() {
    player.update();
}

function handleScene() {
    for(var i = 0; i < assets.length; i++) {
        assets[i].display();
    }
}

function handlePlayerCollisions() {
    for(var i = 0; i < assets.length; i++) {
        let d = dist(
            player.center.x, 
            player.center.y, 
            assets[i].pos.x + assets[i].dimensions.x/2, 
            assets[i].pos.y + assets[i].dimensions.y/2
        );

        if(d <= assets[i].dimensions.x/2 + player.size) {

            player.pos.x -= player.vel.x;
            player.pos.y -= player.vel.y;

            player.vel.x = 0;
            player.vel.y = 0;
            
        } 
    }
}

function playGame() {
    handleScene();
    handlePlayerCollisions();
    handlePlayerOne();

}

/**
Description of draw()
*/
function draw() {
    background(200);

    playGame();    
    camera.x = player.pos.x;
    camera.y = player.pos.y;

    camera.off();
    handleUI();
}