;Quintus.LandingUI = function(Q) {

	Q.Sprite.extend("Logo" , {
		init: function(p){
			this._super({
				x: Q.width/2 + 10 ,
				y: 150 ,
        opacity: 1 ,
				asset: "logo.png"
			})

      this.add("tween");
		}
	});

  Q.Sprite.extend("Background",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        cx: Q.width/2  ,
        cy: (Q.height/2)*3 ,
        asset: 'landing/landing_bg_long.png',
        opacity: 1 ,
        type: 0
      });

      this.add("tween");
    }
  });

  Q.Sprite.extend("Landing_start", {
    init: function(p){
      this._super(p,{
        asset: 'landing/landing_btn_start.png' ,
        x: Q.width/2 ,
        y: 300,
        opacity: 1 ,
        scale:1,
        type: Q.SPRITE_UI
      });

      this.add("tween");
      this.on("touch");
    },
    touch: function(){
      button_click(this);
    }
  });

  Q.Sprite.extend("Landing_player", {
    init: function(p){
      this._super(p,{
        asset: 'landing/landing_btn_player.png' ,
        x: Q.width/2 ,
        y: 360,
        opacity: 1 ,
        scale:1 ,
        type: Q.SPRITE_UI
      });

      this.add("tween");
      this.on("touch");
    },
    touch: function(){
      button_click(this);
    }
  })

  // 
  // INTRO 頁面！！
  // 
  Q.Sprite.extend("IntroBg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'landing/intro_bg.png',
        opacity: 1
      });

      this.add("tween");
    }
  });

  Q.Sprite.extend("IntroMan",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2 + 5 ,
        y: Q.height - 100,
        asset: 'landing/intro_man.png',
        scale: 0.1
      });

      this.add("tween");
      this.animate({scale:1} , 0.3 , Q.Easing.Quadratic.InOut);
    }
  }); 

  Q.UI.Text.extend("IntroText" , {
    init: function(){
      this._super({
        label : "               天地不仁，以萬物為芻狗。\n吾號掌蚊人，生逢亂世，慘遭「登革熱」\n危害，為了傷其根，斬其源，吾闖入終極之地\n將自己逼進死關，若不修煉至降蚊十八招大成\n，難以除害，誓死不出。\n戰友們！請幫助我一起修煉降蚊十八招吧！" ,
        align: "left" ,
        x: Q.width/2 - 40 ,
        y: Q.height/2 - 50 ,
        weight: "normal" ,
        color: "white",
        size: 20,
        opacity: 0
      });

      this.add("tween");
      this.animate({opacity:1} , 0.5 , Q.Easing.Linear);
    }
  });

  Q.Sprite.extend("IntroGo",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2 + 70,
        y: Q.height/2 + 55 ,
        asset: 'landing/intro_btn_go.png',
        opacity:0,
        scale:1 ,
        type:Q.SPRITE_UI
      });

      this.add("tween");
      this.on("touch");
      this.animate({opacity:1} , 0.5 , Q.Easing.Quadratic.InOut);
    },
    touch: function(){
      button_click(this);
    }
  }); 

  Q.Sprite.extend("IntroHowplay",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2 - 70,
        y: Q.height/2 + 55 ,
        asset: 'landing/intro_btn_howplay.png',
        opacity:0,
        scale:1,
        type:Q.SPRITE_UI
      });

      this.add("tween");
      this.on("touch");
      this.animate({opacity:1} , 0.5 , Q.Easing.Quadratic.InOut);
    },
    touch: function(){
      button_click(this);
    }
  }); 

  // 
  // PLAYER 頁面
  // 
  Q.Sprite.extend("PlayerRight" , {
    init: function(p){
      this._super(p,{
        sheet: "player_right",
        sprite: "player_right",
        x: Q.width/2 + 25,
        y: Q.height -25,
        type: Q.SPRITE_UI
      });

      this.add("animation");
    }
  })

  Q.Sprite.extend("PlayerLeft" , {
    init: function(p){
      this._super(p,{
        sheet: "player_left",
        sprite: "player_left",
        x: Q.width/2 - 25,
        y: Q.height -25,
        type: Q.SPRITE_UI
      });

      this.add("animation");
    }
  })

  Q.Sprite.extend("PlayerBack" , {
    init: function(p){
      this._super(p,{
        sheet: "player_back",
        sprite: "player_back",
        x: Q.width - 60,
        y: Q.height - 20,
        type: Q.SPRITE_UI,
        opacity:1,
        scale:1
      });

      this.add("tween");
      this.on("touch");
    },
    touch: function(){
      button_click(this);
    }

  })

  // 
  // 人
  Q.Sprite.extend("PlayerManBg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'player/player_man_bg.png',
        type: Q.SPRITE_UI,
      });

      this.add("tween");
    }
  });

  Q.Sprite.extend("PlayerManRotate" , {
    init: function(p){
      this._super(p,{
        sheet: "player_man_rotate",
        sprite: "player_man_rotate",
        x: Q.width/2 + 10,
        y: Q.height - 160 ,
      });

      this.add("animation");
      this.on("rotate");
    },

    rotate: function(){
      Q.play("player_ha.mp3");
      this.play("rotate");
    }
  })

  Q.Sprite.extend("PlayerManMan" , {
    init: function(p){
      this._super(p,{
        sheet: "player_man_man",
        sprite: "player_man_man",
        x: Q.width/2 ,
        y: Q.height/2 - 10
      });
      this.add("animation");
      this.play("default");
      this.on("startRotate");
    },

    startRotate: function(){
      Q("PlayerManRotate").trigger("rotate");
    }
  })

  // 四步殺蚊
  Q.Sprite.extend("PlayerManText1" , {
    init: function(p){
      this._super(p,{
        asset: "player/player_man_text1.png",
        x: Q.width/2 - 140,
        y: Q.height/2 - 70,
        type: Q.SPRITE_UI,
        scale: 4,
        opacity: 1
      });

      Q.play("kick.mp3");
      // 因為在setTimeout裡，function 的 this 為 window，所以在這裡先記錄
      text1 = this ;

      this.add("tween");
      this.animate({ scale: 1 },0.2, Q.Easing.Quadratic.InOut , {
        callback: function(){
          window.setTimeout(function(){
            text1.stage.insert(new Q.PlayerManText2());
          } , 300)

          this.animate({opacity: 0} , 0.4 , Q.Linear , {
            delay: 0.6,
            callback: function(){
              this.destroy();
            }
          })
        }
      });
    }
  })

  Q.Sprite.extend("PlayerManText2" , {
    init: function(p){
      this._super(p,{
        asset: "player/player_man_text2.png",
        x: Q.width/2 + 150,
        y: Q.height/2 - 40,
        type: Q.SPRITE_UI,
        scale: 4,
        opacity: 1
      });

      Q.play("kick.mp3");
      text2 = this ;

      this.add("tween");
      this.animate({ scale: 1 },0.2, Q.Easing.Quadratic.InOut , {
        callback: function(){
          window.setTimeout(function(){
            text2.stage.insert(new Q.PlayerManText3());
          } , 300)

          this.animate({opacity: 0} , 0.4 , Q.Linear , {
            delay: 0.6,
            callback: function(){
              this.destroy();
            }
          })
        }
      });
    }
  })

  Q.Sprite.extend("PlayerManText3" , {
    init: function(p){
      this._super(p,{
        asset: "player/player_man_text3.png",
        x: Q.width/2 - 120,
        y: Q.height/2 + 10,
        type: Q.SPRITE_UI,
        scale: 4,
        opacity: 1
      });

      Q.play("kick.mp3");
      text3 = this ;

      this.add("tween");
      this.animate({ scale: 1 },0.2, Q.Easing.Quadratic.InOut , {
        callback: function(){
          window.setTimeout(function(){
            text3.stage.insert(new Q.PlayerManText4());
          } , 300);

          this.animate({opacity: 0} , 0.4 , Q.Linear , {
            delay: 0.6,
            callback: function(){
              this.destroy();
            }
          })
        }
      });
    }
  })

  Q.Sprite.extend("PlayerManText4" , {
    init: function(p){
      this._super(p,{
        asset: "player/player_man_text4.png",
        x: Q.width/2 + 100,
        y: Q.height/2 + 70,
        type: Q.SPRITE_UI,
        scale: 4,
        opacity: 1
      });

      Q.play("kick.mp3");
      this.add("tween");
      this.animate({ scale: 1 },0.2, Q.Easing.Quadratic.InOut , {
        callback: function(){
          // window.setTimeout(function(){
          //   Q.play("player_ha.mp3");
          // } , 300)

          this.animate({opacity: 0} , 0.4 , Q.Linear , {
            delay: 0.6,
            callback: function(){
              this.destroy();
            }
          })
        }
      });
    }
  })

  // 蚊子王
  Q.Sprite.extend("PlayerMoskingBg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'player/player_mosking_bg.png',
        type: Q.SPRITE_UI,
      });

      this.add("tween");
    }
  });

  Q.Sprite.extend("PlayerMoskingRotate",{
    init: function(p) {
      this._super(p,{
        sheet: "player_mos_rotate",
        sprite: "player_mos_rotate",
        x: Q.width/2,
        y: Q.height - 160 ,
      });

      this.add("animation");
      this.play("rotate");
    }
  });

  Q.Sprite.extend("PlayerMosking" , {
    init: function(p){
      this._super(p,{
        sheet: "mosking",
        sprite: "mosking",
        x: Q.width/2 ,
        y: Q.height/2 - 10
      });

      this.add("tween");
      this.fly_up();
    },

    fly_up: function(){
      this.animate({y: Q.height/2 - 15} ,0.7 , Q.Easing.Quadratic.InOut , {
        callback: function(){ this.fly_down();}
      }) ;
    },

    fly_down: function(){
      this.animate({y: Q.height/2 - 8} ,0.5 , Q.Easing.Linear , {
        callback: function(){ this.fly_up();}
      }) ;
    }
  })

  // 將軍蚊
  Q.Sprite.extend("PlayerMosGBg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'player/player_mosG_bg.png'
      });
    }
  });

  Q.Sprite.extend("PlayerMosG" , {
    init: function(p){
      this._super(p,{
        x: Q.width/2 ,
        y: Q.height/2 - 10,
        asset: 'player/player_mos.png',
        type: Q.SPRITE_UI
      })

      this.add("tween");
      this.fly_up();
    },

    fly_up: function(){
      this.animate({y: Q.height/2 - 18} ,0.5 , Q.Easing.Quadratic.InOut , {
        callback: function(){ this.fly_down();}
      }) ;
    },

    fly_down: function(){
      this.animate({y: Q.height/2 - 5} ,0.5 , Q.Easing.Quadratic.InOut , {
        callback: function(){ this.fly_up();}
      }) ;
    }
  })

  // 蚊子
  Q.Sprite.extend("PlayerMosBg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'player/player_mos_bg.png'
      });
    }
  });

  Q.Sprite.extend("PlayerMos" , {
    init: function(p){
      this._super(p,{
        x: Q.width/2 ,
        y: Q.height/2 - 10,
        asset: 'player/player_mos.png',
        type: Q.SPRITE_UI
      })

      this.add("tween");
      this.fly_up();
    },

    fly_up: function(){
      this.animate({y: Q.height/2 - 18} ,0.5 , Q.Easing.Quadratic.InOut , {
        callback: function(){ this.fly_down();}
      }) ;
    },

    fly_down: function(){
      this.animate({y: Q.height/2 - 5} ,0.5 , Q.Easing.Quadratic.InOut , {
        callback: function(){ this.fly_up();}
      }) ;
    }
  })

  // 
  // GameDescription
  Q.Sprite.extend("GameDescription_bg",{
    init: function(p){
      this._super(p,{
        x: Q.width/2 ,
        y: Q.height/2 ,
        opacity:0 ,
        scale:0.1,
        asset: 'landing/game_description_bg.png'
      })

      this.add('tween');
      this.animate({scale:1 , opacity:1},0.3 , Q.Easing.Quadratic.InOut)
    }
  })
}