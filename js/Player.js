class Player {
    constructor(...args) {
        this.x = args[0]
        this.y = args[1]
        this.y = args[2]
        this.w = args[3]
        this.h = args[4]
        this.color = args[5]

    }

    draw() {
        fill(this.color)
        rect(this.x, this.y, this.w, this.y)
    }
}