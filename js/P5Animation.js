class P5Animation {
    constructor() {
        this.load_animations = []
        this.animations = new Map()

    }
    get(key) {
        return this.animations.get(key)
    }
    loadPlayerAnimationSheet(character, frames) {
        this.load_animations.push({name: character, 
                                   animations: [
                                    ['run', loadAni(`img/${character}/${character}-run.png`, frames)],
                                    ['idle', loadAni(`img/${character}/${character}-run.png`, frames)],
                                ]})
    }
    loadTileAnimationSheet(tile, frames) {
        this.load_animations.push({name: tile, 
                                   animations: [loadAni(`img/tiles/${tile}/${tile}.png`, frames)]})
    }
    addAnimations() {
        this.load_animations.forEach(obj => {
            this.animations.set(obj.name, obj.animations)
        })
    }
}