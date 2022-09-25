import EnemyControl from "./EnemyControl.js"
import Player from "./Player.js";
import BulletControl from "./BulletControl.js";



const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "./galaga_css/imgs/space.png";

const playerBulletControl = new BulletControl(canvas, 10, 'red', false);//canvas, max of 15 bullets on screen at a time, color, sound enabled = false for now (update feature)
const enemyBulletControl = new BulletControl(canvas, 10, 'white', false); //canvas, number of bullets on screen (increase to increase difficulty for next level, false for no sound (will be an updated feature))
const enemyControl = new EnemyControl(canvas, enemyBulletControl, playerBulletControl);

const player = new Player(canvas, 3, playerBulletControl);

let isGameOver = false;
let didWin = false; 


function game () {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {// ! for the opposite (game is not over/bullet misses player)
    enemyControl.draw(ctx);
    player.draw(ctx);
    playerBulletControl.draw(ctx);
    enemyBulletControl.draw(ctx);//enemy randomly firing bullets
    // console.log(isGameOver);//should return true upon bullet hitting player
        }

    }


    function displayGameOver () {
        if (isGameOver) { 
            let text = didWin ? 'You Win!' : 'Game Over'; 
            let textOffset = didWin ? 3.5 : 5; 

            ctx.fillStyle = 'white';
            ctx.font = '70px Arial';//update to downloaded font
            ctx.fillText(text, canvas.width / text.Offset, canvas.height / 2);//WHY WON'T THIS PRINT?!?!?!?
        }

    }


    function checkGameOver (){
        if(isGameOver){
            return;
        }

        if(enemyBulletControl.bulletHits(player)){
            isGameOver = true;
        }

       if(enemyControl.enemyRows.length === 0){
        didWin = true;
        isGameOver = true;
       } 
    }

setInterval(game, 1000/60);


