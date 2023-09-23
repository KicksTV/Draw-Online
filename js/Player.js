class Player extends moveMixin(stateMixin(Entity)) {
    constructor(sprite, state) {
        super(sprite, state);
        this.cares_about_walls = true
    }
    draw() {
        if (this.visable && this.sprite) this.sprite.drawSprite()
    }
    update() {
        this.checkIsMoving()
        this.updateState()
    }
    show() {
        this.visable = true
    }
    hide() {
        this.visable = false
    }
    toggleVisability() {
        this.visable = !this.visable
    }
    checkIsMoving() {
        var moving = false
        if (keyIsDown(UP_ARROW)) {
            this.setState("moveUpState")
            this.mvY(-2)
            moving = true
        }
        else if (keyIsDown(DOWN_ARROW)) {
            this.setState("moveDownState")
            this.mvY(2)
            moving = true
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.setState("moveRightState")
            this.mvX(2)
            moving = true
        }
        else if (keyIsDown(LEFT_ARROW)) {
            this.setState("moveLeftState")
            this.mvX(-2)
            moving = true
        }

        if (!moving)
            this.setState("idleState")
    }
    
}