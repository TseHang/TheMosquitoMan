window.addEventListener("load", function() { // Wait for the window to finish loading
  var Q = window.Q = Quintus().include("Sprites, Scenes, Input , Touch")
      
      Q.setup({
        maximize: true
      })
      .touch(Q.SPRITE_ALL);

  Q.Sprite.extend("RandomShape", {
    init: function(p){
      p = this.createShape(p);

      this._super(p) ;

      this.on("drag");
      this.on("touchEnd");
    },

    drag: function(touch){
      this.p.dragging = true ;
      this.p.x = touch.origX + touch.dx ;
      this.p.y = touch.origY + touch.dy ;
    },

    touchEnd: function(touch){
      this.p.dragging = false ;
    },

    createShape: function(p){
      // 2 * PI * R
      var angle = Math.random()* 2 * Math.PI ;

      // floor()方法是一個靜態方法，只能藉由Math.floor()來呼叫。
      // Math.floor()方法會傳回小於或等於給定數值(輸入參數)的最大整數。
      var numPoints = 3 + Math.floor(Math.random()*5) ;
      var minX = 0 , maxX = 0 , minY = 0 , maxY = 0 , curX , curY ;
      var startAmount = 40 ;

      p = p || {} ;
      p.points = [] ;

      for ( var i = 0 ; i < numPoints ; i++){
        curX = Math.floor( Math.cos(angle) * startAmount) ;
        curY = Math.floor( Math.sin(angle) * startAmount) ;

        if ( curX < minX ) minX = curX ;
        if ( curX > maxX ) maxX = curX ;

        if ( curY < minY ) minY = curY ;
        if ( curY > maxY ) maxY = curY ;

        p.points.push([curX , curY]) ;

        // 開始的量
        startAmount += Math.floor(Math.random() * 10);
        
        // 角度！
        angle += (Math.PI * 2) / (numPoints + 1);

      }

      maxX += 30 ;
      minX -= 30 ;
      maxY += 30 ;
      minY -= 30 ;

      p.w = maxX - minX ;
      p.h = maxY - minY ;

      for(var i = 0 ; i < numPoints ; i++){
        p.points[i][0] -= minX + p.w/2;
        p.points[i][1] -= minY + p.h/2;
      }

      p.x = Math.random()*Q.width ;
      p.y = Math.random()*Q.height ;

      p.cx = p.w/2 ;
      p.cy = p.h/2 ;

      p.angle = angle ;
      p.type = 1 ;

      return p ;
    },
    step: function(dt){
      if ( this.p.over){
        this.p.scale = 1.2 ;
      }else {
        this.p.scale = 1;
      }
      var maxCol = 3 , collided = false , p = this.p ;
      p.hit = false ;

      while((collided = this.stage.search(this)) && maxCol > 0){
        if(collided) {
          console.log(collided);
          if ( this.p.dragging){
            collided.obj.p.x += collided.sperate[0] ;
            collided.obj.p.y += collided.sperate[1] ;
          }else {
            this.p.x -= collided.sperate[0] ;
            this.p.y -= collided.sperate[1] ;
          }
        }
        maxCol-- ;
      }  
    }

  });

  var numShapes = 5 ;

  Q.scene("start",new Q.Scene(function(stage){
    var shapesLeft = numShapes ;
    while(shapesLeft-- > 0){
      stage.insert(new Q.RandomShape());
    }

  }));

  Q.stageScene("start");

  Q.debug = true ;
  // Q.debugFill = true ;

  var currentObj = null ;

  Q.el.addEventListener('mousemove' , function(e){
    var x = e.offsetX || e.layerX , y = e.offsetY || e.layerY ;
    var stage = Q.stage() ;

    // Convert a canvas point to a stage point, x dimension 、 y dimension
    var stageX = Q.canvasToStageX(x , stage) ;
    var stageY = Q.canvasToStageY(y , stage) ;

    // Finds any object that collides with the point x,y on the stage (not on the canvas).
    // If `collisionMask` is used, only checks for collisions with sprites of that type.
    var obj = stage.locate(stageX , stageY) ;

    if(currentObj){ currentObj.p.over = false } ;
    if (obj){
      currentObj = obj ;
      obj.p.over = true ;
    }

  })


});
