// Globals
var objectLayer;

var playerSprite;
var koboldSprite;

var player;
var world;

var loop;
var cleared;

var animations = new P5Animation()


// P5 Functions
function preload() {
    // specify width and height of each frame and number of frames
    animations.loadAnimationSheet("gabe", 48, 48, 7)
    animations.loadAnimationSheet("kobold", 48, 48, 15)
}

function setup() {
    var cnv = createCanvas(500, 500)
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);

    objectLayer = new ObjectLayer()

    world = new World(0, 0, 500, 500)
    world.startWorldClock()

    // Activate animations
    animations.addAnimations()

    playerSprite = new Sprite("gabe", 250, 250, 48, 48)
    koboldSprite = new Sprite("kobold", 30, 30, 48, 48)

    player = new Player(playerSprite, "idleState")

    objectLayer.push(world)
    objectLayer.push(player)

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
    if (keyCode === 83 && !cleared) {
        console.log("Stopped creation loop!")
        cleared = clearInterval(loop);
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
}

function staticRender() {
    background(50)
}