class Entity {
    // x, y, sprite, state
    constructor(...args) {
        this.sprite = args[0] // graphic
        this.state = args[1] // starting state (Must be a string)
        this.visable = true
        this.cares_about_walls = false
    }

    getX() { return this.sprite.sprite.x }
    setX(val) { this.sprite.sprite.x = val }
    getY() { return this.sprite.sprite.y }
    setY(val) { this.sprite.sprite.y = val }

}