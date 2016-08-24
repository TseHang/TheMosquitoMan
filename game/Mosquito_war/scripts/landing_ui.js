;Quintus.LandingUI = function(Q) {

	Q.Sprite.extend("Logo" , {
		init: function(p){
			this._super({
				x: Q.width/2 ,
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
        asset: 'landing_bg_long.png',
        opacity: 1 ,
        type: 0
      });

      this.add("tween");
    }
  });

  Q.Sprite.extend("Landing_play", {
    init: function(p){
      this._super(p,{
        asset: 'landing_play.png' ,
        x: Q.width/2 ,
        y: 300,
        opacity: 1 ,
        type: Q.SPRITE_UI
      });

      this.add("tween");
    }
  });

  Q.Sprite.extend("Landing_story", {
    init: function(p){
      this._super(p,{
        asset: 'landing_story.png' ,
        x: Q.width/2 ,
        y: 360,
        opacity: 1 ,
        type: Q.SPRITE_UI
      });

      this.add("tween");
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
        asset: 'intro_bg.png',
        opacity: 1,
        type: Q.SPRITE_UI
      });

      this.add("tween");
    }
  });

  Q.Sprite.extend("IntroMan",{
    init: function(p) {
      this._super(p,{
        x: 67,
        y: Q.height - 140,
        asset: 'intro_man.png',
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
        x: 295  ,
        y: 390 ,
        weight: "normal" ,
        color: "white",
        size: 17,
        opacity: 0
      });

      this.add("tween");
      this.animate({opacity:1} , 0.5 , Q.Easing.Linear);
    }
  });

  Q.Sprite.extend("IntroTextClick",{
    init: function(p) {
      this._super(p,{
        x: 330,
        y: Q.height - 75,
        asset: 'intro_text.png',
        opacity: 0
      });

      this.add("tween");
      this.animate({opacity:1} , 0.5 , Q.Easing.Quadratic.InOut);
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
      });
    }
  })

  Q.Sprite.extend("PlayerManBg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'player_man_bg.png',
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

  Q.Sprite.extend("PlayerMoskingBg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'player_mosking_bg.png',
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

  Q.Sprite.extend("PlayerMosBg",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'player_mos_bg.png'
      });
    }
  });

  Q.Sprite.extend("PlayerMos" , {
    init: function(p){
      this._super(p,{
        x: Q.width/2 ,
        y: Q.height/2 - 10,
        asset: 'player_mos.png',
        type: Q.SPRITE_UI
      })

      this.add("tween");
      this.fly_up()
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
}