// Globals
var objectLayer;

var playerSprite;
var koboldSprite;

var player;
var world;

var screen_w;
var screen_h;

var chunk_size = 160;

var loop;
var cleared;

var noise_grids = [];

var animations = new P5Animation()

let ca;

const worldBlockSize = 16


// P5 Functions
function preload() {
    // specify width and height of each frame and number of frames
    animations.loadAnimationSheet("gabe", 48, 48, 7)
    animations.loadAnimationSheet("kobold", 48, 48, 15)
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight)
    cnv.parent("canvas")

    let worldWidth = 1280 // Math.ceil(1 * width)
    let worldHeight = 960 // Math.ceil(1 * height)

    screen_w = 1280
    screen_y = 960

    world = new World(0, 0, worldWidth, worldHeight)
    world.startWorldClock()

    var grid_cords = []

    ca = new Cellular_Automata()

    noise_grids.push(ca.generateNoiseGrid(40, screen_w/16, screen_h/16))
    ca.apply_cellular_automaton(noise_grids, 7)

    objectLayer = new ObjectLayer()

    // Activate animations
    animations.addAnimations()

    playerSprite = new Sprite("gabe", 0, 0, 48, 48)
    koboldSprite = new Sprite("kobold", 30, 30, 48, 48)

    player = new Player(playerSprite, "idleState")

    objectLayer.push(world)
    objectLayer.push(player)


    camera.zoom = 1.5

}

function draw() {
    clear()
    staticRender()
    fixedUpdate()   // physics
    update()        // game logic
    lateUpdate()    // after movement
    render()
}

function keyPressed() {
    if (keyCode === 83) {
        console.log("Applied Cellular Automaton")
        // cleared = clearInterval(loop);
        ca.apply_cellular_automaton(noise_grid, 1)
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
    text("FPS: " + fps.toFixed(2), camera.position.x-620, camera.position.y+300)
    pop()
}

function staticRender() {
    world.staticRender()
}