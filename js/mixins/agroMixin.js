const agroMixin = superclass => class extends superclass {
    inAgroRange(ofThis) {
        let diffV = dist(this.x, this.y, ofThis.x, ofThis.y)
        if (diffV <= 150 && diffV >= 15) {
            let xval = this.x - ofThis.x
            let mvXVal = xval > 0 ? (xval / xval) * -1 : (xval / xval) * 1
            let yval = this.y - ofThis.y
            let mvYVal = yval > 0 ? (yval / yval) * -1 : (yval / yval) * 1

            if (int(this.x) != int(ofThis.x)) this.mvX(mvXVal)
            if (int(this.y) != int(ofThis.y)) this.mvY(mvYVal)
        }
    }
    
};

