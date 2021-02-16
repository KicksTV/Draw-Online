class Player extends moveMixin(stateMixin(Entity)) {
    constructor(sprite, state) {
        super(sprite, state);
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
        if (keyIsDown(RIGHT_ARROW)) {
            this.setState("moveRightState")
            this.mvX(this, 2)
        }
        else if (keyIsDown(LEFT_ARROW)) {
            this.setState("moveLeftState")
            this.mvX(this, -2)
        }
        else if (keyIsDown(UP_ARROW)) {
            this.setState("moveUpState")
            this.mvY(this, -2)
        }
        else if (keyIsDown(DOWN_ARROW)) {
            this.setState("moveDownState")
            this.mvY(this, 2)
        }
        else {
            this.setState("idleState")
        }
    }
    
}