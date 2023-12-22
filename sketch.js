// Globals
var objectLayer;

var playerSprite;
var koboldSprite;
var frogSprite;

var tile_patterns = {}
var waterTile;


var player;
var w;

var screen_w;
var screen_h;

var chunk_size = 160;

var loop;
var cleared;

var noise_grid;

var animations = new P5Animation()

let ca;

const worldBlockSize = 32

var pause_loop = false

var walls = []


// P5 Functions
function preload() {
    // specify width and height of each frame and number of frames
    animations.loadPlayerAnimationSheet("gabe", 7)
    animations.loadPlayerAnimationSheet("kobold", 15)
    animations.loadPlayerAnimationSheet("frog", 6)
    animations.loadTileAnimationSheet("water", 8)

    // Activate animations
    animations.addAnimations()


    playerSprite = new Sprit("gabe", 0, 0, 48, 48)

    // waterTile = new Sprite(64, 64, 32, 32, 's')
    // waterTile.spriteSheet = `img/tiles/water/water.png`
    // waterTile.anis.offset.x = 0;
    // waterTile.anis.frameDelay = 4;

    // waterTile.addAnis({
    //     idle: { row: 0, frames: 8 },
    // });
    // waterTile.changeAni('idle')
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight)
    cnv.parent("canvas")

    camera.zoom = 1 //0.5
    camera.x = 0
    camera.y = 0

    let worldWidth = 32768
    let worldHeight = 32768
    // let worldWidth = 11520 // Math.ceil(1 * width)
    // let worldHeight = 5778 // Math.ceil(1 * height)

    // log("width: ", width)
    // log("height: ", height)


    screen_w = windowWidth //+ (windowWidth - windowWidth * camera.zoom) // 1920
    screen_h = windowHeight //+ (windowHeight - windowHeight * camera.zoom) // 960

    console.log("screen_w: ", screen_w)
    console.log("screen_h: ", screen_h)

    w = new customWorld(0, 0, worldWidth, worldHeight)
    w.startWorldClock()

    w.generateWorld()

    ca = new Cellular_Automata()

    // console.log(noise_grid)

    // noise_grid = ca.generateNoiseGrid(34, worldWidth/worldBlockSize, worldHeight/worldBlockSize) // 11520/16, 5778/16
    ca.apply_cellular_automaton(noise_grid, 16)
    
    // w.generateTileMap(ca.grid_pattern)

    w.calTileNeighbors(noise_grid)

    w.convertToTileGrid()

    w.initTiles()


    // load land tile animations
    for (var land_char of Object.keys(w.tiles)) {
        loadAni(`img/tiles/land/${land_char.charCodeAt(0)}/tile1.png`, 6)
    }


    objectLayer = new ObjectLayer()

    // koboldSprite = new Sprit("kobold", 30, 30, 48, 48)
    // koboldSprite = new Sprit("frog", 30, 30, 32, 32)

    player = new Player(playerSprite, "idleState")

    // objectLayer.push(w)
    objectLayer.push(player)

    // /push get code generate! 

    w.renderWorldBasic()
}

var mx=0;
var my=0;
var halfWidthScreen;
var halfHeightScreen;
var cursor_x_pos;
var cursor_y_pos;
var v

function mouseMoved() {
    walls = []
    // console.log("mouseX: ",mouseX)
    // console.log("mouseX: ",mouseX)

    var x = Number.parseInt(cursor_x_pos/worldBlockSize)
    var y = Number.parseInt(cursor_y_pos/worldBlockSize)

    if (x == -0 || x < 0)
        x += -1
    if (y == -0 || y < 0)
        y += -1

    var neighbor_wall_count = 0

    // console.log(x, y)
    // for (let l=0;l<3;l++) {
    //     let neighborX = ca.get_neighbor_wall(x, l)

    //     for (let o=0;o<3;o++) {
    //         let neighborY = ca.get_neighbor_wall(y, o)
    //         if (w.is_within_map_bounds(neighborX*worldBlockSize, neighborY*worldBlockSize)) {
    //             if (neighborX != x || neighborY != y) {
    //                 // if (neighborX == 1)
    //                 //     neighborX -= 2
    //                 // else
    //                 //     neighborX -= 2
    //                 if (Cellular_Automata.getNoiseGrid(noise_grid, neighborX, neighborY)) {
    //                     walls.push([neighborX, neighborY])
    //                     neighbor_wall_count++
    //                 }
    //             }
    //         }
    //     }
    // }
    // if (neighbor_wall_count > 4) {
    //     console.log("green")
    // } else {
    //     console.log("blue")
    // }
    // console.log(walls)


}


function draw() {
    clear()
    fixedUpdate()   // physics
    update()        // game logic
    lateUpdate()    // after movement
    render()
    staticRender()


    push()
    fill(255)
    stroke(0)

    halfWidthScreen = windowWidth/2
    halfHeightScreen = windowHeight/2
    
    cursor_x_pos = camera.x+(mouseX-halfWidthScreen)
    cursor_y_pos = camera.y+(mouseY-halfHeightScreen)
    // if (cursor_x_pos != mx || cursor_y_pos != my)
    //     v = createVector((cursor_x_pos-mx),(cursor_y_pos-my));
    // mx +=  (v.x * 1/30);
    // my +=  (v.y * 1/30);
    mx = cursor_x_pos
    my = cursor_y_pos

    // for (var w of walls) {
    //     push()
    //     fill(color(245, 66, 66))
    //     rect(w[0]*worldBlockSize, w[1]*worldBlockSize, worldBlockSize, worldBlockSize)
    //     pop()
    // }
    
   


    // x = camera.x+(mouseX-halfWidthScreen-x)
    // y = camera.y+(mouseY-halfHeightScreen-y)

    
    text(`${Number.parseInt(mx/worldBlockSize)},`, mx, my)
    text(Number.parseInt(my/worldBlockSize), mx+25, my)
    pop()
}

function keyPressed() {
    if (keyCode === 83) {
        console.log("Applied Cellular Automaton")
        // cleared = clearInterval(loop);
        ca.apply_cellular_automaton(noise_grid, 1)
    }
    else if (keyCode === 80) {
        pause_loop = !pause_loop
        if (pause_loop)
            noLoop()
        else
            loop()
    }
}

function mouseClicked(e) {
    // get mouse cords
    var x = Math.round(((mouseX-windowWidth/2)+camera.x)/worldBlockSize),
        y = Math.round(((mouseY-windowHeight/2)+camera.y)/worldBlockSize);

    // console.log(x, y)
    // work out which tile has been clicked
    var [x, y] = w.convertCamCordsToWorldCords(x, y)
    // print out neighbors for debugging
    var tile_char = w.tile_grid[y][x]
    console.log(x, y, tile_char, w.grid_pattern[`${x}_${y}`], w.gridPatternToChar(`${x}_${y}`))
    
}

// User defined functions
function fixedUpdate() {
   
}

function update() {
    if (camera.x != player.getX() || camera.y != player.getY()) {
        var cam = {prev_x: camera.x, prev_y: camera.y}
        Object.assign(camera, cam);
        //set the camera position to the ghost position
        camera.x = player.getX()
        camera.y = player.getY()
    }
    objectLayer.update()
}

function lateUpdate() {

}

function render() {
    objectLayer.draw()

    push()
    let fps = frameRate()
    fill(255)
    stroke(0)
    text("FPS: " + fps.toFixed(2), (camera.x - width/4)-100, camera.y + (height/4)+50)
    pop()

    push()
    fill(255)
    stroke(0)
    text(camera.x/worldBlockSize, camera.x + width/4, camera.y + (height/4)+50)
    text(camera.y/worldBlockSize, camera.x + width/4+50, camera.y + (height/4)+50)
    pop()
}

function staticRender() {
    w.staticRender()
}


const log = function(msg) {
    if (isLooping()) {
        // if looping don't log
        return
    } else {
        console.log(msg)
    }
}