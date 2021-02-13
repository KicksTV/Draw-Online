const animationStateMixin = superclass => class extends superclass {

    updateState() {
        this[this.state]();
    }
    setState(state) {
        this.state = state;
    }

    // State Functions
    
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

