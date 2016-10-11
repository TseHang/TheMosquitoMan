/*
Drop katha rate:
(1) level: 1/20
(2) mosking: 1/10

Drop mosAttack:
(1) mosAttack: 1/6
(2) mosking的Attack: 1/5
*/

;Quintus.EnemySprites = function(Q){
	Q.gravityY = 0;
  Q.gravityX = 0;

  var attackTimeInterval = 900 ;

	Q.Sprite.extend("Mos_magic_circle",{
		init: function(p){
			this._super(p,{
				x:Q.width/2 ,
				y: Q.height/2 - 100,
				asset:"level/mos_magic_circle.png",
				scale:0.1,
				opacity:0.1
			})
			this.add("tween");
		}
	})

	// Call Mosquito
	// Don't want to animate "opacity",cuz u will call "Enemy",that it has its "opacity"
	Q.Sprite.extend("MosquitoTracker" , {
		init: function(p){
			this._super(p,{
				x: Q.width/2 ,
				y: 70,
				scale: 1,
				direct: "up"
			})

			this.add("tween");
			this.move();
			// 被insert 的時候 call 它
			this.on("inserted",this,"setupBlocks");
		},

    setupBlocks: function() {
      Q._each(this.p.data,function(row,y) {
        Q._each(row,function(mosType,x) {
          if(mosType && mosType < 5) { 
            // Add onto the stage, with this as the container
            this.stage.insert(new Q.Enemy({
              mosType: mosType,
              x: 80 * x - (row.length / 2 - 0.5) * 80,
              y: 50 * y
            }), this);

          } else if (mosType >= 5){
          	// Add onto the stage, MosKingAttack
            this.stage.insert(new Q.MosKingAttack({
              mosType: mosType,
              x: 40 * x - (row.length / 2 - 0.5) * 40,
              y: 40 * y
            }), this);
          }
        },this);
      },this);
    },

    move: function(){
    	if(this.p.direct =="up")
    		this.animate({y:this.p.y - 30 , },0.6, Q.Easing.Quadratic.InOut,{ delay:0.3 , callback: function(){
    			Q('Enemy').trigger("call");
    		}});
    	else if(this.p.direct == "down")
    		this.animate({y:this.p.y + 30 },0.6, Q.Easing.Quadratic.InOut,{ delay:0.3 , callback: function(){
    			Q('MosKingAttack').trigger("call");
    		}});
    }
	});

	// 把 timer 變成 attackTimer
	Q.Sprite.extend("Enemy" , {
		init: function(p){
			this._super(p ,{
				sheet: "mos" + p.mosType,
				sprite: "enemy",
				collisionMask: Q.SPRITE_ENEMY ,
				mosId: GAME.ENEMY.mosId,
				opacity: 0.1,
				life: p.mosType,
				count: 0
			});
			this.add("tween");
			this.on("attacked,call"); 
			this.on("hit" , this ,"collide");
			this.animate({opacity:1},0.6,Q.Easing.Quadratic.InOut);

			GAME.ENEMY.mosId++

			var obj = this ; // 掉針

			GAME.ENEMY.attackTimer.push( setInterval(function(){
				if(Q.state.get("is_video_over") && Q.state.get("is_countdown_over")){
					
					var rand = Math.round(Math.random()* GAME.ENEMY.RATE_mosAttack); // Rate: 1/6
					var player_x =  Q.select('Player').items[0].p.x ;
	      	var player_y =  Q.select('Player').items[0].p.y ;
	      	var vx = player_x - obj.c.x ;
	      	var vy = player_y - obj.c.y ;

	      	var angle = Math.atan2( vy , vx)/Math.PI*180

					// 要判定場中有沒有出現相同的，因為原倍速太快，所以用比例調整速度
					// if(rand == 1 && Q("MosAttack").length < 20
					if(rand == 1){
						obj.stage.insert(new Q.MosAttack({
							x: obj.c.x ,
							y: obj.c.y ,
							vx: (vx>0)? 15 : (-15),
							vy: ((vx>0)? 15: (-15))*vy/vx,
							angle: angle - 90
						}));
					}
				}
			} , attackTimeInterval) );

		},

		call: function(){
	    this.c.y -= 30;
		},

		attacked: function(){
			this.p.life = this.p.life - 1 ;

			if (this.p.life <= 0){
				Q.audio.play('damage.mp3');

				var sheet = this.p.sheet ;
				switch(sheet){
					case "mos1":
						this.p.sheet = "enemy_death";
						break ;
					case "mos2":
						this.p.sheet = "mos2_death" ;
						break ;
					case "mos4":
						this.p.sheet = "mos4_death";
						break ;
					default :
						this.p.sheet = "enemy_death";
				};

				// CLEAR TIMER
				clearInterval( GAME.ENEMY.attackTimer[this.p.mosId] );
				dropKatha(this.stage,this,20);

				// 死掉，destroy
				this.animate({y: this.p.y + 15 , opacity: 0} , 0.15 , Q.Easing.Linear , {
					callback: function(){ this.destroy(); }
				});
			}
		},

		step: function(dt) {
			this.stage.collide(this);

			if(Q.state.get("is_countdown_over")){
	      this.p.count++ ; // use counter and that mos walk
	      if(this.p.count % GAME.ENEMY.mosSpeed == 0){
	      	this.p.y += 20;
	      	this.c.y += 20;
	      	this.p.count = 0;
	      }
			}

			if(this.p.y > Q.height)
				this.destroy();
    },

    collide: function(col) {

    	if(col.obj.isA("Player")) {
    		if(!Q.state.get("isPlayerAttack")){
      		Q("Player").trigger("hurt");
        	Q.state.dec("lives" , 1) ;
    		}
    		this.destroy(); 
    		clearInterval( GAME.ENEMY.attackTimer[this.p.mosId] );
      }
    }
	});

	Q.Sprite.extend("Mosking_talk", {
		init: function(p){
			this._super(p,{
				x: Q.width + 200 ,
				y: 100,
				sheet: "mosking_talk"
			})
			this.add("tween");
			this.animate({x: Q.width/2 + 180},0.3,Q.Easing.Quadratic.InOut,{
				delay:0.3
			})
		}
	})

	Q.Sprite.extend("Mosking_talk_frame",{
		init: function(p){
			this._super(p,{
				x:Q.width/2 - 90,
				y:90,
				sheet:"mosking_talk_frame",
				scale:0.1,
				angle:0,
				opacity:0
			})
			this.add("tween");
			this.animate({opacity:1 , angle:720,scale:1},0.3,Q.Easing.Quadratic.InOut,{
				delay:0.4
			});
		}
	})

	Q.Sprite.extend("Mosking_talk_text_2",{
		init: function(p){
			this._super(p,{
				x: Q.width/2 - 100,
				y: 90,
				asset:"level/mosking_talk_2.png",
				opacity:0
			})
			this.add("tween");
		}
	})

	Q.Sprite.extend("Mosking_talk_text_3",{
		init: function(p){
			this._super(p,{
				x: Q.width/2 - 100,
				y: 90,
				asset:"level/mosking_talk_3.png",
				opacity:0
			})
			this.add("tween");
		}
	})

	Q.Sprite.extend("MosAttack" , {
		init: function(p){
			this._super(p,{
				sheet: 'mosattack' ,
				sprite: "mosattack",
				collisionMask: Q.SPRITE_ENEMY 
			})

			this.add("2d");
			this.on("hit" , this ,"collide");
			this.on("destroy,disappear"); // will just call destroy()
		},

		step: function(dt) {
      this.p.x += this.p.vx * dt ;
      this.p.y += this.p.vy * dt ;
      this.stage.collide(this);

      /* 
      [OCCUR]:
      	1. 超出版面
      	2. 蚊子全滅（進入mosEnter）
      	3. 蚊子王掛掉
      */
			if(this.p.y > Q.height)
				this.destroy();
    },

    disappear: function(){
    	this.destroy();
    },

		collide: function(col) {

    	if(col.obj.isA("Player")) {
    		if(!Q.state.get("isPlayerAttack")){
      		Q("Player").trigger("hurt");
        	Q.state.dec("lives" , 1) ;
    		}
    		this.destroy(); 
      }else if (col.obj.isA("PlayerInvincible")){
      	Q.audio.play("player_invincible_attack.mp3");
      	this.destroy(); // When bump into Invincible Mask , destroy()
      }
    }
	})

	// 載入大蚊子
	Q.Sprite.extend("MosKing",{
		init: function(p){
			this._super(p,{
				sheet: 'mosking_anim' ,
				sprite: 'mosking_anim',
				collisionMask: Q.SPRITE_ENEMY ,
				x: Q.width/2,
				y: 110,
				scale: 0.1,
				opacity:1 ,
				life: Q.state.get("mosking_life")
			}) ;
			
			var obj = this ;

			this.on("destroy"); // will just call destroy()
			this.add("tween,animation") ;
			this.animate({scale:1}, 0.4 , Q.Easing.Quadratic.InOut);

			this.fly_up();
			this.play("default");

			window.setTimeout(function(){ obj.walk("right") ;} , 10000);
			console.log("mosking_life: " + this.p.life);
		},

		walk: function(test){
			var obj = this ;
			var mosking_w = this.p.w/2 ;
			if (test == "right"){
				window.setTimeout(function(){ obj.walk("left") ;} , 6000);
				this.animate({x:(Q.width - mosking_w)}, 0.6 , Q.Easing.Quadratic.InOut );
			}
			else if(test == "left"){
				window.setTimeout(function(){ obj.walk("right") ;}, 6000);
				this.animate({x:mosking_w} , 0.6 , Q.Easing.Quadratic.InOut );
			}
		},

		// 就是指蚊子王被打到後的動作
		destroyed: function(){
			var mosking_x = this.p.x ;
      var mosking_y = this.p.y ;

			if(this.p.life <= 0){
				// Scene: winner
				this.stage.trigger("complete");

				Q.audio.play('mosking_die_roar.mp3');

				Q('Player').trigger("destroy");
				Q('MosAttack').trigger("disappear");
				// Q('MosKingAttack').trigger("winLose");

				resetAttackTimer();	
			}

			Q.audio.play('mosking_hurt.mp3');

			this.stage.insert(new Q.MosKing_die({
				x:mosking_x ,
				y:mosking_y
			}));

			this.animate({opacity:0} , 0.1 , Q.Easing.Linear);
			this.destroy() ;
		},

		fly_up: function(){
      this.animate({y: 100 } ,1 , Q.Easing.Quadratic.InOut , {
        callback: function(){ this.fly_down();}
      }) ;
    },

    fly_down: function(){
      this.animate({y: 115 } ,0.5 , Q.Easing.Quadratic.InOut , {
        callback: function(){ this.fly_up();}
      }) ;
    }
	})

	// 被打到後的蚊子王
	Q.Sprite.extend("MosKing_die",{
		init: function(p){

			var life ;
			var recoverY ;

			this._super(p,{
				sheet: 'mosking_die' ,
				sprite: 'mosking_die',
				collisionMask: Q.SPRITE_ENEMY ,
				opacity:1 
			}) ;

			this.add("tween") ;
			this.opacity_0();
			Q.state.dec("mosking_life" , 1);

			life = Q.state.get("mosking_life");
			recoverY = this.p.y ; // record the location , that the mosking_die didn't drop

			if(life < 0){
				this.animate({y:this.p.y + 200} , 2 , Q.Easing.Linear , {
					callback: function(){ this.destroy(); }
				})
			}
			else{
				/*
					When mosking_die drop 0.8sec , then recover Mosking.
					But , its 'mosking_life' decs 1.
				*/
				this.animate({y:this.p.y + 15} , 0.8 , Q.Easing.Linear , {
					callback: function(){
						var sheet = (life >= 4)? "mosking_anim":"mosking_hurt";

						if(life === 3){
							playBGM(bgm_heartbeat_slow,1,false);
						}

						this.stage.insert(new Q.MosKing({
							x: this.p.x,
							y: recoverY, //recover to not drop's "y"
							sheet:sheet,
							scale: 1
						}));

						if(life %2 === 0 ){
							var random = Math.round(Math.random()*2 + 1);

							Q.audio.play("mosking_scream.mp3");
							Q('MosKingAttack').trigger('move');
							mosBloodEnter(this.stage,random,220);
						}

						this.destroy();
					}
				});	
			}
		},

		opacity_0: function(){
			this.animate({opacity:0} , 0.1 , Q.Easing.Quadratic.InOut , {
				callback: function(){ this.opacity_1(); }
			})
		},

		opacity_1: function(){
			this.animate({opacity:1} , 0.1 , Q.Easing.Linear , {
				callback: function(){ this.opacity_0(); }
			})
		}
	})

	Q.Sprite.extend("MosKingAttack" , {
		init: function(p){
			this._super(p , {
				sheet: 'moskingattack_'+ p.mosType,
				sprite: 'moskingattack' ,
				k_attackId: GAME.ENEMY.k_attackId ,
				live: 5 ,
				opacity:0
			})
			this.add("tween,animation");
			this.animate({opacity:1},0.6,Q.Easing.Quadratic.InOut);
			this.on("hit" , this ,"collide");
			this.on("disappear , attacked , call , move");

			// Push this run's ID , then compare in 'call' fun.
			GAME.ENEMY.k_attack_5.push(this.p.k_attackId);
			GAME.ENEMY.k_attackId++ ;

			// 掉針！！
			var k_obj = this ;

			GAME.ENEMY.k_attackTimer.push( setInterval(function(){
				if(Q.state.get("is_video_over") && Q.state.get("is_countdown_over")){

					var random = Math.round(Math.random() * GAME.ENEMY.RATE_moskingAttack); // 1/5

					var player_x =  Q.select('Player').items[0].p.x ;
	      	var player_y =  Q.select('Player').items[0].p.y ;
	      	var vx = player_x - k_obj.c.x ;
	      	var vy = player_y - k_obj.c.y ;

	      	var angle = Math.atan2( vy , vx)/Math.PI*180

					// 要判定場中有沒有出現相同的，因為原倍速太快，所以用比例調整速度
					// if(rand == 1 && Q("MosAttack").length < 20

					if ( random == 1){
						k_obj.stage.insert(new Q.MosAttack({
							x: k_obj.c.x ,
							y: k_obj.c.y ,
							vx: (vx>0)? 10 : (-10),
							vy: ((vx>0)? 10: (-10))*vy/vx,
							angle: angle - 90
						}));
					}
				}
			} , attackTimeInterval ) );
		},

		call: function(){
			// Check 
			if(GAME.ENEMY.k_attack_5.includes(this.p.k_attackId)){
				this.c.y += 30 ;
			}
		},

		move: function(){
			this.animate({y: this.p.y+60} ,0.5 , Q.Easing.Quadratic.InOut);
		},

		collide: function(col) {
   		if(col.obj.isA("Player")) {
    		if(!Q.state.get("isPlayerAttack")){
      		Q("Player").trigger("hurt");
        	Q.state.dec("lives" , 1) ;
    		}
    		this.play("disappear");
    		clearInterval( GAME.ENEMY.k_attackTimer[this.p.k_attackId] ); // clear attack timer
   		}
    },

    attacked: function(){
    	this.p.live -- ;

    	if(this.p.live == 0){
   			Q.audio.play("blood_bubble_broken.mp3");

   			this.play("disappear");
   			dropKatha(this.stage,this,10);
				clearInterval( GAME.ENEMY.k_attackTimer[this.p.k_attackId] ); // clear attack timer
      }	
    },

    disappear: function(){
    	this.destroy();
    },

    step: function(){
    	/*
    	[OCCUR]:
    		1. 超過框框
    	*/

    	if(this.p.y > Q.height)
				this.destroy();
			if(Q.state.get('mosking_life') < 0)
				this.play("disappear");
    }
	}) ;
}