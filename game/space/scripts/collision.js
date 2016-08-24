window.addEventListener("load", function() { // Wait for the window to finish loading
  var Q = window.Q = Quintus().include("Sprites, Scenes")
      .setup({
        width: 960 , 
        height:512
      });

  Q.Sprite.extend("RandomShape", {
    init: function(){
      console.log(this);
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
      var p = this.p ;

      p.x += p.dx * p.speed *dt ;
      p.y += p.dy * p.speed *dt ;

      if (p.x < 0){
        p.x = 0 ;
        p.dx = 1 ;
      }else if(p.x > Q.width - p.w){
        p.dx = -1 ;
        p.x = Q.width - p.w ;
      }

      if ( p.y < 0 ){
        p.y = 0 ;
        p.dy = 1 ;
      }else if(p.y > Q.height - p.h){
        p.dy = -1 ;
        p.y = Q.height - p.h ;
      }

      p.angle += dt * p.omega ;
      p.scaleOffset += dt ;
      p.scale = 1 + Math.sin(p.scaleOffset * p.scaleSpeed) * p.scaleAmount ;

      var maxCol = 3 , collided = false ;
      p.hit = false ;

      while((collided = this.stage.search(this)) && maxCol > 0){
        if(collided) {
          console.log(collided);

          p.hit = true;
          this.p.x -= collided.sperate[0] ;
          this.p.y -= collided.sperate[1] ;
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
  Q.debugFill = true ;

});
