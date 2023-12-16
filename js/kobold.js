class Kobold extends Monster {
   constructor(x=0, y=0) {
       super(new Sprit("kobold", 30, 30, 48, 48, 15), "idleState")
       this.cares_about_walls
       this.setX(x)
       this.setY(y)
   }
}