class Entity {
    // x, y, sprite, state
    constructor(...args) {
        this.sprite = args[0] // graphic
        this.state = args[1] // starting state (Must be a string)
        this.visable = true
    }

    getX() { return this.sprite.position.x }
    getY() { return this.sprite.position.y }
}