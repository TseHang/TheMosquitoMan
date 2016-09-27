/**
到底要人吃到就好，還是砲也可以打到？
**/
;Quintus.KathaSprites = function(Q){
	Q.gravityY = 0;
  Q.gravityX = 0;

  // drop Katha_1 一手遮蚊
	Q.Sprite.extend("Katha_1" , {
		init: function(p){
			this._super(p,{
				sheet: 'katha_1' ,
				sprite: "katha_1" ,
				collisionMask: Q.SPRITE_ENEMY ,
				vy: 50 
			})

			this.add("2d");
			this.on("hit" , this ,"collide");
      this.on("destroy");
		},

		step: function(dt) {
      this.p.y += this.p.vy * dt;
      this.stage.collide(this);

			if(this.p.y > Q.height)
				this.destroy();
    },

		collide: function(col) {
      
      // 應該要吃到才對
    	if(col.obj.isA("Power") || col.obj.isA("Player") || col.obj.isA("PlayerInvincible")) {
      	this.destroy();

      	// 暫停
      	this.stage.pause();
      	
      	// 更改 state.set
      	Q.state.set("katha" , 1) ;
      	Q.stageScene("katha");

      	// 啟動Katha_1
      	Q("Power").trigger("power_up");
      }
    }
	})

  // drop Katha_2 縮蚊成寸
  Q.Sprite.extend("Katha_2" , {
    init: function(p){
      this._super(p,{
        sheet: 'katha_2' ,
        sprite: "katha_2" ,
        collisionMask: Q.SPRITE_ENEMY ,
        vy: 50 
      })

      this.add("2d");
      this.on("hit" , this ,"collide");
      this.on("destroy");
    },

    step: function(dt) {
      this.p.y += this.p.vy * dt;
      this.stage.collide(this);

      if(this.p.y > Q.height)
        this.destroy();
    },

    collide: function(col) {
      
      // 應該要吃到才對
      if(col.obj.isA("Power") || col.obj.isA("Player") || col.obj.isA("PlayerInvincible")) {
        this.destroy();

        // 暫停
        this.stage.pause();
        
        // 更改 state.set
        Q.state.set("katha" , 2) ;
        Q.stageScene("katha");

        // 啟動Katha_2
        Q("Player").trigger("player_speedUp");
      }
    }
  })

  // drop Katha_3 防蚊神體
  Q.Sprite.extend("Katha_3" , {
    init: function(p){
      this._super(p,{
        sheet: 'katha_3' ,
        sprite: "katha_3" ,
        collisionMask: Q.SPRITE_ENEMY ,
        vy: 50 
      })

      this.add("2d");
      this.on("hit" , this ,"collide");
      this.on("destroy");
    },

    step: function(dt) {
      this.p.y += this.p.vy * dt;
      this.stage.collide(this);

      if(this.p.y > Q.height)
        this.destroy();
    },

    collide: function(col) {
      
      // 應該要吃到才對
      if(col.obj.isA("Power") || col.obj.isA("Player") || col.obj.isA("PlayerInvincible")) {
        this.destroy();

        // 暫停
        this.stage.pause();
        
        // 更改 state.set
        Q.state.set("katha" , 3) ;
        Q.stageScene("katha");

        // 啟動Katha_3
        Q("Player").trigger("player_invincible");
      }
    }
  })


}