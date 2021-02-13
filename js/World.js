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
            obj.draw()
        })
        pop()
    }

    update() {
        this.objects.forEach(obj => {
            obj.update()
        })
        // if (keyIsDown(RIGHT_ARROW)) {
        //     this.setState("moveRightState")
        // }
        // else if (keyIsDown(LEFT_ARROW)) {
        //     this.setState("moveLeftState")
        // }
        // else if (keyIsDown(UP_ARROW)) {
        //     this.setState("moveUpState")
        // }
        // else if (keyIsDown(DOWN_ARROW)) {
        //     this.setState("moveDownState")
        // }
        // else {
        //     this.setState("idleState")
        // }

        // this[this.state]();
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