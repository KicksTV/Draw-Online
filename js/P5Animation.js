class P5Animation {
    constructor() {
        this.load_animations = []
        this.animations = new Map()

    }
    get(key) {
        return this.animations.get(key)
    }
    loadPlayerAnimationSheet(character, w, h, frames) {
        this.load_animations.push({name: character, 
                                   animation: loadSpriteSheet(`img/${character}/${character}-run.png`, w, h, frames)})
    }
    loadTileAnimationSheet(tile, w, h, frames) {
        this.load_animations.push({name: tile, 
                                   animation: loadSpriteSheet(`img/tiles/${tile}/${tile}.png`, w, h, frames)})
    }
    addAnimations() {
        this.load_animations.forEach(obj => {
            this.animations.set(obj.name, loadAnimation(obj.animation))
        })
    }
}