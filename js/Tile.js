class Tile {
    // x, y, sprite, state
    constructor(tileName, x, y, w, h) {
        this.sprite = createSprite(x, y, w, h)
        this.sprite.addAnimation("move", animations.get(tileName))
        this.tile;
    }

    display() {
        drawSprite(this.sprite);
    }
}