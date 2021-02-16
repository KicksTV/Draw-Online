const moveMixin = superclass => class extends superclass {
    mvX(setThis, value) {
        setThis.sprite.position.x += value
    }
    // mvXV(value) {
    //     if (this.sprite) this.sprite.mvXV(value)
    //     this.x += value
    // }
    mvY(setThis, value) {
        setThis.sprite.position.y += value
    }
    // mvYV(value) {
    //     if (this.sprite) this.sprite.mvYV(value)
    //     this.y += value
    // }
};

