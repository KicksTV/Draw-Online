class Sprite {
    constructor(character, x, y, w, h) {
        var sprite = createSprite(x, y, w, h)
        Object.assign(this, sprite)
        this.current_animation;
        this.animations_to_load = []

        this.addImage('idle', loadImage(`img/${character}/${character}-idle.png`))
        this.addAnimation("run", animations.get(character))
    }
    drawSprite() {
        if (this.current_animation) this[this.current_animation]();
        drawSprite(this);
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
        this.changeAnimation('idle');
    }
    runRightAnimation() {
        //flip horizontally
        this.mirrorX(1);
        this.changeAnimation('run');
    }
    runLeftAnimation() {
        //flip horizontally
        this.mirrorX(-1);
        this.changeAnimation('run');
    }
    runUpAnimation() {
        this.changeAnimation('run');
    }
    runDownAnimation() {
        this.changeAnimation('run');
    }
}

