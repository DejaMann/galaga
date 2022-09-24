export default class Player {
    
    rightKeyPressed = false;
    leftKeyPressed = false;
    shootPressed = false;
    
    constructor (canvas, velocity, bulletControl) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletControl = bulletControl;


        this.x = this.canvas.width/2;
        this.y = canvas.height -75;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "./galaga_css/imgs/player.png"
        
        document.addEventListener('keydown', this.keydown)
        document.addEventListener('keyup', this.keyup)
    }

        draw(ctx) {
            if(this.shootPressed){
                this.bulletControl.shoot(this.x + this.width/2, this.y, 4, 10)//shoots from middle of spaceship, speed is 4 and gap between bullets is 10
            }
            this.move();
            this.hitWalls();
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

        hitWalls () {//enemies hit walls
            //left
            if(this.x <= 0) {
                this.x = 0;
            }

            //right
            if(this.x > this.canvas.width -this.width) {
                this.x = this.canvas.width - this.width;
            }
        }

    move() {
        if(this.rightKeyPressed){
            this.x += this.velocity;
        }
        else if(this.leftKeyPressed){
            this.x += -this.velocity;
        }
    }
    

    keydown = event => {
        if(event.code == 'ArrowRight'){
            this.rightKeyPressed = true;
        }
        if(event.code == 'ArrowLeft'){
            this.leftKeyPressed = true;
        }
        if(event.code == 'Space'){
            this.shootPressed = true;
        }
    };

    keyup = event => {
        if(event.code == 'ArrowRight'){
        this.rightKeyPressed = false;
        }
        if(event.code == 'ArrowLeft'){
        this.leftKeyPressed = false;
        };
        if(event.code == 'Space'){
            this.shootPressed = false;
        };
    
    }
}

// const player = new Player();
// const keys = {
//   ArrowLeft: {
//     pressed: false
//   },
//   ArrowRight: {
//     pressed: false
//   }
// }
// function animate() {
//   requestAnimationFrame(animate);
//   player.update();
//   if (keys.ArrowLeft.pressed) {
//     player.velocity.x = -5
//   } else if (keys.ArrowRight.pressed){
// player.velocity.x = 5
//   }
//   else {
//     player.velocity.x = 0
//   }
// }
// animate();
// // Add Event Listeners - get spaceship to move left or right based on key
// addEventListener('keydown', ({key}) => {
//    switch(key) {
//        case ‘ArrowLeft’:
//         keys.ArrowLeft.pressed = true
//         break
//        case ‘ArrowRight’:
//          keys.ArrowRight.pressed = true
//         console.log(‘right’)
//         break
//       //   case ' ':
//       //   console.log('space')
//       //   break
//     }    
  
// })
// addEventListener('keyup', ({key}) => {
//    switch(key) {
//        case ‘ArrowLeft’:
//         keys.ArrowLeft.pressed = false
//         break
//        case ‘ArrowRight’:
//          keys.ArrowRight.pressed = false
//         console.log(‘right’)
//         break
//       //   case ' ':
//       //   console.log('space')
//       //   break
//     }    
  
// })







