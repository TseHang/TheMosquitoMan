/*
因為針是用 setInterval 設置的，所以設為全域，在war_scene.js 裡
每gameOver一次時reset，增進效能，但要特別注意

目前Bug:
因為可以不殺死血泡，直接殺死魔王，所以會有血泡的timer還在跑的情況
（但要注意的是還必須想要怎麼打魔王，才能解決）
*/

// 蚊子的attackTimer
var attackTimer = [];
var mosId = 0 ;

// 血泡的放針Timer
var k_attackTimer = [] ;
var k_attackId = 0 ;

;Quintus.EnemySprites = function(Q){
	Q.gravityY = 0;
  Q.gravityX = 0;

  var attackTimeInterval = 900 ;
  var player_h ;

  var k_die_timer ;

  // 載入整個場景
	// TileLayer --> GameTiles 
	Q.TileLayer.extend("GameTiles",{
		init: function(p) {
			this._super({
				dataAsset: "level.tmx" ,
				sheet: 'all' ,
				tileW: 10 ,
				tileH: 10 ,
				blockTileW: 21 ,
				blockTileH: 27
			});
		},

		// Override the load method to load the bg.tmx file,
    // then pass the data array to the original implementation
		load: function(dataAsset) {
			var parser = new DOMPaser() ,
					doc = parser.parseFromString( Q.asset(dataAsset) , "application/xml" ) ;

			var layer = doc.getElementByTagName("layer")[0] ,
					width = parseInt(layer.getAttribute("width")),
					height = parseInt(layer.getAttribute("height"));

			var data = [],
					tiles = layer.getElementsByTagName("all"),
					idx = 0;

			for(var y = 0 ; y < height ; y++){
				data[y] = [];
				
				for (var x = 0 ; x < width ; x++){	
					var tile = tiles[idx] ;
					data[y].push(parseInt(tile.getAttribute('gid')-1)) ;
					idx++ ;
				}
			}

			this._super(data);
		},

		collidableTile: function(tileNum) {
      return tileNum != 23;
    }
	});

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
    		this.animate({y:this.p.y - 30 },0.6, Q.Easing.Quadratic.InOut,{ delay:0.3 });
    	else if(this.p.direct == "down")
    		this.animate({y:this.p.y + 30 },0.6, Q.Easing.Quadratic.InOut,{ delay:0.3 });
    }
	});

	// 把 timer 變成 attackTimer
	Q.Sprite.extend("Enemy" , {
		init: function(p){
			this._super(p ,{
				sheet: "mos" + p.mosType,
				sprite: "enemy",
				collisionMask: Q.SPRITE_ENEMY ,
				mosId: mosId,
				opacity: 0.1,
				life: p.mosType,
				count: 0
			});
			this.add("tween");
			this.on("attacked"); 
			this.animate({opacity:1},0.6,Q.Easing.Quadratic.InOut);

			mosId++ ;

			var obj = this ; // 掉針
			attackTimer.push( setInterval(function(){

				if(Q.state.get("is_video_over") && Q.state.get("is_countdown_over")){
					// 決定是否掉落
					var rand = Math.round(Math.random()*6);
					
					player_x =  Q.select('Player').items[0].p.x ;
	      	player_y =  Q.select('Player').items[0].p.y ;
	      	vx = player_x - obj.c.x ;
	      	vy = player_y - obj.c.y ;

	      	angle = Math.atan2( vy , vx)/Math.PI*180

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

		attacked: function(){
			this.p.life = this.p.life - 1 ;

			if (this.p.life <= 0){
				this.p.sheet = "enemy_death";
				// 消掉針
				clearInterval( attackTimer[this.p.mosId] );
				dropKatha(this.stage,this,10);

				// 死掉，destroy
				this.animate({y: this.p.y + 15 , opacity: 0} , 0.2 , Q.Easing.Linear , {
					callback: function(){ this.destroy(); }
				});
			}
		},

		step: function(dt) {
			if(Q.state.get("is_countdown_over")){
				// use counter and that mos walk
	      this.p.count++ ;

	      if(this.p.count % 100 == 0){
	      	this.p.y += 20
	      	this.c.y += 20
	      	this.p.count = 0;
	      }
			}

			if(this.p.y > Q.height)
				this.destroy();
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
			this.on("destroy"); // will just call destroy()
		},

		step: function(dt) {
      this.p.x += this.p.vx * dt ;
      this.p.y += this.p.vy * dt ;
      this.stage.collide(this);

			if(this.p.y > Q.height)
				this.destroy();
    },

		collide: function(col) {
      this.destroy(); // Mosattack will destroy();

    	if(col.obj.isA("Player")) {
    		if(!Q.state.get("isPlayerAttack")){
      		Q("Player").trigger("hurt");
        	Q.state.dec("lives" , 1) ;
    		}
      }else if (col.obj.isA("PlayerInvincible")){
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

			if(this.p.life == 0){
				this.stage.trigger("complete");
			}else{
				this.stage.insert(new Q.MosKing_die({
					x:mosking_x ,
					y:mosking_y
				}));

				this.animate({opacity:0} , 0.1 , Q.Easing.Linear);
			}

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
			this._super(p,{
				sheet: 'mosking_die' ,
				sprite: 'mosking_die',
				collisionMask: Q.SPRITE_ENEMY ,
				opacity:1 
			}) ;

			this.add("tween") ;
			this.opacity_0();

			// 蚊子王的生命減ㄧ
			Q.state.dec("mosking_life" , 1);

			// 把 Mosking_die 指向 this
			mosking_die = this ;

			// 1.5秒後變回蚊子王
			this.animate({y:this.p.y + 15} , 0.8 , Q.Easing.Linear , {

				callback: function(){
					mosking_die.stage.insert(new Q.MosKing({
						x: mosking_die.p.x,
						y: mosking_die.p.y, //recover to not drop's "y"
						scale: 1
					}));

					if(Q.state.get("mosking_life")%2 == 0){

						for(var i = 0 ; i < k_attack_5.length ; i ++){
							k_attack_5[i].animate({ y:k_attack_5[i].p.y+60 } , 0.5 , Q.Easing.Quadratic.InOut);
						}

						var random = Math.round(Math.random()*2 + 1);
						mosEnter(mosking_die.stage,random,220);

					}

					mosking_die.destroy();
				}
			});
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
				k_attackId: k_attackId ,
				live: 5 ,
				opacity:0
			})
			this.add("tween,animation");
			this.animate({opacity:1},0.6,Q.Easing.Quadratic.InOut);
			this.on("hit" , this ,"collide");
			this.on("disappear");

			k_attackId++ ;

			// 掉針！！
			var k_obj = this ;
			k_attackTimer.push( setInterval(function(){
				if(Q.state.get("is_video_over") && Q.state.get("is_countdown_over")){
					var random = Math.round(Math.random()*5);

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

		collide: function(col) {

      // 扣血
    	if(col.obj.isA("Power")) {
        this.p.live-- ; 
   		}

   		if(col.obj.isA("Player")) {
        this.p.live = 0 ; 
   		}

   		if(this.p.live == 0){
   			this.play("disappear");
   			dropKatha(this.stage,this,10);
				clearInterval( k_attackTimer[this.p.k_attackId] ); // clear attack timer
      }	
    },

    disappear: function(){
    	this.destroy();
    },

    step: function(){
    	if(this.p.y > Q.height)
				this.destroy();
    }
	}) ;
}