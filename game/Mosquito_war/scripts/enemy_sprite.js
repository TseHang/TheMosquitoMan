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

	// 載入蚊子
	Q.Sprite.extend("MosquitoTracker" , {
		init: function(p){
			this._super(p,{
				x: Q.width/2 ,
				y: 30 ,
				scale: 0.1
			})

			this.add("tween");
			this.animate({ scale: 1 },0.4, Q.Easing.Quadratic.InOut);

			// 被insert 的時候 call 它
			this.on("inserted",this,"setupBlocks");

			// 控制它到一個程度會自動消失
			// player_h = Q.state.get("player_h");
			// console.log(player_h);
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
	});

	// 把 timer 變成 attackTimer
	Q.Sprite.extend("Enemy" , {
		init: function(p){
			this._super(p ,{
				sheet: "mos" + p.mosType,
				sprite: "enemy",
				collisionMask: Q.SPRITE_ENEMY ,
				mosId: mosId,
				opacity: 1,
				count: 0
			});
			this.add("tween");
			this.on("destroy"); // will just call destroy()

			mosId++ ;

			// 掉針！！
			var obj = this ;
			attackTimer.push( setInterval(function(){

				// 決定是否掉落
				var rand = Math.round(Math.random()*6);
				
				player_x =  Q.select('Player').items[0].p.x ;
      	player_y =  Q.select('Player').items[0].p.y ;
      	vx = player_x - obj.c.x ;
      	vy = player_y - obj.c.y ;

      	angle = Math.atan2( vy , vx)/Math.PI*180

				// 要判定場中有沒有出現相同的
				// 因為原倍速太快，所以用比例調整速度
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

			} , attackTimeInterval) );
		},

		destroyed: function(col){

			// 換成死掉的sheet
			this.p.sheet = "enemy_death";

			// 消掉針
			clearInterval( attackTimer[this.p.mosId] );

			// 增加分數
			Q.state.inc("score" , 100) ;

			// 掉寶物(記得調備率)
			var rand = Math.round(Math.random()* 15);

			if( rand == 1 && Q("Katha_1").length == 0){
				this.stage.insert(new Q.Katha_1({
					x: this.c.x ,
					y: this.c.y 
				}));
			}

			// 死掉，destroy
			this.animate({y: this.p.y + 15 , opacity: 0} , 0.3 , Q.Easing.Linear , {
				callback: function(){ this.destroy(); }
			});
		},

		step: function(dt) {
			// 
			// 利用計數器，讓蚊子前進
      this.p.count++ ;

      if(this.p.count % 120 == 0){
      	this.p.y += 20
      	this.c.y += 20
      	this.p.count = 0;
      }
    }
	});

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

      // 控制它超出一條線會自動消失， player_h 在 MosquitoTracker 設定
			// if(this.p.y > (Q.height - player_h +20))
			// 	this.destroy();
    },

		collide: function(col) {
      // 扣血
    	if(col.obj.isA("Player")) {
      	this.destroy();
        Q.state.dec("lives" , 1) ;
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
			
			this.on("destroy"); // will just call destroy()

			this.add("tween,animation") ;
			this.animate({scale:1}, 0.4 , Q.Easing.Quadratic.InOut);

			this.fly_up();
			this.play("default");

			console.log("mosking_life: " + this.p.life);
		},

		// 就是指蚊子王被打到後的動作
		destroyed: function(){
			mosking_x = this.p.x ;
      mosking_y = this.p.y ;

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
      this.animate({y: 115 } ,0.7 , Q.Easing.Quadratic.InOut , {
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
			this.animate({y:this.p.y + 30} , 1.5 , Q.Easing.Linear , {
				callback: function(){
					mosking_die.stage.insert(new Q.MosKing({
						x: mosking_die.p.x,
						y: mosking_die.p.y,
						scale: 1
					}))

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
				live: 5 
			})

			this.on("hit" , this ,"collide");

			k_attackId++ ;

			// 掉針！！
			var k_obj = this ;
			k_attackTimer.push( setInterval(function(){
				
				random = Math.round(Math.random()*4);

				player_x =  Q.select('Player').items[0].p.x ;
      	player_y =  Q.select('Player').items[0].p.y ;
      	vx = player_x - k_obj.c.x ;
      	vy = player_y - k_obj.c.y ;

      	angle = Math.atan2( vy , vx)/Math.PI*180

				// 要判定場中有沒有出現相同的
				// 因為原倍速太快，所以用比例調整速度
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
			} , 800 ) );
		},

		collide: function(col) {

      // 扣血
    	if(col.obj.isA("Power")) {
        this.p.live-- ; 
   		}

   		if(this.p.live == 0){
        this.destroy();
        
        // 消掉針
				clearInterval( k_attackTimer[this.p.k_attackId] );
      }	
    }
	}) ;
}