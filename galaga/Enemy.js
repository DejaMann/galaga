
export default class Enemy {

        constructor(x, y, imageNumber) {
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 30;

            this.image = new Image();
            this.image.src = `./galaga_css/imgs/enemy${imageNumber}.png`
        }

        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    
        move(xVelocity, yVelocity) {
            this.x += xVelocity;
            this.y += yVelocity;
        }

        bulletHits(sprite) {
                if(this.x + this.width > sprite.x && 
                    this.x < sprite.x + sprite.width && 
                    this.y + this.height > sprite.y &&
                    this.y < sprite.y + sprite.height){
                        return true;
                    }
                    else {
                        return false;
                    }
        }
    }
