window.addEventListener("load", function() { // Wait for the window to finish loading

  var Q = window.Q = Quintus() // Create a new engine instance
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI") // Load any needed modules
    .setup("myGame") // Bind Quintus to the canvas with ID "myGame"
    .controls(true) // Add in default controls (keyboard, buttons)
    .touch(); // Add in touch support (for the UI)

  Q.debug = true;
  Q.debugFill = true;

  Q.Sprite.extend("Bird", {
    init : function(p){
      this._super(p,{
        x: 0 ,
        y: 0 ,
        sheet: "bird",
        sprite: "bird",
        frame: 0
      })

      this.add("animation");
    }
  })

  Q.animations('bird', {
    fly_loop: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], rate: 1/8},
    stroke_up: { frames: [6,7,8,9,10,11,12,13,14,15], rate: 1/4 },
    stroke_down: { frames: [16,17,18,19,0,1,2,3,4,5], rate: 1/2 },
    no_stroke: { frames: [6], loop: false },
  });


  Q.load("spritesheet.png , sprites.json" , function(){

    Q.compileSheets("spritesheet.png","sprites.json");

      // play animation
    var bird = new Q.Bird();
    bird.play("fly_loop");

    if(Q.inputs['left']) {
    console.log("yo!");
  }

    // The gameloop renders the canvas every 1/60 of a second
    Q.gameLoop(function(dt){
      Q.clear() ;
      bird.update(dt);
      bird.render(Q.ctx);
    })
  })

});
