import Bullet from "./Bullet.js";

export default class BulletControl {
    bullets = [];
    timeUntilNextBullet = 0;



    constructor(canvas, maxBullets, bulletColor, soundEnabled){
        this.canvas = canvas;
        this.maxBullets = maxBullets;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        // this.shootSound = new Audio()
        // this.shootSound.volume = 0.5;// find sound for shooting
    }

    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.width > 0)
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if(this.timeUntilNextBullet > 0 && bullet.y <= this.canvas.height){
            this.timeUntilNextBullet--;
        }
    }

    bulletHits(sprite){//sprite meaning if player or enemy hit
        const bulletThatHitSpriteIndex = this.bullets.findIndex (bullet => bullet.bulletHits(sprite));//finding bullet that hit sprite

    if(bulletThatHitSpriteIndex >= 0){
        this.bullets.splice(bulletThatHitSpriteIndex, 1);
        return true;
        }
        return false;
    }// ^ if bullet hits sprite, will remove sprite. if bullet misses, game will continue and nothing happens.


    shoot (x, y, velocity, timeUntilNextBullet = 0) {
        if (this.timeUntilNextBullet <= 0 && this.bullets.length < this.maxBullets) {
            const bullet = new BulletControl(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if(this.soundEnabled){
                this.shootSound.currentTime = 0;
                this.shootSound.play
            }
            this.timeUntilNextBullet = timeUntilNextBullet;
        }

    }
}

