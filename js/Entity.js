class Entity {
    // x, y, sprite, state
    constructor(...args) {
        this.x = args[0]
        this.y = args[1]

        this.sprite = args[2] // graphic
        this.state = args[3] // starting state (Must be a string)

        this.visable = true
    }
}