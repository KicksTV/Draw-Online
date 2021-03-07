class Kobold extends Monster {
   constructor(x=0, y=0) {
       super(new Sprite("kobold", 30, 30, 48, 48, 15), "idleState")

       this.setX(x)
       this.setY(y)
   }
}