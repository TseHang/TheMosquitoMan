Q.Sprite.extend("Bird", {
  init: function(p) {
  	this._super(p, {
      flying: true,
      wings: 2,
      x: 20, // x location of the center of the sprite
      y: 30 // y location of the center of the sprite
    });
  }
});

var bird1 = new Q.Bird();
console.log(bird1.p.flying); // true

var bird2 = new Q.Bird({ flying: false });
console.log(bird2.p.flying); //false
