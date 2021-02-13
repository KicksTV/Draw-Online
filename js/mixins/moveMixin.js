const moveMixin = superclass => class extends superclass {
    mvX(value) {
        if (this.sprite) this.sprite.mvX(value)
        this.x += value
    }
    mvXV(value) {
        if (this.sprite) this.sprite.mvXV(value)
        this.x += value
    }
    mvY(value) {
        if (this.sprite) this.sprite.mvY(value)
        this.y += value
    }
    mvYV(value) {
        if (this.sprite) this.sprite.mvYV(value)
        this.y += value
    }
};

