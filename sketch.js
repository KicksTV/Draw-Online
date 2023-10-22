// Globals
var objectLayer;

var playerSprite;
var koboldSprite;
var frogSprite;

var tile_patterns = {}
var waterTile;


var player;
var world;

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
    animations.loadPlayerAnimationSheet("gabe", 48, 48, 7)
    animations.loadPlayerAnimationSheet("kobold", 48, 48, 15)
    animations.loadPlayerAnimationSheet("frog", 32, 32, 6)
    animations.loadTileAnimationSheet("water", 32, 32, 8)

}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight)
    cnv.parent("canvas")

    // Activate animations
    animations.addAnimations()

    camera.zoom = 1 //1.5

    let worldWidth = 32768
    let worldHeight = 32768
    // let worldWidth = 11520 // Math.ceil(1 * width)
    // let worldHeight = 5778 // Math.ceil(1 * height)

    log("width: ", width)
    log("height: ", height)


    screen_w = displayWidth + (displayWidth - displayWidth * camera.zoom) // 1920
    screen_h = displayHeight + (displayHeight - displayHeight * camera.zoom) // 960

    console.log("screen_w: ", screen_w)
    console.log("screen_h: ", screen_h)

    world = new World(0, 0, worldWidth, worldHeight)
    world.startWorldClock()

    world.generateWorld()

    console.log(noise_grid)

    ca = new Cellular_Automata()

    // noise_grid = ca.generateNoiseGrid(34, worldWidth/worldBlockSize, worldHeight/worldBlockSize) // 11520/16, 5778/16
    ca.apply_cellular_automaton(noise_grid, 16)

    tile_patterns['water'] = [false, false, false, false, false, false, false, false]
    
    // world.generateTileMap(ca.grid_pattern)


    objectLayer = new ObjectLayer()

    

    playerSprite = new Sprite("gabe", 0, 0, 48, 48)
    koboldSprite = new Sprite("kobold", 30, 30, 48, 48)
    // koboldSprite = new Sprite("frog", 30, 30, 32, 32)



    player = new Player(playerSprite, "idleState")

    objectLayer.push(world)
    objectLayer.push(player)

    // jdjfjdfkjdfkjdfkjdfkjdfkjdfjkfdkjdjkdkjdkjdfjkdfkdfjkd
    // lely = love dora forever
    // if lely love dora = happy dora
    // if lely + dora = 5 years = marriage and forever 
    // else lely huggy and kissy 

    // /push get code generate! 

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
    for (let l=0;l<3;l++) {
        let neighborX = ca.get_neighbor_wall(x, l)

        for (let o=0;o<3;o++) {
            let neighborY = ca.get_neighbor_wall(y, o)
            if (world.is_within_map_bounds(neighborX*worldBlockSize, neighborY*worldBlockSize)) {
                if (neighborX != x || neighborY != y) {
                    // if (neighborX == 1)
                    //     neighborX -= 2
                    // else
                    //     neighborX -= 2
                    if (Cellular_Automata.getNoiseGrid(noise_grid, neighborX, neighborY)) {
                        walls.push([neighborX, neighborY])
                        neighbor_wall_count++
                    }
                }
            }
        }
    }
    // if (neighbor_wall_count > 4) {
    //     console.log("green")
    // } else {
    //     console.log("blue")
    // }
    // console.log(walls)


}

function draw() {
    clear()
    staticRender()
    fixedUpdate()   // physics
    update()        // game logic
    lateUpdate()    // after movement
    render()

    push()
    fill(255)
    stroke(0)

    halfWidthScreen = windowWidth/2
    halfHeightScreen = windowHeight/2
    
    cursor_x_pos = camera.position.x+(mouseX-halfWidthScreen)
    cursor_y_pos = camera.position.y+(mouseY-halfHeightScreen)
    // if (cursor_x_pos != mx || cursor_y_pos != my)
    //     v = createVector((cursor_x_pos-mx),(cursor_y_pos-my));
    // mx +=  (v.x * 1/30);
    // my +=  (v.y * 1/30);
    mx = cursor_x_pos
    my = cursor_y_pos

    for (var w of walls) {
        push()
        fill(color(245, 66, 66))
        rect(w[0]*worldBlockSize, w[1]*worldBlockSize, worldBlockSize, worldBlockSize)
        pop()
    }
    
   


    // x = camera.position.x+(mouseX-halfWidthScreen-x)
    // y = camera.position.y+(mouseY-halfHeightScreen-y)

    
    text(`${Number.parseInt(mx/worldBlockSize)},`, mx, my)
    text(Number.parseInt(my/worldBlockSize), mx+25, my)
    pop()
}

function keyPressed() {
    if (keyCode === 83) {
        log("Applied Cellular Automaton")
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

// User defined functions
function fixedUpdate() {
   
}

function update() {

    //set the camera position to the ghost position
    camera.position.x = player.getX()
    camera.position.y = player.getY()
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
    text("FPS: " + fps.toFixed(2), (camera.position.x - width/4)-100, camera.position.y + (height/4)+50)
    pop()

    push()
    fill(255)
    stroke(0)
    text(camera.position.x/worldBlockSize, camera.position.x + width/4, camera.position.y + (height/4)+50)
    text(camera.position.y/worldBlockSize, camera.position.x + width/4+50, camera.position.y + (height/4)+50)
    pop()
}

function staticRender() {
    world.staticRender()
}


const log = function(msg) {
    if (isLooping()) {
        // if looping don't log
        return
    } else {
        console.log(msg)
    }
}