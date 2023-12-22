class customWorld {
    constructor(...args) {
        this.x = args[0]
        this.y = args[1]
        this.w = args[2]
        this.h = args[3]

        this.objects = [] // contains object draw functions e.g. rect()
        this.mobsToSpawn = [] // contains a list of mobs that should spawn in the world

        this.state = "idleState"

        this.basicRender = false

        // this.generated_tiles = {};
        this.tile_grid = []
        this.screen_tile_grid = [] // tiles to be displayed on screen
        this.screen_x_length = 0
        this.screen_y_length = 0


        // tiles
        this.tiles={}
        this.tilesLookup={}
        this.grid_pattern = {} // e.g. {'x_y': [neighbors]}
        this.waterTilesGroup;
        this.landTilesGroup;
        this.landCharPatterns = {
            t: '=',
            tttttttt: '=', // all land
            fftttttf: '(', // 40 top straight
            fftttttt: '(', // 40 top straight
            fttttttf: '(', // 40 top straight
            fffttttf: '$', // 36 top right corner (49 (1) is another variation)
            fffftttf: '$', // 36 top right corner (49 (1) is another variation)
            fffttttt: '$', // 36 top right corner (49 (1) is another variation)
            fffftttt: '$', // 36 top right corner (49 (1) is another variation)
            tffftttt: '.', // 46 right straight
            ttfftttt: '.', // 46 right straight
            tffttttt: '.', // 46 right straight
            tffffttt: '#', // 35 bottom right corner (42 (*) is another variation)
            tffffftt: '#', // 35 bottom right corner (42 (*) is another variation)
            ttfffftt: '#', // 35 bottom right corner (42 (*) is another variation)
            ttfffttt: '#', // 35 bottom right corner (42 (*) is another variation)
            tttffftt: '0', // 48 bottom straight
            tttffttt: '0', // 48 bottom straight
            ttttfftt: '0', // 48 bottom straight
            tttfffft: '%', // 37 bottom left corner (44 (,) is another variation)
            tttfffff: '%', // 37 bottom left corner (44 (,) is another variation)
            ttttffft: '%', // 37 bottom left corner (44 (,) is another variation)
            ttttffff: '%', // 37 bottom left corner (44 (,) is another variation)
            tttttfff: '4', // 52 left straight
            ttttttff: '4', // 52 left straight
            tttttfft: '4', // 52 left straight
            tttttfft: '4', // 52 left straight
            fttttfff: '+', // 43 top left corner (50 (2) is another variation)
            fftttfff: '+', // 43 top left corner (50 (2) is another variation)
            ftttttff: '+', // 43 top left corner (50 (2) is another variation)
            ffttttff: '+', // 43 top left corner (50 (2) is another variation)
            tftttttt: '3', // 51 top right inner
            tttftttt: '&', // 38 bottom right inner
            tttttftt: ')', // 41 bottom left inner
            tttttttf: '/', // 47 top left inner
        };


        // garbage collection
        this.garbage_collection = []

    }
    initTiles() {
        var self = this;
        this.calTilesOnScreen()

        var remove_opposite_tile = (x, y) => {
            if (!x && x !== 0 || !y && y !== 0)
                return
            var camera_x = Math.round(camera.x / worldBlockSize) * worldBlockSize,
                camera_y = Math.round(camera.y / worldBlockSize) * worldBlockSize,
                oppersite_x,
                oppersite_y;

            // console.log("x y:", x, y, camera_x, camera_y)

            // what direction is character moving in?
            var [moving_x_pos, moving_x_neg, moving_y_pos, moving_y_neg] = [false, false, false, false];
            
            if (camera.x > camera.prev_x)
                moving_x_pos = true
            else if (camera.x < camera.prev_x)
                moving_x_neg = true

            if (camera.y > camera.prev_y)
                moving_y_pos = true
            else if (camera.y < camera.prev_y)
                moving_y_neg = true

            // console.log(moving_x_pos, moving_x_neg, moving_y_pos, moving_y_neg)

            // if moving on y axis then
            if (moving_y_pos || moving_y_neg) {
                if (moving_y_pos)
                    oppersite_y = y - self.screen_y_length * worldBlockSize
                else if (moving_y_neg)
                    oppersite_y = y + self.screen_y_length * worldBlockSize

                // console.log(self.screen_x_length/2 * worldBlockSize, x, camera_x)
                oppersite_x = (self.screen_x_length/2 * worldBlockSize + camera_x) - (self.screen_x_length/2 * worldBlockSize) - (x*-1 + camera_x)
            }
            
            if (moving_x_pos || moving_x_neg) {
                // console.log(self.screen_x_length, self.screen_tile_grid[0].length)
                if (moving_x_pos)
                    oppersite_x = x - self.screen_x_length * worldBlockSize
                else if (moving_x_neg)
                    oppersite_x = x + self.screen_x_length * worldBlockSize

                oppersite_y = (self.screen_y_length/2 * worldBlockSize + camera_y) - (self.screen_y_length/2 * worldBlockSize) - (y*-1 + camera_y)
            }


            // console.log("oppersite: ", oppersite_x, oppersite_y)
            var cords = `${oppersite_x}_${oppersite_y}`


            // check if number of tiles is greater than screen, if so then we have more tiles than needed
            var rendered_tile_length = 0
            for (const [k, v] of Object.entries(self.tiles)) {
                rendered_tile_length += v.length
            }
            // console.log(self.tilesLookup[cords] && true, rendered_tile_length, this.screen_x_length * this.screen_y_length)
            if (self.tilesLookup[cords] && rendered_tile_length >= (this.screen_x_length * this.screen_y_length)) {
                self.tilesLookup[cords].remove()
                delete this.tilesLookup[cords]

                // console.log("removed", cords)
                // console.log('----------------------------------------')
                return true
            }
            //  else {
            //     console.log("not removed")
            //     console.log('----------------------------------------')
            // }
            return false
        }

        var water = new Group();
        water.w = 32;
        water.h = 32;
        water.tile = '-';
        if (this.basicRender) {
            water.color = 'blue';
            water.stroke = 'blue';
        } else {
            water.addAni('img/tiles/water/water1.png', 8);
        }
        water.collider = 'k';
        water.layer = 1;
        water.tiles = {}
        water.add_tile = (tile) => {
            water.tiles[`${tile.x}_${tile.y}`] = tile
        }
        water.remove_opposite_tile = remove_opposite_tile

        for (var land_char of Object.values(this.landCharPatterns)) {
            if (land_char == '=' || this.tiles[land_char])
                continue;
            var land = new Group();
            land.w = 32;
            land.h = 32;
            land.tile = land_char;
            if (this.basicRender) {
                land.color = 'green';
                land.stroke = 'green';
            } else {
                land.addAni(`img/tiles/land/${land_char.charCodeAt(0)}/tile1.png`, 6);
            }
            land.collider = 'k';
            land.layer = 1;
            land.tiles = {}
            land.add_tile = (tile) => {
                land.tiles[`${tile.x}_${tile.y}`] = tile
            }
            land.remove_opposite_tile = remove_opposite_tile

            this.tiles[land.tile] = land
        }

        var land = new Group();
        land.w = 32;
        land.h = 32;
        land.tile = '=';
        land.color = '#83a448';
        land.stroke = '#83a448';
        land.collider = 'k';
        land.layer = 1;
        land.tiles = {}
        land.add_tile = (tile) => {
            land.tiles[`${tile.x}_${tile.y}`] = tile
        }
        land.remove_opposite_tile = remove_opposite_tile

        console.log(land)
        this.tiles[land.tile] = land
        this.tiles[water.tile] = water

        // var waterTilesGroup = new Tiles(
        //     water_display_tile_grid, camera.x-half_width, camera.y-half_height, water.w, water.h
        // );
        // this.waterTilesGroup = waterTilesGroup
        
        
        // // console.log(land_display_tile_grid)
        // var landTilesGroup = new Tiles(
        //     land_display_tile_grid, camera.x-half_width, camera.y-half_height, land.w, land.h
        // );
        // this.landTilesGroup = landTilesGroup
        
        // for (const [tile_char, tile_grp] of Object.entries(this.tiles)) {
        //     for (var sprite of tile_grp) {
        //         this.tilesLookup[]
        //     }
        // }

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
        // background(52, 180, 235)

        // for (const [k, v] of Object.entries(this.tiles)) {
        //     v.cull(1920)
        // }
        this.renderWorldBasic()

        // if (this.x != camera.x && this.y != camera.y) {
        //     this.renderWorldBasic()
        // }
    }
    startWorldClock() {
        var self = this
        // Dynamically do tasks
        // loop = setInterval( function() {
        //     if (self.objects.length < 3) {
        //         let rx = Number.parseInt(random(width))
        //         let ry = Number.parseInt(random(height))
        //         // var kobold = new Kobold(rx, ry)

        //         rx = Number.parseInt(random(width))
        //         ry = Number.parseInt(random(height))
        //         // var frog = new Frog(rx, ry)
                
        //         self.objects.push(kobold)
        //         self.objects.push(frog)
        //     }
        // }, 5000);
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

        // console.log(island_map)
        // this.printMapVisually(island_map)
        var zoomed_map = this.zoom(island_map)
        // this.printMapVisually(zoomed_map)
        // console.log(zoomed_map)

        zoomed_map = this.zoom(zoomed_map)
        // this.printMapVisually(zoomed_map)
        // console.log(zoomed_map)

        zoomed_map = this.zoom(zoomed_map)
        // this.printMapVisually(zoomed_map)
        // console.log(zoomed_map)

        zoomed_map = this.zoom(zoomed_map)
        // this.printMapVisually(zoomed_map)
        // console.log(zoomed_map)

        zoomed_map = this.zoom(zoomed_map)
        // this.printMapVisually(zoomed_map)
        zoomed_map = this.zoom(zoomed_map)
        this.printMapVisually(zoomed_map)
        // zoomed_map = this.zoom(zoomed_map)
        // zoomed_map = this.zoom(zoomed_map)
        // zoomed_map = this.zoom(zoomed_map)
        noise_grid = zoomed_map

        this.h = noise_grid.length * worldBlockSize
        this.w = noise_grid[0].length * worldBlockSize
    }

    gridPatternToChar(x_y) {
        var pattern = this.grid_pattern[x_y],
            pattern_key= '';
        
        if (!pattern)
            return
        // 
        pattern_key = pattern.reduce((pv, cv) => pv + cv.toString()[0], pattern_key)

        if (!this.landCharPatterns[pattern_key]) {
            console.error(`Grid pattern key does not exist in landCharPatterns: ${pattern_key}`)
        }

        var char = this.landCharPatterns[pattern_key]

        // if (pattern.join(',') === [true, true, true, true, true, false, false, false].join(',')) {
        //     console.log(x_y, pattern, pattern_key, char)
        // }
        return char

    }

    calTileNeighbors(grid) {
        // dict to convert neighbor cord into list index
        for (let y=0;y<Math.ceil(this.h/worldBlockSize);y++) {
            for (let x=0;x<Math.ceil(this.w/worldBlockSize);x++) {
                var neighbors = w.getNeighborsForCords(x, y, grid)
                // remember cord and there neighbors for use later
                this.grid_pattern[`${x}_${y}`] = neighbors
                // if (neighbors_check.join(',') === [false, true, true, true, true, false, false, false].join(',')) {
                //     console.log(neighbors) // tffffttt
                // }
            }
        }
        return;
    }

    getNeighborsForCords(x, y, grid) {
        function get_neighbor_wall(cord, val) {
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
        var neighbors = Array.from(Array(8))
        var neighbor_indexs = {'0_1': 0, '0_2': 4, '1_0': 6, '1_1': 7, '1_2': 5, '2_0': 2, '2_1': 1, '2_2': 3}

        // console.log(y,x)
        for (let l=0;l<3;l++) {
            let neighborX = get_neighbor_wall(x, l)

            for (let o=0;o<3;o++) {
                let neighborY = get_neighbor_wall(y, o)
            
                if (this.is_within_map_bounds(neighborX*worldBlockSize, neighborY*worldBlockSize)) {
                    if (neighborX != x || neighborY != y) {
                        var block = grid[neighborY][neighborX]
                        neighbors[neighbor_indexs[`${l}_${o}`]] = block
                    }
                } else {
                    // border = true
                }
            }
        }
        return neighbors
    }

    convertToTileGrid() {
        // convert noise_grid to strings with unique where different characters represents different tile textures
        // e.g. water tiles = '-'

        this.tile_grid = Array.from(Array(noise_grid.length), () => '');
        for (var y=0;y<noise_grid.length-1;y++) {
            for (var x=0;x<noise_grid.length-1;x++) {
                if (noise_grid[y][x]) {
                    // land tile
                    // use grid_pattern to determine which land sprite we want
                    // e.g. '=' is equal to img/tiles/land/64/tile1.png
                    var char = this.gridPatternToChar(`${x}_${y}`)

                    if (char)
                        this.tile_grid[y] += char
                    else
                        this.tile_grid[y] += '='
                } else {
                    // water tile
                    this.tile_grid[y] += '-'
                }
            }
        }
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
        // console.log(visual_map)
    }

    convertCamCordsToWorldCords(x, y) {
        let noise_gridY_center = Number.parseInt((this.tile_grid.length -1) / 2),
            noise_gridX_center = Number.parseInt((this.tile_grid.length -1) / 2)
        return [x+noise_gridX_center, y+noise_gridY_center]
    }

    calTilesOnScreen() {
        let half_height = Math.round(screen_h/2)
        let half_width = Math.round(screen_w/2)
        let camera_x = Math.ceil(Math.round(camera.x) / worldBlockSize)
        let camera_y = Math.ceil(Math.round(camera.y) / worldBlockSize)
        // log("half_height: ", half_height)
        // log("half_width: ", half_width)
        // log("camera_x", camera_x)
        // log("camera_y", camera_y)
        // log(noise_grid)
        let xs = [Math.ceil((camera_x*worldBlockSize-half_width) / worldBlockSize), Math.ceil((camera_x*worldBlockSize+half_width) / worldBlockSize)]
        let ys = [Math.ceil((camera_y*worldBlockSize-half_height) / worldBlockSize), Math.ceil((camera_y*worldBlockSize+half_height) / worldBlockSize)]
        // console.log("ys: ", ys)
        // console.log("xs: ", xs)


        let noise_gridY_center = Number.parseInt((this.tile_grid.length -1) / 2)

        ys = [noise_gridY_center + ys[0], noise_gridY_center + ys[1]]
        
        let noise_gridX_center = Number.parseInt((this.tile_grid.length -1) / 2)

        xs = [noise_gridX_center + xs[0], noise_gridX_center + xs[1]]

        // console.log(ys[0], ys[1], this.tile_grid.slice(ys[0], ys[1]), xs[0], xs[1])

        var screen_tile_grid = []
        // console.log(ys, xs)
        this.tile_grid.slice(ys[0], ys[1]).forEach(x_string => {
            screen_tile_grid.push(x_string.slice(xs[0], xs[1]))
        })
       
        this.screen_tile_grid = screen_tile_grid

        if (!this.screen_y_length || !this.screen_x_length) {
            this.screen_y_length = this.screen_tile_grid.length
            this.screen_x_length = this.screen_tile_grid[0].length
        }
    }

    renderWorldBasic() {
        this.calTilesOnScreen()

        let half_height = Math.round(screen_h/2)
        let half_width = Math.round(screen_w/2)
        let camera_x = Math.ceil(Math.round(camera.x) / worldBlockSize)
        let camera_y = Math.ceil(Math.round(camera.y) / worldBlockSize)

        let xs = [Math.ceil((camera_x*worldBlockSize-half_width) / worldBlockSize), Math.ceil((camera_x*worldBlockSize+half_width) / worldBlockSize)]
        let ys = [Math.ceil((camera_y*worldBlockSize-half_height) / worldBlockSize), Math.ceil((camera_y*worldBlockSize+half_height) / worldBlockSize)]
        
        if (xs[0] == 0)
            xs[0]++
        if (ys[0] == 0)
            ys[0]++
        // filter out tiles outside of screen
        // custom Group attribute to store tiles in ordered manner
        // custom draw func to make use of custom tile list
        
        var tileIndexs = {'-': 0, '=': 0};
        var tgy_index = 0;
        for (var i=ys[0];i<Math.ceil(ys[1]);i++) {
            var tgx_index = 0;
            for (var j=xs[0];j<Math.ceil(xs[1]);j++) {
                if (!this.screen_tile_grid[tgy_index])
                    continue
                var tile_char = this.screen_tile_grid[tgy_index][tgx_index]
                var tile_sprite_group = this.tiles[tile_char]

                if (!tile_sprite_group)
                    continue
                
                
                var cords = `${j*worldBlockSize}_${i*worldBlockSize}`
                // var tile_sprite = tile_sprite_group[tileIndexs[tile_char]]
                if (!this.tilesLookup[cords]) {
                    var deleted = tile_sprite_group.remove_opposite_tile(j*worldBlockSize, i*worldBlockSize)
                    if (deleted)
                        tileIndexs[tile_char]--
                    // we need to create a new tile in group
                    var new_tile = new tile_sprite_group.Sprite()
                    tile_sprite_group.add_tile(new_tile)
                    new_tile.y = i*worldBlockSize
                    new_tile.x = j*worldBlockSize
                    // console.log(new_tile, i*worldBlockSize, j*worldBlockSize)
                    this.tilesLookup[cords] = new_tile
                    // console.log(new_tile.x, new_tile.y)
                }
                tileIndexs[tile_char]++
                tgx_index++
            }
            tgy_index++
        }
    }
    renderWorld() {
        this.calTilesOnScreen()
        let half_height = Math.round(screen_h/2)
        let half_width = Math.round(screen_w/2)
        var water_display_tile_grid = this.screen_tile_grid

        let water = this.tiles['water']
        var tilesGroup = new Tiles(
            water_display_tile_grid, camera.x-half_width, camera.y-half_height, water.w, water.h
        );
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