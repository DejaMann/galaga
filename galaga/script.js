import EnemyControl from "./EnemyControl.js"

const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image ();
background.src = "/imgs/space.jpg";

const enemyControl = new enemyControl(canvas);


function game () {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyControl.draw(ctx);
}

setInterval(game, 1000/60);








// const ship = document.getElementById('ship')
// const firstEnemy = []

// ship = () => {//ship starting position, bottom middle of screen
//     this.x = width/2
//     this.move = function(arrow) {
//         this.x += (arrow)
//     }

// }

// firstEnemy = () => {//ship starting position, bottom middle of screen
//     this.x = width/2
// }


// keyPressed = () => {
//     if (keyCode === 'ArrowLeft') {
//         ship.move(-1);
//     } else if (keyCode === 'ArrowRight') {
//         ship.move(1)

// }





// const secondEnemy
// const thirdEnemy
