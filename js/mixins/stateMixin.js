// Components Bar Component and Connection Mixin 
const stateMixin = superclass => class extends superclass {

    updateState() {
        this[this.state]();
    }

    // State Functions
    setState(state) {
        this.state = state;
    }
    idleState() {
        if (this.sprite) this.sprite.setAnimation("idle")
    }
    moveRightState() {
        if (this.sprite) {
            this.sprite.setAnimation("moveright")
        }
    }
    moveLeftState() {
        if (this.sprite) {
            this.sprite.setAnimation("moveleft")
        }
    }
    moveUpState() {
        if (this.sprite) {
            this.sprite.setAnimation("moveup")
        }
    }
    moveDownState() {
        if (this.sprite) {
            this.sprite.setAnimation("movedown")
        }
    }
};

