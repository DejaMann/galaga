import EnemyControl from "./EnemyControl.js"
import Player from "./Player.js";
import BulletControl from "./BulletControl.js";



const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "./galaga_css/imgs/space.jpg";

const playerBulletControl = new BulletControl(canvas, 10, 'red', true);//canvas, max of 15 bullets on screen at a time, color, sound enabled = true 
const enemyBulletControl = new BulletControl(canvas, 4, 'white', false);
const enemyControl = new EnemyControl(canvas, enemyBulletControl, playerBulletControl);

const player = new Player(canvas, 3, playerBulletControl);

let isGameOver = false;
let didWin = false


function game () {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {// ! for the opposite (game is not over/bullet misses player)
    enemyControl.draw(ctx);
    player.draw(ctx)
    playerBulletControl.draw(ctx);
    enemyBulletControl.draw(ctx);//enemy randomly firing bullets
    // console.log(isGameOver);//should return true upon bullet hitting player
        }

    }


    function displayGameOver() {
        if (isGameOver) {
            let text = didWin ? 'You Win!' : 'Game Over';
            
        }

    }


    function checkGameOver (){
        if(isGameOver){
            return;
        }

        if(enemyBulletControl.bulletHits(player)){
            isGameOver = true;
        }
    }

setInterval(game, 1000/60);


