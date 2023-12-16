class Sprit {
    constructor(character, x, y, w, h) {
        this.sprite = new Sprite(x, y, w, h, 'k')
        console.log(x, y, w, h)
        this.current_animation;
        this.animations_to_load = []

        this.sprite.spriteSheet = `img/${character}/${character}-run.png`
        this.sprite.anis.offset.x = 0;
	    this.sprite.anis.frameDelay = 4;
        this.sprite.layer = 2;

        this.sprite.addAnis({
            run: { row: 0, frames: 7 },
            idle: { row: 0, frames: 1 },
            // jump: { row: 1, frames: 6 },
            // roll: { row: 2, frames: 5, frameDelay: 14 },
            // turn: { row: 3, frames: 7 },
        });

        // this.sprite.img = `img/${character}/${character}-idle.png`
        // for (var ani of animations.get(character)) {
        //     console.log(...ani)
        //     this.sprite.addAni(...ani)
        // }
        // this.idleAnimation()
    }
    drawSprite() {
        if (this.current_animation) this[this.current_animation]();
        this.sprite.ani.play();
    }
    getAnimation() {
        return this.current_animation;
    }
    setAnimation(animation) {
        if (animation == "moveright") this.current_animation = "runRightAnimation"
        if (animation == "moveleft") this.current_animation = "runLeftAnimation"
        if (animation == "moveup") this.current_animation = "runUpAnimation"
        if (animation == "movedown") this.current_animation = "runDownAnimation"
        if (animation == "idle") this.current_animation = "idleAnimation"
    }

    // State functions

    idleAnimation() {
        this.sprite.changeAni('idle');
    }
    runRightAnimation() {
        //flip horizontally
        this.sprite.mirror.x = false;
        this.sprite.changeAni('run');
    }
    runLeftAnimation() {
        //flip horizontally
        this.sprite.mirror.x = true;
        this.sprite.changeAni('run');
    }
    runUpAnimation() {
        this.sprite.changeAni('run');
    }
    runDownAnimation() {
        this.sprite.changeAni('run');
    }
}

