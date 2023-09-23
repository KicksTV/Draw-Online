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
        let half_height = Math.round(windowHeight / 2)
        let half_width = Math.round(windowWidth / 2)
        let camera_x = Math.round(camera.position.x)
        let camera_y = Math.round(camera.position.y)
        log("half_height: ", half_height)
        log("half_width: ", half_width)
        log("camera_x", camera_x)
        log("camera_y", camera_y)
        log(noise_grid)

        let xs = [Number.parseInt((camera_x-half_width) / 16), Number.parseInt((camera_x+half_width) / 16)]
        let ys = [Number.parseInt((camera_y-half_height) / 16), Number.parseInt((camera_y+half_height) / 16)]
        log("ys: ", ys)
        log("xs: ", xs)

        for (var i=ys[0];i<Math.ceil(ys[1]);i++) {
            log(i)
            if (i % 1 != 0)
                break
            for (var j=xs[0];j<Math.ceil(xs[1]);j++) {
                if (j % 1 != 0)
                    break
                if (Cellular_Automata.getNoiseGrid(noise_grid, j, i)) {
                    if (!Number.isInteger(startingX)) {
                        startingX = j
                    }
                    length += 16
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

    static isWall(x, y) {
        var gridx = Number.parseInt(x),
            gridy = Number.parseInt(y);
        return Cellular_Automata.getNoiseGrid(noise_grid, gridx, gridy)

    }

    // State Functions
    setState(state) {
        this.state = state;
    }
}