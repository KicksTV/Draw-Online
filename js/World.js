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
    staticRender() {
        background(25, 55, 25)
        this.renderWorld()
    }
    startWorldClock() {
        var self = this
        // Dynamically do tasks
        loop = setInterval( function() {
            if (self.objects.length < 3) {
                let rx = random(width)
                let ry = random(height)
        
                var kobold = new Kobold(rx, ry)
                self.objects.push(kobold)
            }
        }, 5000);
    }
    
    renderWorld() {
        let startingX;
        let length = 0;
        for (var i=0;i<Math.ceil(this.h/16);i++) {
            for (var j=0;j<Math.ceil(this.w/16);j++) {
                if (j < camera.position.x/16+42 && i < camera.position.y/16+22) {
                    if (j > camera.position.x/16-42 && i > camera.position.y/16-22) {
                        if (noise_grid[i][j]) {
                            if (!Number.isInteger(startingX)) {
                                startingX = j
                            }
                            length += 16
                        } else {
                            let r = this.displayRock(startingX, length, i)
                            startingX = r[0], length = r[1]
                        }
                    } else {
                        let r = this.displayRock(startingX, length, i)
                        startingX = r[0], length = r[1]
                    }
                } else {
                    let r = this.displayRock(startingX, length, i)
                    startingX = r[0], length = r[1]
                }
            }
            let r = this.displayRock(startingX, length, i)
            startingX = r[0], length = r[1]
        }
       
    }
    is_within_map_bounds(x, y) {
        return (x >= 0 && x <= this.w-16 && y >= 0 && y <= this.h-16)
    }
    displayRock(startingX, length, i) {
        if (Number.isInteger(startingX)) {
            push()
            noStroke();
            fill(color(156, 69, 3))
            rect(startingX*16, i*16, length, 16)
            pop()

            startingX = null
            length = 0
        }
        return [startingX, length]
    }

    // State Functions
    setState(state) {
        this.state = state;
    }
}