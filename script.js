const rabbit = document.getElementById("rabbit");
const stone = document.getElementById("stone");
const carrot = document.getElementById("carrot");

const scoreTxt = document.getElementById("score");
const levelTxt = document.getElementById("level");
const lifeTxt = document.getElementById("life");
const highTxt = document.getElementById("highscore");

const menu = document.getElementById("menu");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

const jumpSound = document.getElementById("jumpSound");
const coinSound = document.getElementById("coinSound");
const hitSound = document.getElementById("hitSound");
const bgMusic = document.getElementById("bgMusic");

document.getElementById("startBtn").onclick = startGame;

let score = 0;
let level = 1;
let life = 3;

let rabbitY = 120;
let jumping = false;

let stoneX = window.innerWidth;
let carrotX = window.innerWidth + 400;

let speed = 6;

let highscore = localStorage.getItem("highscore") || 0;
highTxt.innerHTML = highscore;

function startGame() {
    menu.style.display = "none";

    bgMusic.volume = 0.4;
    bgMusic.play().catch(()=>{});

    requestAnimationFrame(update);
}

function jump() {

    if(jumping) return;

    jumping = true;

    jumpSound.currentTime = 0;
    jumpSound.play();

    let up = setInterval(()=>{

        rabbitY += 10;

        rabbit.style.bottom = rabbitY + "px";

        if(rabbitY >= 260){

            clearInterval(up);

            let down = setInterval(()=>{

                rabbitY -= 10;

                rabbit.style.bottom = rabbitY + "px";

                if(rabbitY <= 120){

                    rabbitY = 120;
                    rabbit.style.bottom = "120px";

                    clearInterval(down);

                    jumping = false;

                }

            },20);

        }

    },20);

}

document.addEventListener("keydown",e=>{

    if(e.code=="Space")
        jump();

});

document.addEventListener("click",jump);

function update(){

    stoneX -= speed;

    if(stoneX < -80){

        stoneX = window.innerWidth + Math.random()*300;

    }

    stone.style.left = stoneX + "px";


    carrotX -= speed;

    if(carrotX < -80){

        carrotX = window.innerWidth + 400 + Math.random()*300;

    }

    carrot.style.left = carrotX + "px";


    // Ambil wortel

    if(

        carrotX < 170 &&
        carrotX > 80 &&
        rabbitY > 170

    ){

        carrotX = window.innerWidth + 500;

        score++;

        coinSound.currentTime = 0;
        coinSound.play();

        scoreTxt.innerHTML = score;

        if(score > highscore){

            highscore = score;

            localStorage.setItem("highscore",highscore);

            highTxt.innerHTML = highscore;

        }

        let newLevel = Math.floor(score/10)+1;

        if(newLevel != level){

            level = newLevel;

            levelTxt.innerHTML = level;

            speed += 1;

        }

    }


    // Tabrak batu

    if(

        stoneX < 170 &&
        stoneX > 80 &&
        rabbitY < 180

    ){

        stoneX = window.innerWidth + 300;

        life--;

        hitSound.currentTime = 0;
        hitSound.play();

        lifeTxt.innerHTML = life;

        if(life <= 0){

            endGame();

            return;

        }

    }

    requestAnimationFrame(update);

}

function endGame(){

    bgMusic.pause();

    finalScore.innerHTML = score;

    gameOver.style.display = "flex";

}

function restartGame(){

    location.reload();

}
