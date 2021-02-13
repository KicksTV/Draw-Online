// Globals
var objectLayer;

var playerSprite;
var player;
var world;

var loop;
var cleared;


// P5 Functions
function preload() {
    // specify width and height of each frame and number of frames
    playerSprite = new Sprite(250, 250, 48, 48)
    playerSprite.addImage('idle', 'img/gabe/gabe-idle.png')
    playerSprite.loadAnimationSheet('run', 'img/gabe/gabe-idle-run.png', 48, 48, 7)
}

function setup() {
    var cnv = createCanvas(500, 500)
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);

    objectLayer = new ObjectLayer()

    world = new World(0, 0, 500, 500)


    // Activate animations
    playerSprite.addAnimations()


    // Dynamically spawn monsters onto the world
    loop = setInterval( function() {
        let rx = random(500);
        let ry = random(500);

        var monsterSprite = new Sprite(rx, ry, 48, 48);
        monsterSprite.addImage('idle', 'img/mobs/kobold-idle.png')
        monsterSprite.loadAnimationSheet('run', 'img/mobs/kobold-run.png', 48, 48, 15)
        monsterSprite.addAnimations()

        var monster = new Monster(rx, ry, monsterSprite, "idleState")

    
        world.objects.push(monster)
    }, 5000);


    player = new Player(250, 250, playerSprite, "idleState")

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
    camera.position.x = player.x;
    camera.position.y = player.y;
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