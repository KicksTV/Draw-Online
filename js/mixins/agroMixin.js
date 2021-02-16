const agroMixin = superclass => class extends superclass {
    inAgroRange(ofThis) {
        let diffV = dist(this.getX(), this.getY(), ofThis.getX(), ofThis.getY())
        if (diffV <= 150 && diffV >= 15) {
            this.agroMove(ofThis)
        } else {
            this.setState("idleState")
        }
    }
    agroMove(ofThis) {
        let xval = this.getX() - ofThis.getX()
        let mvXVal = xval > 0 ? (xval / xval) * -1 : (xval / xval) * 1
        let yval = this.getY() - ofThis.getY()
        let mvYVal = yval > 0 ? (yval / yval) * -1 : (yval / yval) * 1

        if (int(this.getX()) != int(ofThis.getX())) {
            this.mvX(this, mvXVal)
            if (mvXVal > 0) {
                this.setState("moveRightState")
            }
            else if (mvXVal < 0) {
                this.setState("moveLeftState")
            }
        }
        if (int(this.getY()) != int(ofThis.getY())) {
            this.mvY(this, mvYVal)
            if (mvYVal > 0) {
                this.setState("moveUpState")
            }
            else if (mvYVal < 0) {
                this.setState("moveDownState")
            }
        }
    }
    
};

