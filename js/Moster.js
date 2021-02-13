class Monster extends agroMixin(moveMixin(animationStateMixin(Entity))) {
    constructor(x, y, sprite, state) {
        super(x, y, sprite, state); 

    }
    draw() {
        if (this.visable && this.sprite) this.sprite.draw()
    }
    update() {
        this.inAgroRange(player)
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