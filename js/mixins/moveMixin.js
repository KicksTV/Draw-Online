const moveMixin = superclass => class extends superclass {
    mvX(value) {
        if (this.cares_about_walls && this.allowedToMove(this.getX()+value, null) || !this.cares_about_walls) {
            let x = this.getX() + value
            this.setX(x)
        }
    }
    mvY(value) {
        if (this.cares_about_walls && this.allowedToMove(null, this.getY()+value) || !this.cares_about_walls) {
            let y = this.getY() + value
            this.setY(y)
        }
    }
    allowedToMove(x, y) {
        if (!x)
            x = this.getX()
        if (!y)
            y = this.getY()

        if (x >= 0)
            x += this.sprite._w/2
        else
            x -= this.sprite._w/2
        if (y >= 0)
            y += this.sprite._h/2
        else
            y -= this.sprite._h/2
        x = x/worldBlockSize
        y = y/worldBlockSize


        // console.log(x, y)
        // console.log(customWorld.isWall(x, y))
        return customWorld.isWall(x, y)
    }
};

