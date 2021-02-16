class World {
    constructor(...args) {
        this.x = args[0]
        this.y = args[1]
        this.w = args[2]
        this.h = args[3]

        this.objects = [] // contains object draw functions e.g. rect()
        this.mobsToSpawn = [] // contains a list of mobs that should spawn in the world

        this.state = "idleState"
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
    }
    startWorldClock() {
        var self = this
        // Dynamically do tasks
        loop = setInterval( function() {
            if (self.objects.length < 3) {
                let rx = random(500)
                let ry = random(500)
        
                var kobold = new Kobold()
                self.objects.push(kobold)
            }
        }, 5000);
    }

    // State Functions
    setState(state) {
        this.state = state;
    }
}