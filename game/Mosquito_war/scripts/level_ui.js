;Quintus.LevelUI = function(Q) {

  Q.Sprite.extend("Level_bg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'level_bg.png',
        type: Q.SPRITE_UI
      });

      this.add("tween");
      this.on("touch");
    },

    touch : function(touch){

      power_x =  Q.select('Player').items[0].p.x ;
      power_y = 380 ;

      dx = touch.x - power_x;
      dy = touch.y - power_y;
      /*
       (1) 用asin來算 --> 因為出來是角度，需判斷象限
        dz = Math.sqrt(dx*dx + dy*dy);
        angle = Math.asin( Math.abs(dy)/Math.abs(dz) )/Math.PI*180

        // 第一象限
        if (dx > 0 && dy > 0) {
          angle = angle ;
        }
        // 第二象限
        else if ( dx < 0 && dy > 0) {
          angle = 180 - angle ;
        }
        // 第三象限
        else if (dx < 0 && dy < 0) {
            angle = angle + 180 ;
        }
        // 第四象限
        else if( dx > 0 && dy < 0){
            angle = 360 - angle ;
        }
      */

      // (2) atan2(y , x)，出來 angel是一个弧度值，且判斷好象限
      angle = Math.atan2( dy , dx)/Math.PI*180

      this.stage.insert(new Q.Power({
        vx: dx,
        vy: dy,
        angle: angle + 90
      }));



    }
  });

  Q.UI.Text.extend("Level" , {
  	init: function(){
  		this._super({
  			label : "Level: 1" ,
  			align: "right" ,
  			level: 1 ,
  			x: Q.width -70  ,
  			y: Q.height - 10 ,
  			weight: "normal" ,
  			size: 18 
  		});

  		// 只要有人呼叫到 Q.state.set("level" , 2) 
  		// 就會call 這個 function
  		Q.state.on("change.level",this,"level");
  	},

  	level: function(level) {
      this.p.label = "level: " + level;
    }
  });

  Q.UI.Text.extend("Lives" , {

  	init: function(){
  		var lives = Q.state.get("lives");

  		this._super({
  			label: "Lives: "+ lives,
  			align: "left" ,
  			x: 70 ,
  			y: Q.height - 10 ,
  			weight: "normal" ,
  			size: 18
  		})

  		Q.state.on("change.lives" , this ,"lives") ;
  	},

  	lives: function(lives){
  		this.p.label = "lives: "+lives;
  	}
  });

  Q.UI.Text.extend("Score" , {
  	init: function(){
  		this._super({
  			label: "Score: 0" ,
  			align: "center",
  			x: Q.width/2 ,
  			y: Q.height - 10 ,
  			weight: "normal",
  			size: 18
  		})

  		Q.state.on("change.score",this,"score");
  	},

  	score: function(score){
  		this.p.label = "Score: "+ score ;
  	}
  })

  Q.Sprite.extend("Katha_1_bg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: -300,
        asset: 'katha_1_bg.png',
        type: 0
      });

      this.add("tween");
      this.animate({y: Q.height/2 } , 0.3 , Q.Easing.Linear);
    }
  });

  Q.Sprite.extend("Katha_1_text",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2 + 10,
        y: Q.height/2,
        asset: 'katha_1_text.png',
        type: 0,
        opacity: 0
      });

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });


  Q.Sprite.extend("Katha_close_btn",{
    init: function(p) {
      this._super(p,{
        x: Q.width - 100,
        y: Q.height/2 + 70,
        asset: 'katha_close.png',
        type: Q.SPRITE_UI
      });

      this.add("tween");
    }
  });
}