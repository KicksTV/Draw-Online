class Cellular_Automata {
    constructor() {
        this.grid_pattern = {} // e.g. {'y_x': [neighbors]}
    }

    static getNoiseGrid(noise_grid, gridX, gridY) {
        if (noise_grid && noise_grid.length) {

            // console.log(gridX, gridY)
            let noise_gridY_center = Number.parseInt((noise_grid.length -1) / 2)

            let noise_grid_y = noise_grid[noise_gridY_center + gridY]

            
            let noise_gridX_center = Number.parseInt((noise_grid_y.length -1) / 2)

            var noise_grid_x = noise_grid_y[noise_gridX_center + gridX]

            return noise_grid_x
        }
        return false

    }

    generateNoiseGrid(density, width, height) {
        width = Math.ceil(1 * width)
        height = Math.ceil(1 * height)

        noise_grid = Array.from(Array(height), () => new Array(width))

        for (var i=0;i<height;i++) {
            for (var j=0;j<width;j++) {
                var random = Math.floor(Math.random() * 101);  
                if (random > density) {
                    noise_grid[i][j] = true
                } else {
                    noise_grid[i][j] = false
                }
            }
        }
        return noise_grid
    }

    apply_cellular_automaton(grid, count) {
        for (var i=0; i<count;i++) {
            var temp_grid = _.cloneDeep(grid)
            for (let y=0;y<Math.ceil(world.h/worldBlockSize);y++) {
                for (let x=0;x<Math.ceil(world.w/worldBlockSize);x++) {
                    var neighbors = []
                    var neighbor_wall_count = 0
                    let border = false
                    
                    // console.log(y,x)

                    for (let l=0;l<3;l++) {
                        let neighborX = this.get_neighbor_wall(x, l)

                        for (let o=0;o<3;o++) {
                            let neighborY = this.get_neighbor_wall(y, o)
                           
                            if (world.is_within_map_bounds(neighborX*worldBlockSize, neighborY*worldBlockSize)) {
                                if (neighborX != x || neighborY != y) {
                                    var block = temp_grid[neighborY][neighborX]
                                    neighbors.push(block)
                                    if (block) {
                                        neighbor_wall_count++
                                    }
                                }
                            } else {
                                // border = true
                            }
                        }
                    }

                    // smoothing jaggid blocks
                    if (neighbor_wall_count > 4 || border) {
                        grid[y][x] = true
                    }
                    else if (temp_grid[y][x] && neighbors[1] && neighbors[2] && neighbors[4] && neighbors[7]) {
                        grid[y][x] = true
                    }
                    else if (temp_grid[y][x] && neighbors[0] && neighbors[2] && neighbors[3] && neighbors[6]) {
                        grid[y][x] = true
                    }
                    else if (temp_grid[y][x] && neighbors[0] && neighbors[5] && neighbors[6] && neighbors[7]) {
                        grid[y][x] = true
                    }
                    else if (temp_grid[y][x] && neighbors[0] && neighbors[2] && neighbors[3] && neighbors[4]) {
                        grid[y][x] = true
                    }
                    else {
                        grid[y][x] = false
                    }
                    
                    if (i == count-1) {
                        // remember cord and there neighbors for use later
                        this.grid_pattern[`${y}_${x}`] = neighbors
                    }
                }
            }
        }
        return;
    }

    get_neighbor_wall(cord, val) {
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

}