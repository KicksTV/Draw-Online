// Globals
var objectLayer;

var playerSprite;
var koboldSprite;
var frogSprite;


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

const worldBlockSize = 16

var pause_loop = false


// P5 Functions
function preload() {
    // specify width and height of each frame and number of frames
    animations.loadAnimationSheet("gabe", 48, 48, 7)
    animations.loadAnimationSheet("kobold", 48, 48, 15)
    animations.loadAnimationSheet("frog", 32, 32, 6)
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight)
    cnv.parent("canvas")

    let worldWidth = 11520 // Math.ceil(1 * width)
    let worldHeight = 5778 // Math.ceil(1 * height)

    log("width: ", width)
    log("height: ", height)


    screen_w = 1920
    screen_h = 960

    world = new World(0, 0, worldWidth, worldHeight)
    world.startWorldClock()

    ca = new Cellular_Automata()

    noise_grid = ca.generateNoiseGrid(34, worldWidth/16, worldHeight/16) // 11520/16, 5778/16
    ca.apply_cellular_automaton(noise_grid, 20)

    log(noise_grid)

    objectLayer = new ObjectLayer()

    // Activate animations
    animations.addAnimations()

    playerSprite = new Sprite("gabe", 0, 0, 48, 48)
    koboldSprite = new Sprite("kobold", 30, 30, 48, 48)
    // koboldSprite = new Sprite("frog", 30, 30, 32, 32)



    player = new Player(playerSprite, "idleState")

    objectLayer.push(world)
    objectLayer.push(player)


    camera.zoom = 1.5

}

var mx=0;
var my=0;
var halfWidthScreen;
var halfHeightScreen;
var v

function mouseMoved() {
    // console.log("mouseX: ",mouseX)
    // console.log("mouseX: ",mouseX)
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
    
    var cursor_x_pos = camera.position.x+(mouseX-halfWidthScreen)
    var cursor_y_pos = camera.position.y+(mouseY-halfHeightScreen)
    if (cursor_x_pos != mx || cursor_y_pos != my)
        v = createVector((cursor_x_pos-mx),(cursor_y_pos-my));
    mx +=  (v.x * 1/30);
    my +=  (v.y * 1/30);
   


    // x = camera.position.x+(mouseX-halfWidthScreen-x)
    // y = camera.position.y+(mouseY-halfHeightScreen-y)

    
    text(`${Number.parseInt(mx/16)},`, mx, my)
    text(Number.parseInt(my/16), mx+25, my)
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
    text(camera.position.x/16, camera.position.x + width/4, camera.position.y + (height/4)+50)
    text(camera.position.y/16, camera.position.x + width/4+50, camera.position.y + (height/4)+50)
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