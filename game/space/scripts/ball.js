window.addEventListener("load", function() { // Wait for the window to finish loading

  var Q = Window.Q = Quintus()
      .include("Sprites , Scenes, 2D , Input")
      .setup({
        width:1000 ,
        height:600
      });


  function drawLines(ctx){
    ctx.save() ;
    ctx.strokeStyle = "#FFFFFF" ;

    for (var x = 0 ; x < 1000 ; x += 100){
      ctx.beginPath() ;
      ctx.moveTo(x,0) ;
      ctx.strokeStyle = "red" ;
      ctx.lineTo(x,600) ;
      ctx.stroke() ;
    }
    ctx.restore() ;
  }


  Q.Sprite.extend("Background",{
    draw: function(ctx){
      ctx.beginPath() ;
      ctx.fillStyle = "yellow" ;
      ctx.rect(0,0,400,400);
      ctx.fill();
      ctx.closePath();
    }
  })

  Q.MovingSprite.extend("Ball" , {
    draw: function(ctx) {
      ctx.beginPath() ;
      ctx.arc( -this.p.cx , -this.p.cy , this.p.w/2 , 0 , Math.PI*2 ) ;
      ctx.fillStyle = "black" ;
      ctx.fill() ;
      ctx.closePath();
    },
    repeat: function(){
      if(this.p.y > 400){
        this.p.x = 0 ;
        this.p.y = 0 ;

        this.p.vx = 30 ;
        this.p.vy = 20 ;

        console.log(this.p); 
      }
    }

  });

  var background = new Q.Background({
    x: 0,
    y: 0,
    name: "background"
  });

  // 因為是Moving Sprite ， 所以要設置 vx, vy
  var ball = new Q.Ball({
    w: 20 , 
    h: 20 ,
    x: 300,
    y: 300,
    vx: 30,
    vy: 50,
    ax: 0,
    ay: 10,
    name: "dancy"
  });

  var ball2 = new Q.Ball({
    w: 50 , 
    h: 50 ,
    x: 0,
    y: 0,
    vx: 30,
    vy:50,
    ax: 0,
    ay: 10
  });


  var ball3 = new Q.Ball({
    w: 20 , 
    h: 40 ,
    x: 0,
    y: 0,
    vx: 10,
    vy:20,
    ax: 0,
    ay: 10
  });

  var ball4 = new Q.Ball({
    w: 10 , 
    h: 20 ,
    x: 0,
    y: 0,
    vx: 50,
    vy: 20,
    ax: 0,
    ay: 10
  });

  Q.scene("level1",function(stage) {
    stage.insert(ball2);
    stage.insert(ball3);
    console.log("11");
  });

  Q.stageScene("level1" ,1);


});
