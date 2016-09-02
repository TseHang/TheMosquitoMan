/*
1. 查一下怎麼讓人變成 [Ａ] [Ｄ] 動
*/
;Quintus.PlayerSprites = function(Q){
	Q.gravityY = 0;
  Q.gravityX = 0;

  // 計算蚊子出來次數
	var addCount = 0 ;

	// 載入玩家
	Q.Sprite.extend("Player",{
		init: function(p){
			this._super(p,{
				sheet: 'player' ,
				sprite: 'player',
				type: Q.SPRITE_ENEMY ,
				x: Q.width/2,
				y: 450
			}) ;

			Q.state.set("player_h" , this.p.h) ;
		},

		step: function(dt){
			// 控制人物
			var player_w = this.p.w/2 ;
			if (Q.inputs['A']){
				this.p.x -= 5 ;

				if ( this.p.x < player_w)
					this.p.x = player_w ;
			}else if (Q.inputs['D']){
				this.p.x += 5 ;

				if ( this.p.x > (Q.width - player_w))
					this.p.x = (Q.width - player_w) ;
			}

			if(Q("Enemy").length < 3 ){
				if(addCount > 0){
					this.stage.insert(new Q.MosquitoTracker({
	    			data: Q.asset("addMos_s") ,
	    			y: 40,
	    			scale:1
	    		}));

					addCount-- ;
				} 

				if(addCount == 0 && Q("Enemy").length == 0){
					this.stage.insert(new Q.MosKing());
					this.stage.insert(new Q.MosquitoTracker({
	    			data: Q.asset("addKingattack_s") ,
	    			y: 250,
	    			scale:1
	    		}));

					// 使addCount = -1 不繼續動
	    		addCount-- ;
				}	
			}
		}
	})

	Q.Sprite.extend("Power" , {
		init: function(p){
			
			// x , y 在發射出去的時候依照人物位置決定
			this._super(p,{
				sprite: "power",
				collisionMask: Q.SPRITE_DEFAULT ,
				angle:0

			}) ;

			// Wait til we are inserted, then listen for events on the stage
			this.on("hit" , this , "collide");

			this.on("power_up");
			this.on("power_recover");
		},

		step: function(dt) {
			this.p.x += this.p.vx * dt;
      this.p.y += this.p.vy * dt;
    	this.stage.collide(this);
    },

    collide: function(col) {
    	if(col.obj.isA("Enemy") || col.obj.isA("MosAttack") || col.obj.isA("MosKing") || col.obj.isA("MosKingAttack")) {
        Q.play("brickDeath.ogg");
        
        // 消掉蚊子 or 針
        col.obj.destroyed();
        this.destroy();
      }
    },

   	power_up: function(){
   		console.log("power_up");
			Q.state.set("power_up",1);
		},

		power_recover: function(){
			console.log("power_recover");
			Q.state.set("power_up",0);
		}
	});

	Q.Sprite.extend("PrePower" , {
		init: function(p){

			this._super(p , {
				sheet: "pre_power",
				sprite: "pre_power",
				opacity:1
			})

			this.add("animation,tween");
			this.play("shoot");
			this.animate({opacity:0} , 0.3 , Q.Linear , {
				callback: function(){
					this.destroy();
				}
			});
		}
	})

	Q.Sprite.extend("PrePowerUp" , {
		init: function(p){

			this._super(p , {
				sheet: "pre_power_up",
				sprite: "pre_power_up",
				y: 370,
				opacity:1
			})

			this.add("animation,tween");
			this.play("shoot");
			this.animate({opacity:0} , 0.5 , Q.Linear , {
				callback: function(){
					this.destroy();
				}
			});
		}
	})

}