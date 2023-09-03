class Cellular_Automata {
    constructor() {

    }

    generateNoiseGrid(density, width, height) {
        console.log(width)
        console.log(height)
        width = Math.ceil(1 * width)
        height = Math.ceil(1 * height)

        console.log(width)
        console.log(height)

        noise_grid = Array.from(Array(height), () => new Array(width))

        console.log(noise_grid)
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

            for (let y=0;y<Math.ceil(screen_h/16);y++) {
                for (let x=0;x<Math.ceil(screen_w/16);x++) {
                    var neighbor_wall_count = 0
                    let border = false

                    for (let l=0;l<3;l++) {
                        let neighborX = this.get_neighbor_wall(x, l)

                        for (let o=0;o<3;o++) {
                            let neighborY = this.get_neighbor_wall(y, o)
                           
                            if (world.is_within_map_bounds(neighborX*16, neighborY*16)) {
                                if (neighborX != x || neighborY != y) {
                                    if (temp_grid[neighborY][neighborX]) {
                                        neighbor_wall_count++
                                    }
                                }
                            } else {
                                // border = true
                            }
                        }
                    }
                    if (neighbor_wall_count > 4 || border) {
                        grid[y][x] = true
                    } else {
                        grid[y][x] = false
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