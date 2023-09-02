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
        let half_height = Math.round(this.h / 2)
        let half_width = Math.round(this.w / 2)
        let camera_x = Math.round(camera.position.x)
        let camera_y = Math.round(camera.position.y)
        console.log("half_height: ", half_height)
        console.log("half_width: ", half_width)
        console.log("camera_x", camera_x)
        console.log("camera_y", camera_y)

        let xs = [camera_x-half_width, camera_x+half_width]
        let ys = [camera_y-half_height, camera_y+half_height]
        // let ys = [0, this.h]
        // let xs = [0, this.w]
        let noise_grid_h_i = Math.round(noise_grid.length / 2) -1

        console.log("ys: ", ys)
        console.log("xs: ", xs)
        
        for (var i=ys[0];i<Math.ceil(ys[1]/16);i++) {
            for (var j=xs[0];j<Math.ceil(xs[1]/16);j++) {
                console.log("noise_grid_h_i: ", noise_grid_h_i, "i: ", i)
                let hi = noise_grid_h_i + i
                console.log(hi)
                let y_noise_grid = noise_grid[hi]
                console.log(y_noise_grid)
                if (!y_noise_grid) {
                    console.log("y: ", i, "x: ", j)
                    continue
                }
                let noise_grid_w_i =  Math.round(y_noise_grid.length / 2) - 1
                console.log("noise_grid_w_i: ", noise_grid_w_i, "j: ", j)
                let wi = noise_grid_w_i + j
                console.log(wi)

                var grid_y_x = y_noise_grid[wi] // noise_grid[i][j]
                print(grid_y_x)
                if (grid_y_x) {
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

    // State Functions
    setState(state) {
        this.state = state;
    }
}