// Globals
var objectLayer;

var sprite_sheet;
var run_animation;

// P5 Functions

function preload() {
    // specify width and height of each frame and number of frames
    sprite_sheet = loadSpriteSheet('img/gabe/gabe-idle-run.png', 24, 24, 7)
    run_animation = loadAnimation(sprite_sheet)
  }

function setup() {
    createCanvas(800, 800)

    objectLayer = new ObjectLayer()

    var player = new Player(50, 50, 250, 250, color(120, 140, 90))
 
    objectLayer.push(player)
}

function draw() {
    staticRender()
    fixedUpdate()   // physics
    update()        // game logic
    lateUpdate()    // after movement
    render()
}

// User defined functions
function fixedUpdate() {

}

function update() {
    objectLayer.update()
}

function lateUpdate() {

}

function render() {
    objectLayer.draw()
    scale(2)

    // animate the sprite sheet
    animation(run_animation, 100, 130);

}

function staticRender() {
    background(50)

}