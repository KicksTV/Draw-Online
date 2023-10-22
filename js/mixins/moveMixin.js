const moveMixin = superclass => class extends superclass {
    mvX(value) {
        if (this.cares_about_walls && this.allowedToMove(this.sprite.position.x+value, null) || !this.cares_about_walls)
            this.sprite.position.x += value
    }
    mvY(value) {
        if (this.cares_about_walls && this.allowedToMove(null, this.sprite.position.y+value) || !this.cares_about_walls)
            this.sprite.position.y += value
    }
    allowedToMove(x, y) {
        if (!x)
            x = this.getX()
        if (!y)
            y = this.getY()

        if (x >= 0)
            x += this.sprite.width/2
        else
            x -= this.sprite.width/2
        if (y >= 0)
            y += this.sprite.height/2
        else
            y -= this.sprite.height/2
        x = x/worldBlockSize
        y = y/worldBlockSize


        // console.log(x, y)
        // console.log(World.isWall(x, y))
        return World.isWall(x, y)
    }
};

