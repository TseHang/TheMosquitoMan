window.addEventListener("load", function(){
  var Q= window.Q = Quintus()
      .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI , TMX")
      .setup({maximize: true}) 
      .controls().touch() ;

  Q.Sprite.extend("Player", {
    init: function(p){
      this._super(p,{
        asset: "sprite.png", 
        x: 500 , 
        y: 200,
        jumpSpeed: -400,
        speed: 300
      });

      this.add('2d') ;
      this.on('hit.sprite' , function(collision){
        console.log(collision);
        if(collision.obj.isA("Tower")){
          console.log("11");
          Q.stageScene("endGame" , 1 , {
            label: "You Win!"
          });

          this.destroy() ;
        }
      })
    }
  })

  Q.Sprite.extend("Tower", {
    init: function(p) {
      this._super(p, {
        asset: "dinosaur.png",
        x: 500 ,
        y: 700
      });
    }
  });

  Q.scene("level1",function(stage) {
    var tower = stage.insert(new Q.Tower());
    var bird = stage.insert (new Q.Player()); 
    
    stage.add("viewport").follow(bird);

    Q.input.on('up', stage , function(e){
      tower.p.y -= 10 ;
      bird.p.y -= 100 ;

      console.log(tower.p.points);
    })

    Q.input.on('down', stage , function(e){
      tower.p.y += 10 ;
    })

    Q.input.on('left', stage , function(e){
      tower.p.x -= 5 ;
    })

    Q.input.on('right', stage , function(e){
      tower.p.x += 5 ;
    })

    Q.input.on('fire', stage , function(e){
      tower.p.vy += -600 ;
    })

    Q.input.on('action', stage , function(e){
      tower.p.x = 0 ;
      tower.p.y = 0 ;
    })

    Q.gameLoop(function(dt){
      Q.clear();
      tower.update(dt);
      bird.update(dt);
      bird.render(Q.ctx);
      tower.render(Q.ctx);
    })

  });

  Q.scene("endGame" , function(stage){
    var container = stage.insert(new Q.UI.Button({
      x: Q.width/2,
      y: Q.height/2,
      fill: "yellow"
    }));

    var button = container.insert(new Q.UI.Button({
      x: 0,
      y:0,
      fill: "#CCCCCC",
      label: "Play Again"
    }))

    var label = container.insert(new Q.UI.Text({
      x: 10,
      y: -10 - button.p.h ,
      label: stage.options.label
    })) ;

    button.on("click" , function(){
      Q.clearStages() ;
      Q.stageScene('level1') ;
      console.log("11");
    })

    container.fit(20);

  })

  Q.load("sprite.png , dinosaur.png" , function(){
    Q.stageScene("level1");
    Q.debug = true ;
    Q.input.keyboardControls();
  })
})