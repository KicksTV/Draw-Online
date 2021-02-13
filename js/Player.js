class Player extends moveMixin(animationStateMixin(Entity)) {
    constructor(x, y, sprite, state) {
        super(x, y, sprite, state); 
    }
    draw() {
        if (this.visable && this.sprite) this.sprite.draw()
    }
    update() {
        if (keyIsDown(RIGHT_ARROW)) {
            this.setState("moveRightState")
            this.mvX(2)
        }
        else if (keyIsDown(LEFT_ARROW)) {
            this.setState("moveLeftState")
            this.mvX(-2)
        }
        else if (keyIsDown(UP_ARROW)) {
            this.setState("moveUpState")
            this.mvY(-2)
        }
        else if (keyIsDown(DOWN_ARROW)) {
            this.setState("moveDownState")
            this.mvY(2)
        }
        else {
            this.setState("idleState")
        }
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
    
}