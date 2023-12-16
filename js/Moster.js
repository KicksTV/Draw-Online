class Monster extends agroMixin(moveMixin(stateMixin(Entity))) {
    constructor(sprite=new Sprit(20,20,20,20), state) {
        super(sprite, state); 
    }
    draw() {
        if (this.visable && this.sprite) this.sprite.drawSprite()
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