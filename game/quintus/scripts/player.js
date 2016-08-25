Quintus.ActionPlatformerPlayer = function(Q){
	
	// 要從 Sprite 繼承 player
	Q.Sprite.extend("Player", {

		init: function(p){

			// super 就是爸爸--> Sprite
			this._super(p , {
				sheet: "player" ,
				jumpSpeed: -300 ,
				speed: 100,
			})

			this.add("2d, platformerControls");

			var that = this ;
			this.on("jump", function(){
				if (!that.p.isJumping && that.p.vy < 0){
					that.p.isJumping = true ;
					Q.audio.play("jump.mp3");
				}
			})

			this.on("bump.bottom", function(){
				that.p.isJumping = false ;
			})
		},
		damage: function(){

			// 重來
			Q.stageScene("level");
		}
	})
};