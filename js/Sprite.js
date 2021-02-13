class Sprite {
    constructor(...args) {
        this.x = args[0]
        this.y = args[1]
        this.w = args[2]
        this.h = args[3]

        this.sprite = createSprite(this.x, this.y, this.w, this.h);
        this.animations_to_load = []
    }
    draw() {
        if (this.current_animation) this[this.current_animation]();
        drawSprite(this.sprite);
    }
    addImage(name, path) {
        this.sprite.addAnimation(name, loadImage(path))
    }
    loadAnimationSheet(name, path, width, height, frames) {
        let animationSheet = loadSpriteSheet(path, width, height, frames)
        this.animations_to_load.push({name: name, animation: loadAnimation(animationSheet)})
    }
    addAnimations() {
        this.animations_to_load.forEach(aniobj => {
            this.sprite.addAnimation(aniobj.name, aniobj.animation)
        })
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
    mvX(value) {
        this.sprite.position.x += value;
    }
    mvY(value) {
        this.sprite.position.y += value;
    }
    mvXV(value) {
        this.sprite.velocity.x = value;
    }
    mvYV(value) {
        this.sprite.velocity.y = value;
    }

    // State functions

    idleAnimation() {
        this.sprite.changeAnimation('idle');
    }
    runRightAnimation() {
        //flip horizontally
        this.sprite.mirrorX(1);
        this.sprite.changeAnimation('run');
    }
    runLeftAnimation() {
        //flip horizontally
        this.sprite.mirrorX(-1);
        this.sprite.changeAnimation('run');
    }
    runUpAnimation() {
        this.sprite.changeAnimation('run');
    }
    runDownAnimation() {
        this.sprite.changeAnimation('run');
    }
}

