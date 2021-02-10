class World {
    constructor(...args) {
        this.x = args[0]
        this.y = args[1]
        this.w = args[2]
        this.h = args[3]

        this.objects = [] // contains object draw functions e.g. rect()

        this.state = "idleState"
    }
    mvX(value) {
        this.x += value
    }
    mvY(value) {
        this.y += value
    }
    draw() {
        push()
        translate(this.x, this.y)
        this.objects.forEach(obj => {
            obj.call()
        })
        pop()
    }

    update() {
        this[this.state]();
    }

    // State Functions
    setState(state) {
        this.state = state;
    }
    idleState() {
    }
    moveRightState() {
        this.mvX(-2)
    }
    moveLeftState() {
        this.mvX(2)
    }
    moveUpState() {
        this.mvY(2);
    }
    moveDownState() {
        this.mvY(-2);
    }
}