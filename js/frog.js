class Frog extends Monster {
    constructor(x=0, y=0) {
        super(new Sprit("frog", 30, 30, 32, 32, 6), "idleState")
        this.cares_about_walls
        this.setX(x)
        this.setY(y)
    }
 }