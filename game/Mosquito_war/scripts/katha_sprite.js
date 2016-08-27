/**
到底要人吃到就好，還是砲也可以打到？
**/
;Quintus.KathaSprites = function(Q){
	Q.gravityY = 0;
  Q.gravityX = 0;

  // 
	// 掉卷軸
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

			// 偵測人的高度，判斷他啥時要消失
			// player_h = Q.state.get("player_h");
		},

		step: function(dt) {
      this.p.y += this.p.vy * dt;
      this.stage.collide(this);

			// if(this.p.y > (Q.height - player_h +20))
			// 	this.destroy();
    },

		collide: function(col) {
      
      // 應該要吃到才對
    	if(col.obj.isA("Power") || col.obj.isA("Player")) {
      	this.destroy();

      	// 暫停
      	this.stage.pause();
      	
      	// 更改 state.set
      	Q.state.set("katha" , 1) ;
      	Q.stageScene("katha");

      	// 啟動Katha_1
      	Q("Power").trigger("power_up");
      }
    },

    destroyed: function(){
    	this.destroy();
    }
	})


}