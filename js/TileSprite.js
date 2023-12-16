class TileSprite extends Sprite {
    constructor(tile, x, y, w, h) {
        super(x, y, w, h)
        this.current_animation;
        this.animations_to_load = []
        this.addAnimation("move", ...animations.get(tile))
    }
    drawSprite() {
        if (this.current_animation) this[this.current_animation]();
        drawSprite(this);
    }
}

