// ===============================
// KELINCI LOMPAT - SCRIPT BAGIAN 1
// ===============================

// Objek
const rabbit = document.getElementById("rabbit");
const carrot = document.getElementById("carrot");
const stone = document.getElementById("stone");

// HUD
const scoreTxt = document.getElementById("score");
const levelTxt = document.getElementById("level");
const lifeTxt = document.getElementById("life");
const highTxt = document.getElementById("highscore");

const menu = document.getElementById("menu");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

// Audio
const jumpSound = document.getElementById("jumpSound");
const coinSound = document.getElementById("coinSound");
const hitSound = document.getElementById("hitSound");
const bgMusic = document.getElementById("bgMusic");

// Tombol
document.getElementById("startBtn").onclick = startGame;

// ===============================
// DATA GAME
// ===============================

let score = 0;
let level = 1;
let life = 3;

let speed = 6;

let gameRunning = false;

// Physics

let rabbitY = 120;
let velocity = 0;
const gravity = 0.8;
let onGround = true;

// Posisi

let stoneX = window.innerWidth;
let carrotX = window.innerWidth + 500;

// Highscore

let highscore = localStorage.getItem("highscore") || 0;
highTxt.innerHTML = highscore;

// ===============================
// START GAME
// ===============================

function startGame(){

    menu.style.display = "none";

    gameRunning = true;

    bgMusic.volume = 0.4;

    bgMusic.play().catch(()=>{});

    requestAnimationFrame(update);

}

// ===============================
// LOMPAT
// ===============================

function jump(){

    if(!gameRunning) return;

    if(!onGround) return;

    velocity = 15;

    onGround = false;

    jumpSound.currentTime = 0;

    jumpSound.play();

}

// Keyboard

document.addEventListener("keydown",function(e){

    if(e.code==="Space"){

        jump();

    }

});

// HP

document.addEventListener("touchstart",function(){

    jump();

});

// Mouse

document.addEventListener("mousedown",function(){

    jump();

});

// ===============================
// UPDATE PLAYER
// ===============================

function updatePlayer(){

    velocity -= gravity;

    rabbitY += velocity;

    if(rabbitY <= 120){

        rabbitY = 120;

        velocity = 0;

        onGround = true;

    }

    rabbit.style.bottom = rabbitY + "px";

}
