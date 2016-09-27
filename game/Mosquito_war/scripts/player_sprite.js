/*
1. 查一下怎麼讓人變成 [Ａ] [Ｄ] 動
*/

// 計算救兵 蚊子出來次數
var mos_addCount = 0 ;
var k_attack_5 = [];

;Quintus.PlayerSprites = function(Q){
	Q.gravityY = 0;
  Q.gravityX = 0;

	// 紀錄被 power 打到的上一個
	var lastCollide = null;
	var moveSpeed = 3;
	var twinkle_count = 10 ;

	// 載入玩家
	Q.Sprite.extend("Player",{
		init: function(p){
			this._super(p,{
				sheet: 'player' ,
				sprite: 'player',
				type: Q.SPRITE_ENEMY ,
				opacity: 1 ,
				x: Q.width/2,
				y: 470
			}) ;

			Q.state.set("player_h" , this.p.h) ;
			this.add("tween");
			this.on("player_speedUp");
			this.on("player_invincible");
			this.on("player_recover");
		},

		step: function(dt){
			// 控制人物
			var player_w = this.p.w/2 ;
			if (Q.inputs['A']){
				this.p.x -= moveSpeed ;

				if ( this.p.x < player_w)
					this.p.x = player_w ;
			}else if (Q.inputs['D']){
				this.p.x += moveSpeed ;

				if ( this.p.x > (Q.width - player_w))
					this.p.x = (Q.width - player_w) ;
			}

			if(Q("Enemy").length < 3 ){
				if(mos_addCount > 0){
					this.stage.insert(new Q.MosquitoTracker({
	    			data: Q.asset("addMos_s") ,
	    			y: 20,
	    			scale:0.1,
	    			opacity:1
	    		}));

					mos_addCount-- ;
				} 

				if(mos_addCount == 0 && Q("Enemy").length == 0){
					this.stage.insert(new Q.MosKing()); // 加入魔王
					k_attack_5.push(
						this.stage.insert(new Q.MosquitoTracker({
	    				data: Q.asset("addKingattack_s_1") ,
	    				y: 250,
	    				scale:1,
	    				opacity:1
	    			}))
	    		);

					// 使mos_addCount = -1 不繼續動
	    		mos_addCount-- ;

	    		// Play video_mosking_appear
	    		playVideo(video_mosking_appear);
				}	
			}
		},

		player_speedUp: function(){
			var player_x = this.p.x ;
      var player_y = this.p.y ;

      moveSpeed = 9;

      this.stage.insert(new Q.PlayerSpeedUP({
      	x: player_x,
      	y: player_y + 40
      }))
		},

		player_invincible: function(){
			var player_x = this.p.x ;
      var player_y = this.p.y ;

      this.stage.insert(new Q.PlayerInvincible({
      	x: player_x ,
      	y: player_y + 15
      }))
		},

		player_recover : function(){
			moveSpeed = 3;
			Q("PlayerSpeedUP").trigger("hidden_destroy");
		}

	})

	Q.Sprite.extend("PlayerSpeedUP",{
		init: function(p){
			this._super(p,{
				sheet: "player_speedup",
				sprite: "player_speedup",
				scale: 0.1,
				opacity: 0.1
			})

			this.add("animation,tween");
			this.animate({scale: 1 , opacity: 1} , 0.2 , Q.Easing.Linear);
			this.play("default");

			this.on("hidden_destroy");
		},
		step: function(){
			this.p.x = Q.select('Player').items[0].p.x ;
		},
		hidden_destroy: function(){
			this.animate({opacity: 0} , 1 , Q.Easing.Linear , {
				callback: function(){ this.destroy()}
			});
		}
	})

	Q.Sprite.extend("PlayerInvincible" , {
		init: function(p){
			this._super(p,{
				sheet: "player_invincible",
				sprite: "player_invincible",
				opacity: 0 ,
				type: Q.SPRITE_ENEMY ,
			})

			this.add("tween");
			this.on("twinkle_show");
			this.on("twinkle_hidden");
			this.on("hidden_destroy");

			this.animate({opacity: 1} , 0.3 , Q.Easing.Linear);
		},
		step: function(){
			this.p.x = Q.select('Player').items[0].p.x ;
		},
		hidden_destroy: function(){
			twinkle_count = 20 ;
			this.twinkle_hidden();
		},
		twinkle_hidden: function(){
			twinkle_count-- ;
			this.animate({opacity:0},0.1,Q.Easing.Linear,{
				callback: function(){ this.twinkle_show();}
			})
		},
		twinkle_show: function(){
			if(twinkle_count > 0){
				this.animate({opacity:1},0.1,Q.Easing.Linear,{
					callback: function(){ this.twinkle_hidden();}
				})
			}else{
				this.destroy();
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
    	if( col.obj.isA("Enemy") || col.obj.isA("MosAttack") || col.obj.isA("MosKing") || col.obj.isA("MosKingAttack")) {
        Q.play("brickDeath.ogg");
        
        // 消掉蚊子 or 針
        this.destroy();
        col.obj.trigger("destroy");
      }
    },

   	power_up: function(){
			Q.state.set("power_up",1);
		},

		power_recover: function(){
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
			this.animate({opacity:0} , 0.3 , Q.Easing.Linear , {
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
			this.animate({opacity:0} , 0.5 , Q.Easing.Linear , {
				callback: function(){
					this.destroy();
				}
			});
		}
	})

}