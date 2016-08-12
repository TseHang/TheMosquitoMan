;Quintus.BreakoutUI = function(Q) {

	Q.Sprite.extend("Logo" , {
		init: function(p){
			this._super({
				x: Q.width/2 ,
				y: 150 ,
				asset: "logo.png"
			})
		}
	});

  Q.Sprite.extend("Background",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'bg_prerendered.png',
        // asset: 'bg2.png',
        type: 0
      });
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
}