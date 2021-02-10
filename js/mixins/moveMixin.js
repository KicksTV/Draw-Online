// Components Bar Component and Connection Mixin 
const moveMixin = superclass => class extends superclass {
    mvX(value) {
        this.x += value
    }
    mvY(value) {
        this.y += value
    }
};

