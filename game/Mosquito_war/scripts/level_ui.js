;Quintus.LevelUI = function(Q) {

  var lives_state ;
  var life = [];

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

      power_x = Q.select('Player').items[0].p.x ;
      power_y = Q.select('Player').items[0].p.y - 80 ;

      dx = touch.x - power_x;
      dy = touch.y - power_y;

      // (2) atan2(y , x)，出來 angel是一个弧度值，且判斷好象限
      angle = Math.atan2( dy , dx)/Math.PI*180

      // 看一下有沒有吃到奧義
      is_power_up = Q.state.get("power_up");
      if(is_power_up>0) {
        sheet = 'power_up';
        this.stage.insert(new Q.PrePowerUp({
          x: power_x + 20,
          y: power_y + 5
        }));

      }else{
        sheet = 'power';
        this.stage.insert(new Q.PrePower({
          x: power_x + 20,
          y: power_y + 5
        }));
      }

      this.stage.insert(new Q.Power({
        sheet: sheet , // sheet 決定弄出哪一張圖
        x: power_x + 20,
        y: power_y,
        vx: dx,
        vy: dy,
        angle: angle + 90
      }));
    }
  });

  Q.Sprite.extend("Life" , {
    init: function(p){
      this._super(p,{
        sheet: "life",
        sprite: "life",
        y: Q.height - 15,
        type: Q.SPRITE_UI
      })
    }
  })

  Q.Sprite.extend("Lives_text" , {
    init: function(){
      this._super({
        sheet: "life_text",
        sprite: "life_text" ,
        x: 70 ,
        y: Q.height - 15 
      })

      lives_state = Q.state.get("lives");

      this.on("inserted",this,"initLives");
      Q.state.on("change.lives" , this ,"setLives") ;
    },

    initLives: function(){
      d = 20 ;

      for (i = 1 ; i <= lives_state ; i++ )
        life.push( this.stage.insert(new Q.Life({x: 90 + d*i })) );
    },

    setLives: function(){
      lives_state = Q.state.get("lives");

      // 消掉球球
      life[lives_state].destroy();
      // 把陣列清空
      life.pop();

      if (lives_state <= 0){
        Q.stageScene("gameOver") ;
      }
    }
  });

  Q.Sprite.extend("LevelStop_btn" , {
    init : function(p){
      this._super(p,{
        sheet: "level_stop",
        x: Q.width -70  ,
        y: Q.height -15 ,
        type: Q.SPRITE_UI
      })
      
      this.on("touch");
    },

    touch : function(){
      Q.stage().paused = true ;

      var container = this.stage.insert(new Q.UI.Container({
        fill: "rgba(0,0,0,0.6)" ,
        border: "5",
        shadowColor: "rgba(0,0,0,0.5)",
        w: Q.width,
        h: Q.height,
        x: Q.width/2,
        y: Q.height/2
      }));

        // 塞到container 這個容器
        this.stage.insert(new Q.Sprite({
          sheet : "level_continue",
          x: 0,
          y: 0
        }),container);
    }
  })

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