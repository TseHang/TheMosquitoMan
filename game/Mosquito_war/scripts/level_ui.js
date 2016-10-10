
;Quintus.LevelUI = function(Q) {
  var lives_state ;
  var life = [];
  var container ;
  var isLevelStop = false;

  Q.Sprite.extend("Level_bg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        opacity:1 ,
        asset: 'level/level_bg.png',
        type: Q.SPRITE_UI
      });

      this.add("tween");
      this.on("touch");
    },

    touch : function(touch){
      if(Q.state.get("is_countdown_over") && !Q.state.get("isLevelStop") && Q.state.get("mosking_life")>=0){
        
        var power_x = Q.select('Player').items[0].p.x ;
        var power_y = Q.select('Player').items[0].p.y - 70 ;

        var dx = touch.x - power_x;
        var dy = touch.y - power_y;

        // atan2(y , x)，出來 angel是一个弧度值，且判斷好象限
        var angle = Math.atan2( dy , dx)/Math.PI*180

        // 看一下有沒有吃到奧義
        var is_power_up = Q.state.get("power_up");
        if(is_power_up>0) {
          sheet = 'power_up';
          this.stage.insert(new Q.PrePowerUp({
            x: power_x + 15,
            y: power_y + 20
          }));

          Q.play("powerUp.mp3");

        }else{
          sheet = 'power';
          this.stage.insert(new Q.PrePower({
            x: power_x + 15,
            y: power_y + 10
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
      var d = 20 ;

      for (var i = 1 ; i <= lives_state ; i++ )
        life.push( this.stage.insert(new Q.Life({x: 90 + d*i })) );
    },

    setLives: function(){
      lives_state = Q.state.get("lives");

      life[lives_state].destroy(); // destroy LIFE BALL()
      life.pop(); // Clear Pop array

      if (lives_state <= 0){
        Q.stageScene("gameOver") ;
      }
    }
  });

  Q.Sprite.extend("Countdown_three" , {
    init: function(p){
      this._super(p,{
        x: -100 ,
        y: 0,
        sheet: "three_dark"
      })
      this.add("tween");
      this.animate({},1,Q.Easing.Linear,{
        callback:function(){
          this.light();
        }
      });
    },
    light: function(){
      Q.play("countdown.mp3");
      this.p.sheet = "three_bright";
    }
  });
  Q.Sprite.extend("Countdown_two" , {
    init: function(p){
      this._super(p,{
        x: 0,
        y: 0,
        sheet: "two_dark"
      })
      this.add("tween");
      this.animate({},2,Q.Easing.Linear,{
        callback:function(){
          this.light();
        }
      });
    },
    light: function(){
      Q.play("countdown.mp3");
      this.p.sheet = "two_bright";
    }
  });
  Q.Sprite.extend("Countdown_one" , {
    init: function(p){
      this._super(p,{
        x: 100,
        y: 0,
        sheet: "one_dark"
      })
      this.add("tween");
      this.animate({},3,Q.Easing.Linear,{
        callback:function(){
          this.light();
        }
      });
    },
    light: function(){
      var obj = this ;
      Q.play("countdown.mp3");
      this.p.sheet = "one_bright";

      this.animate({},1,Q.Easing.Linear,{
        callback:function(){
          this.stage.trigger("countdown_over");
          Q.play("countdown_final.mp3");
        }
      });
    }
  });

  Q.Sprite.extend("LevelStop_btn" , {
    init : function(p){
      this._super(p,{
        sheet: "level_stop",
        x: Q.width - 30  ,
        y: Q.height -15 ,
        opacity:1,
        scale:1,
        type: Q.SPRITE_UI
      })
      
      this.on("touch");
      this.add("tween");
    },

    touch : function(){
      if(!Q.state.get("isLevelStop")){
        if(!Q.state.get('is_countdown_over')){
          Q.clearStage(3); // clear countdown
        }

        Q.play("click.mp3");

        button_click(this);
        stopBGM(Q.state.get("whichBGM"), 'continue') ;
        // Stop
        Q.state.set("isLevelStop",true) ;
        stageStop();

        container = this.stage.insert(new Q.UI.Container({
          fill: "rgba(0,0,0,0.6)" ,
          border: "5",
          shadowColor: "rgba(0,0,0,0.5)",
          w: Q.width,
          h: Q.height,
          x: Q.width/2,
          y: Q.height/2
        }));

        // 塞到container 這個容器
        this.stage.insert(new Q.LevelContinue_btn(),container);
        this.stage.insert(new Q.LevelGoTitle_btn(),container);
      }
    }
  })
  

  Q.Sprite.extend("LevelContinue_btn" , {
    init: function(p){
      this._super(p,{
        sheet : "level_continue",
        x: 0,
        y: -30,
        opacity:1,
        scale:1,
        type: Q.SPRITE_UI
      })

      this.on("touch");
      this.add("tween");
    },

    touch : function(){
      if(!Q.state.get('is_countdown_over')){
        Q.stageScene("countdown");
      }

      Q.play("click.mp3");

      button_click(this);
      playBGM(Q.state.get("whichBGM"));

      if (Q.state.get("isLevelStop") === true){
        Q.state.set("isLevelStop", false);
        
        container.destroy();
        stageContinue();
      }
    }
  })

  Q.Sprite.extend("LevelGoTitle_btn" , {
    init: function(p){
      this._super(p,{
        sheet : "level_goTitle",
        x: 0,
        y: 30,
        opacity:1,
        scale:1,
        type: Q.SPRITE_UI
      })

      this.on("touch");
      this.add("tween");
    },

    touch : function(){

      Q.play("click.mp3");

      button_click(this);
      stopBGM(Q.state.get("whichBGM")) ; // reset 'bgm_level1' time
      reset(); // reset

      Q.stageScene("title");
      this.container.destroy();
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

  		// If Q.state.state("level",2) is called --> this onchanged
  		Q.state.on("change.level",this,"level");
  	},

  	level: function(level) {
      this.p.label = "level: " + level;
    }
  });

  /* comment out the Score ;

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

  */

  Q.Sprite.extend("Katha_1_bg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: -300,
        asset: 'katha/katha_1_bg.png',
        type: 0
      });

      this.add("tween");
      this.animate({y: Q.height/2 } , 0.3 , Q.Easing.Linear);
    }
  });

  Q.Sprite.extend("Katha_1_title",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2 + 10,
        y: Q.height/2 - 60,
        asset: 'katha/katha_1_title.png',
        type: 0,
        opacity: 0
      });

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });

  Q.UI.Text.extend("Katha_1_text" , {
    init: function(p){
      this._super(p,{
        label: "功法：\n1. 在家中裝紗窗、紗門，不讓蚊蟲進屋，睡覺時掛蚊帳。\n2. 使用捕蚊燈電蚊拍，陰暗處或是地下室定期巡邏。\n3. 若有放在戶外的廢棄輪胎、積水容器等物品馬上清除。" ,
        align: "left",
        x: Q.width/2 + 20,
        y: Q.height/2 ,
        weight: "normal",
        opacity: 0,
        size: 16
      })

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });

  Q.UI.Text.extend("Katha_1_function" , {
    init: function(p){
      this._super(p,{
        label: "效果：\n    召喚大魔導彈攻擊，持續 10 秒。" ,
        align: "left",
        x: Q.width/2 - 60,
        y: Q.height/2 + 70 ,
        weight: "normal",
        size: 16,
        color: "darkred",
        opacity:0
      })

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
        asset: 'katha/katha_close.png',
        type: Q.SPRITE_UI
      });

      this.add("tween");
      this.on("touch");
    },

    touch: function(){
      button_click(this);
    }
  });

  Q.Sprite.extend("Katha_2_bg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: -300,
        asset: 'katha/katha_2_bg.png',
        type: 0
      });

      this.add("tween");
      this.animate({y: Q.height/2 } , 0.3 , Q.Easing.Linear);
    }
  });

  Q.Sprite.extend("Katha_2_title",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2 + 10,
        y: Q.height/2 - 60,
        asset: 'katha/katha_2_title.png',
        type: 0,
        opacity: 0
      });

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });

  Q.UI.Text.extend("Katha_2_text" , {
    init: function(p){
      this._super(p,{
        label: "功法：\n1. 清除不需要的容器，像花瓶、瓶蓋、缸盆、保麗龍\n、餅乾盒等，減少垃圾。\n2. 把暫時不需要用的容器「倒放」，以免積水。" ,
        align: "left",
        x: Q.width/2,
        y: Q.height/2 ,
        weight: "normal",
        opacity: 0,
        size: 16
      })

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });

  Q.UI.Text.extend("Katha_2_function" , {
    init: function(p){
      this._super(p,{
        label: "效果：\n    移動速度升為 300%，持續 10 秒。" ,
        align: "left",
        x: Q.width/2 - 60,
        y: Q.height/2 + 70 ,
        weight: "normal",
        size: 16,
        color: "darkred",
        opacity:0
      })

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });

  Q.Sprite.extend("Katha_3_bg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: -300,
        asset: 'katha/katha_3_bg.png',
        type: 0
      });

      this.add("tween");
      this.animate({y: Q.height/2 } , 0.3 , Q.Easing.Linear);
    }
  });

  Q.Sprite.extend("Katha_3_title",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2 + 10,
        y: Q.height/2 - 60,
        asset: 'katha/katha_3_title.png',
        type: 0,
        opacity: 0
      });

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });

  Q.UI.Text.extend("Katha_3_text" , {
    init: function(p){
      this._super(p,{
        label: "功法：\n1. 常洗澡，保持皮膚清爽。\n2. 在戶外或蚊蟲多的地方，盡量穿淺色長袖衣褲。\n3. 多吃洋蔥、大蒜、高麗菜、綠花椰菜，蚊子遠離你。" ,
        align: "left",
        x: Q.width/2+ 5,
        y: Q.height/2 ,
        weight: "normal",
        opacity: 0,
        size: 16
      })

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });

  Q.UI.Text.extend("Katha_3_function" , {
    init: function(p){
      this._super(p,{
        label: "效果：\n    就是「無敵」，持續 6.666 秒。" ,
        align: "left",
        x: Q.width/2 - 70,
        y: Q.height/2 + 70 ,
        weight: "normal",
        size: 16,
        color: "darkred",
        opacity:0
      })

      this.add("tween");
      this.animate({opacity: 1} , 0.3 , Q.Linear ,{
        delay: 0.4
      });
    }
  });
}