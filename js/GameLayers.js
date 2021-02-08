class ObjectLayer {
    constructor() {
        this.children = []

    }
    push(obj) {
        this.children.push(obj)
    }
    draw() {
        this.children.forEach(c => c.draw())
    }
    update() {
        this.children.forEach(c => c.update())
    }
}