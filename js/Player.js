class Player {
    constructor(...args) {
        this.x = args[0]
        this.y = args[1]
        this.w = args[2]
        this.h = args[3]
        this.color = args[4]

        this.visable = true

    }
    draw() {
        fill(this.color)
        rect(this.x, this.y, this.w, this.h)
    }
    update() {
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