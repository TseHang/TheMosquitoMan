Quintus.ActionPlatformerEnemy = function(Q){
	
	Q.component("commonEnemy" , {
		added: function(){
			var entity = this.entity ;
			entity.on("bump.left, bump.right, bump.bottom", function(collision){
				
				// 如果是玩家撞到的話才有效
				if(collision.obj.isA("Player")){
					collision.obj.damage() ;
				}
			})

			// 如果踩到怪獸的頂部
			entity.on("bump.top", function(collision){
				
				// 如果是玩家撞到的話才有效
				if(collision.obj.isA("Player")){
					
					// make the player jump
					collision.obj.p.vy = -200 ;
					
					// play sound 
					Q.audio.play("kill-enemy.mp3");

					// kill enemy
					this.destroy();
				}
			})
		}
	})

	// 要從 Sprite 繼承 player
	Q.Sprite.extend("GroundEnemy" , {
		init: function(p){
			this._super(p, {
				vx: -50 , 
				defaultDirection: "left" ,
				sheet: "blue-alien"
			});

			this.add("2d, aiBounce, commonEnemy");
		},
		step: function(dt){
			// 每一瞬間所走的距離
			var dirx = this.p.vx / Math.abs(this.p.vx);

			// check where on the ground or not
			// p.y + p.h 是指物體y位置(中心）＋自身高度/2 + 1 => 變地板位置
			var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1 , Q.SPRITE_DEFAULT) ;
			var nextElement = Q.stage().locate(this.p.x + dirx* this.p.w/2 + dirx , this.p.y + this.p.h/2 + 1 , Q.SPRITE_DEFAULT) ;
			var nextTile;

			if ( nextElement instanceof Q.TileLayer){
				nextTile = true ;
			}

			// if we are on ground and there is a cliff
      if(!nextTile && ground) {
        if(this.p.vx > 0) {
          if(this.p.defaultDirection == "right") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        else {
          if(this.p.defaultDirection == "left") {
            this.p.flip = "x";
          }
          else {
            this.p.flip = false;
          }
        }
        this.p.vx = -this.p.vx;
      }
		}
	})
}


