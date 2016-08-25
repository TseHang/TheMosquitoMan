;Quintus.WarSprites = function(Q){
	Q.gravityY = 0;
  Q.gravityX = 0;

  // 蚊子的attackTimer
  var attackTimer = [] ;
  var mosId = 0 ;

  // 計算蚊子出來次數
	var addCount = 0 ;
  var attackTimeInterval = 1500 ;
  var player_h;


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
	// ＠＠＠＠ 有點搞不懂他在幹嘛 ＠＠＠＠
	// ！！好像是在設置方塊！！
	Q.Sprite.extend("MosquitoTracker" , {
		init: function(p){
			this._super(p,{
				x: Q.width/2 ,
				y: 30 ,
				scale: 0.1,
				count: 0
			})

			this.add("tween");
			this.animate({ scale: 1 },0.4, Q.Easing.Quadratic.InOut);

			// 被insert 的時候 call 它
			this.on("inserted",this,"setupBlocks");
		},

    setupBlocks: function() {
      Q._each(this.p.data,function(row,y) {
        Q._each(row,function(blockNum,x) {
          if(blockNum) { 

            // Add onto the stage, with this as the container
            this.stage.insert(new Q.Enemy({
              num: blockNum,
              x: 80 * x - (row.length / 2 - 0.5) * 80,
              y: 50 * y
            }), this);
          }
        },this);
      },this);
    },

		step: function(dt) {
      this.p.count++ ;

      if(this.p.count % 120 == 0){
      	this.p.y += 20
      	this.c.y += 20
      	this.p.count = 0;
      }
    }
	});

	// 把 timer 變成 attackTimer
	Q.Sprite.extend("Enemy" , {
		init: function(p){
			this._super(p ,{
				sheet: "enemy",
				sprite: "enemy",
				collisionMask: Q.SPRITE_ENEMY ,
				mosId: mosId,
				opacity: 1
			});
			this.add("tween");

			mosId++ ;

			// 掉針！！
			var obj = this ;
			attackTimer.push( setInterval(function(){

				// console.log(Q.select('Player'));
				// 決定是否掉落
				var rand = Math.round(Math.random()*6);
				
				player_x =  Q.select('Player').items[0].p.x ;
      	player_y =  Q.select('Player').items[0].p.y ;
      	vx = player_x - obj.c.x ;
      	vy = player_y - obj.c.y ;

      	angle = Math.atan2( vy , vx)/Math.PI*180

				// 要判定場中有沒有出現相同的
				// 因為原倍速太快，所以用比例調整速度
				if(rand == 1 && Q("MosAttack").length < 10){
					obj.stage.insert(new Q.MosAttack({
						x: obj.c.x ,
						y: obj.c.y ,
						vx: vx>0? 8 : (-8),
						vy: (vx>0? 8: (-8))*vy/vx,
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

	});


	// 載入玩家
	Q.Sprite.extend("Player",{
		init: function(p){
			this._super(p,{
				sheet: 'player' ,
				sprite: 'player',
				type: Q.SPRITE_ENEMY ,
				x: Q.width/2,
				y: 450,
				katha: 0
			}) ;

			player_h = this.p.h ;
		},

		step: function(dt){
			// 控制人物
			// var player_w = this.p.w/2 ;
			// if (Q.inputs['left']){
			// 	this.p.x -= 5 ;

			// 	if ( this.p.x < player_w)
			// 		this.p.x = player_w ;
			// }else if (Q.inputs['right']){
			// 	this.p.x += 5 ;

			// 	if ( this.p.x > (Q.width - player_w))
			// 		this.p.x = (Q.width - player_w) ;
			// }

			if(Q("Enemy").length < 5 ){
				if(addCount > 0){
					this.stage.insert(new Q.MosquitoTracker({
	    			data: Q.asset("addRow") ,
	    			y: 0,
	    			scale:1
	    		}));

					addCount-- ;
				} 

				if(addCount == 0 && Q("Enemy").length == 0){
					this.stage.insert(new Q.MosKing());
				}	
			}
		}
	})

	Q.Sprite.extend("Power" , {
		init: function(p){

			var player_x = Q.select('Player').items[0].p.x;

			this._super(p,{
				sheet: 'power' ,
				sprite: "power",
				collisionMask: Q.SPRITE_DEFAULT ,
				x: player_x,
				y: 380,
				angle:0

			}) ;

			// Wait til we are inserted, then listen for events on the stage
			this.on("hit" , this , "collide");


			// this.on("katha_1");
		},

		step: function(dt) {
			this.p.x += this.p.vx * dt;
      this.p.y += this.p.vy * dt;
    	this.stage.collide(this);
    },

    collide: function(col) {
    	if(col.obj.isA("Enemy") || col.obj.isA("MosAttack") || col.obj.isA("MosKing")) {
        Q.play("brickDeath.ogg");
        
        // 消掉蚊子 or 針
        col.obj.destroyed();
        this.destroy();
      }
    }

  //  	katha_1: function(){
		// 	this.p.sheet = "katha_1_power";
		// }
	});

	// 載入大蚊子
	Q.Sprite.extend("MosKing",{
		init: function(p){
			this._super(p,{
				sheet: 'mosking_anim' ,
				sprite: 'mosking_anim',
				collisionMask: Q.SPRITE_ENEMY ,
				x: Q.width/2,
				y: 120,
				life: 20
			}) ;
		},

		destroyed: function(){
			this.p.life -- ;

			if(this.p.life == 0){
				this.destroy();
				this.stage.trigger("complete");
			}
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
		},

		step: function(dt) {
      this.p.x += this.p.vx * dt ;
      this.p.y += this.p.vy * dt ;
      this.stage.collide(this);

			if(this.p.y > (Q.height - player_h +20))
				this.destroy();
    },

		collide: function(col) {

      // 扣血
    	if(col.obj.isA("Player")) {
      	this.destroy();
        Q.state.dec("lives" , 1) ;
      }
    },

    destroyed: function(){
    	this.destroy();
    }
	})

	// ！！！！
	// 掉卷軸
	// ！！！！
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
		},

		step: function(dt) {
      this.p.y += this.p.vy * dt;
      this.stage.collide(this);

			if(this.p.y > (Q.height - player_h +20))
				this.destroy();
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
      	Q("Power").trigger("katha_1");
      }
    },

    destroyed: function(){
    	this.destroy();
    }
	})



}