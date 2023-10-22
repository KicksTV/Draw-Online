class World {
    constructor(...args) {
        this.x = args[0]
        this.y = args[1]
        this.w = args[2]
        this.h = args[3]

        this.objects = [] // contains object draw functions e.g. rect()
        this.mobsToSpawn = [] // contains a list of mobs that should spawn in the world

        this.state = "idleState"

        this.generated_tiles = {};
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
        background(52, 180, 235)
        this.renderWorld()
    }
    startWorldClock() {
        var self = this
        // Dynamically do tasks
        loop = setInterval( function() {
            if (self.objects.length < 3) {
                let rx = Number.parseInt(random(width))
                let ry = Number.parseInt(random(height))
                var kobold = new Kobold(rx, ry)

                rx = Number.parseInt(random(width))
                ry = Number.parseInt(random(height))
                var frog = new Frog(rx, ry)
                
                self.objects.push(kobold)
                self.objects.push(frog)
            }
        }, 5000);
    }

    zoom(map) {
        var map_size = map.length,
            map_zoomed_size = map_size * 2,
            zoomed_map = Array.from(Array(map_zoomed_size), () => new Array(map_zoomed_size));
        
        for (var i=0; i<=map_zoomed_size-1; i++) {
            for (var j=0; j<=map_zoomed_size-1; j++) {
                var ori_i = Number.parseInt(i / 2),
                    ori_j = Number.parseInt(j / 2),
                    ori_cord = map[ori_i][ori_j];
                
                if (ori_cord) {
                    
                    // small chance to be water
                    var random = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
                    if (random == 1) {
                        zoomed_map[i][j] = false
                    } else {
                        zoomed_map[i][j] = true
                    }

                    // small chance to extend the land
                    if (zoomed_map[i][j]) {
                        for (let l=0;l<3;l++) {
                            let neighborX = this.getNeighborBlock(i, l)
                            for (let o=0;o<3;o++) {
                                let neighborY = this.getNeighborBlock(j, o)
                                
                                if (neighborX != i || neighborY != j) {
                                    random = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
                                    
                                    // check if neighbor block is not already island block, get block before zoom
                                    var neighbor_zoom_i = Number.parseInt(neighborX / 2),
                                        neighbor_zoom_j = Number.parseInt(neighborY / 2);
                                    
                                    // check neighbor isn't out of map border
                                    if (neighbor_zoom_i > 0 && neighbor_zoom_j > 0 && neighbor_zoom_i < map.length && neighbor_zoom_j < map[0].length) {
                                        var neighbor_cord = map[neighbor_zoom_i][neighbor_zoom_j]
                                        if (!neighbor_cord) {
                                            // make block island if chance
                                            if (random == 1)
                                                zoomed_map[neighborX][neighborY] = true
                                        }
                                    }

                                }
                            }
                        }

                    }
                } else {
                    // first check that it was not already set from neighbor code above
                    if (!zoomed_map[i][j]) {

                        // also give random chance to make random land block if water block + surrounded by water
                        var water_blocks = []
                        for (let l=0;l<3;l++) {
                            let neighborX = this.getNeighborBlock(ori_i, l)
                            for (let o=0;o<3;o++) {
                                let neighborY = this.getNeighborBlock(ori_j, o)
                                if (neighborX != ori_i || neighborY != ori_j) {
                                    // check neighbor isn't out of map border
                                    if (neighborX > 0 && neighborY > 0 && neighborX < map.length && neighborY < map[0].length) {
                                        var neighbor_cord = map[neighborX][neighborY]
                                        if (!neighbor_cord)
                                            water_blocks.push(true)
                                    }
                                }
                            }
                        }

                        // check all water blocks
                        if (water_blocks.length == 8) {
                            // small chance to turn into land
                            random = Math.floor(Math.random() * (map.length - 1 + 1)) + 1;
                            if (random == 1) {
                                zoomed_map[i][j] = true
                            } else {
                                zoomed_map[i][j] = false
                            }
                        } else {
                            zoomed_map[i][j] = false
                        }
                    }
                }
            }
        }
        return zoomed_map
    }

    generateTileMap(cord_pattern_map) {
        console.log("Starting generateTileMap")
        for (let y=0;y<Math.ceil(this.h/worldBlockSize);y++) {
            for (let x=0;x<Math.ceil(this.w/worldBlockSize);x++) {
                var cord_pat = cord_pattern_map[`${y}_${x}`]
                for (const [tileName, pattern] of Object.entries(tile_patterns)) {
                    // compare two arrays
                    if (_.xor(pattern, cord_pat).length === 0) {
                        this.generated_tiles[`${y}_${x}`] = new Tile(tileName, x, y, worldBlockSize, worldBlockSize)
                    }
                }
            }
        }
        console.log("Finished generateTileMap")
    }

    generateWorld() {
        // small island 4 x 4
        var island_map = [[], [], [], []]

        for (var i=0; i<=3; i++) {
            for (var j=0; j<=3; j++) {
                // random number between 1 and 10
                var random = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                island_map[i][j] = random == 1
            }
        }
        console.log(island_map)
        this.printMapVisually(island_map)
        var zoomed_map = this.zoom(island_map)
        this.printMapVisually(zoomed_map)
        console.log(zoomed_map)


        zoomed_map = this.zoom(zoomed_map)
        this.printMapVisually(zoomed_map)
        console.log(zoomed_map)

        zoomed_map = this.zoom(zoomed_map)
        this.printMapVisually(zoomed_map)
        console.log(zoomed_map)

        zoomed_map = this.zoom(zoomed_map)
        this.printMapVisually(zoomed_map)
        console.log(zoomed_map)

        zoomed_map = this.zoom(zoomed_map)
        this.printMapVisually(zoomed_map)
        zoomed_map = this.zoom(zoomed_map)
        this.printMapVisually(zoomed_map)
        zoomed_map = this.zoom(zoomed_map)
        zoomed_map = this.zoom(zoomed_map)
        // zoomed_map = this.zoom(zoomed_map)
        noise_grid = zoomed_map
    }   
    
    printMapVisually(map) {
        var len = map.length,
            visual_map = JSON.parse(JSON.stringify(map))
        for (var i=0; i<len; i++) {
            for (var j=0; j<len; j++) {
                if (map[i][j])
                    visual_map[i][j] = '⬛'
                else
                    visual_map[i][j] = '⬜'
            }
        }
        console.log(visual_map)
    }
    
    renderWorld() {
        let startingX;
        let length = 0;
        let half_height = Math.round(screen_h)
        let half_width = Math.round(screen_w)
        let camera_x = Math.round(camera.position.x)
        let camera_y = Math.round(camera.position.y)
        log("half_height: ", half_height)
        log("half_width: ", half_width)
        log("camera_x", camera_x)
        log("camera_y", camera_y)
        log(noise_grid)

        let xs = [Number.parseInt((camera_x-half_width) / worldBlockSize), Number.parseInt((camera_x+half_width) / worldBlockSize)]
        let ys = [Number.parseInt((camera_y-half_height) / worldBlockSize), Number.parseInt((camera_y+half_height) / worldBlockSize)]
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
                    length += worldBlockSize
                } else {
                    if (Number.isInteger(startingX)) {
                        let r = this.displayPath(startingX, length, i)
                        startingX = r[0], length = r[1]
                    } else {
                        if (this.generated_tiles[`${i}_${j}`]) {
                            this.generated_tiles[`${i}_${j}`].display()
                        }
                    }
                }
            }
            let r = this.displayPath(startingX, length, i)
            startingX = r[0], length = r[1]
        }
       
    }
    is_within_map_bounds(x, y) {
        return (x >= 0 && x <= this.w-worldBlockSize && y >= 0 && y <= this.h-worldBlockSize)
    }
    displayPath(startingX, length, i) {
        push()
        stroke(11, 125, 2)
        fill(color(11, 125, 2))
        rect(startingX*worldBlockSize, i*worldBlockSize, length, worldBlockSize)
        pop()

        startingX = null
        length = 0
        return [startingX, length]
    }

    static isWall(x, y) {
        var gridx = Number.parseInt(x),
            gridy = Number.parseInt(y);
        return Cellular_Automata.getNoiseGrid(noise_grid, gridx, gridy)

    }

    getNeighborBlock(cord, val) {
        let neighbor;
        if (val == 0) {
            neighbor = cord
        }
        else if (val == 1) {
            neighbor = cord-1
        } else {
            neighbor = cord+1
        }
        return neighbor;
    }

    // State Functions
    setState(state) {
        this.state = state;
    }
}