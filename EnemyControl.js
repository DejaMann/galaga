import Enemy from "./Enemy.js";
import EnemyMove from "./EnemyMove.js"

export default class EnemyControl {
    
    enemyArr = [ 
        [0, 1, 1, 2, 3, 3, 2, 1, 1, 0],
        [1, 2, 2, 3, 3, 3, 3, 2, 2, 1],
        [1, 2, 2, 3, 3, 3, 3, 2, 2, 1],
        [1, 2, 2, 2, 3, 3, 2, 2, 2, 1],
    ];
    
    enemyRows = [];

    currentDirection = EnemyMove.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultxVelocity = 1;
    defaultyVelocity = 1;
    moveDownDefaultTimer = 30;
    moveDownTimer = this.moveDownDefaultTimer
    fireTimerDefault = 100;
    fireTimer = this.fireTimerDefault;

    timerDecrement = 0;


    constructor(canvas, enemyBulletControl, playerBulletControl) {
        this.canvas = canvas;
        this.enemyBulletControl = enemyBulletControl;
        this.createEnemies();
        this.playerBulletControl = playerBulletControl;

        // this.enemyDiesSound = new Audio () - find enemy death sound (.wav)
        // this.enemyDiesSound.volume = .5//in case volume is too loud

        this.createEnemies();
    }
    


    draw(ctx) {
        this.timerCountdown();
        this.updateVelocityandDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetTimerCountdown();
        this.fireBullet();
    }

    collisionDetection() {
        this.enemyRows.forEach(enemyRow => {
           enemyRow.forEach((enemy, enemyIndex) => {
            if(this.playerBulletControl.bulletHits(enemy)) {
            this.enemyDiesSound.currentTime = 0;//starts fresh whenever an enemy dies
            this.enemyDiesSound.play();
            enemyRow.splice(enemyIndex, 1);
            }

           }); 
        });

            this.enemyRows = this.enemyRows.filter(enemyRow => enemyRow.length > 0);

    }

    fireBullet (){
        this.fireTimer--;
        if(this.fireTimer <= 0){
            this.fireTimer = this.fireTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletControl.shoot(enemy.x, enemy.y, -3);
            // console.log(enemyIndex);//enemy shooting the bullet on screen
        }
    }

    resetTimerCountdown(){
        if(this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownDefaultTimer
        }
    }

    timerCountdown (){
        if(this.currentDirection === EnemyMove.downLeft || 
           this.currentDirection === EnemyMove.downRight
        ) {
            this.timerDecrement--;
        }
    }

    updateVelocityandDirection () {
        for(const enemyRow of this.enemyRows) {
            if(this.currentDirection = EnemyMove.right) {
            this.xVelocity = this.defaultxVelocity
            this.yVelocity = 0;   
            const farRightEnemy = enemyRow[enemyRow.length -1];
            if(farRightEnemy.x + farRightEnemy.width >= this.canvas.width){
                this.currentDirection = EnemyMove.downLeft;
                break;
                }
            }
            else if(this.currentDirection === EnemyMove.downLeft){
                this.xVelocity = 0;
                this.yVelocity = this.defaultyVelocity;
                if(this.moveDown(EnemyMove.left)){
                    break;
                }
            } else if(this.currentDirection === EnemyMove.left){
                this.xVelocity= -this.defaultxVelocity;
                this.yVelocity = 0;
                const farLeftEnemy = enemyRow[0];
            if(farLeftEnemy.x <= 0){
                    this.currentDirection = EnemyMove.downRight;
                    break;
                }
            } else if(this.currentDirection === EnemyMove.downRight){
                if(this.moveDown(EnemyMove.right)){
                    break;
            }
        }

    }

}

        moveDown(newDirection) {
            this.xVelocity = 0;
            this.yVelocity = this.defaultyVelocity;
            if(this.moveDownTimer <= 0){
                this.currentDirection = newDirection;
                return true;
            }
                return false;
        }

    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        })
    }

  
    
    createEnemies() {
        this.enemyArr.forEach((row, rowIndex)=>{
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex* 50, rowIndex* 35, enemyNumber))
                }
            })
        })
    }


            

}
