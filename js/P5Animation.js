class P5Animation {
    constructor() {
        this.load_animations = []
        this.animations = new Map()

    }
    get(key) {
        return this.animations.get(key)
    }
    loadAnimationSheet(character, w, h, frames) {
        this.load_animations.push({character: character, 
                                   animation: loadSpriteSheet(`img/${character}/${character}-run.png`, w, h, frames)})
    }
    addAnimations() {
        this.load_animations.forEach(obj => {
            this.animations.set(obj.character, loadAnimation(obj.animation))
        })
    }
}