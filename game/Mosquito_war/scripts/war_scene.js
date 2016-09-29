/*

STATE: 
1: player_h 主角的身長
2: lives 生命！
3: level 關卡
4: katha 指吃到哪一個奧義的編號（用來顯示捲軸）
5: player_state 角色介紹編號（1:掌蚊人，2:蚊子王，3:蚊子） 
6: power_up 控制攻擊泡泡，有沒有變大
7: mosking_life 蚊子王的生命 預設20
8: isPlayerAttack: if player attack?
9: isLevelStop : if level stop
10:iskatha1 : if katha_1 ING?
11:isKatha2 : if katha_2 ING?
12:isKatha3 : if katha_3 ING?
13:is_countdown_over: if countdown over?
14:is_video_over: if video over?
15:isMosenter: if Mosenter ?
16:isMosenterScene: if MosenterScene ?
-
gameDescription: stage-2
hud: stage-1
katha: stage-2
countdown: stage-3
mosEnter: stage-4

 */
;Quintus.WarScenes = function(Q) {

	// 第一頁面
	Q.scene("title" , function(stage){
		// Set up the game state
    Q.state.reset({ 
    	player_h: 0 ,
    	lives: 4,
    	level: 0 ,
    	katha: 0 ,
    	player_state: 1 ,
    	power_up: 0 ,
    	mosking_life: 10 ,
    	isPlayerAttack: false ,
    	isStop: false,
    	iskatha1: false ,
    	iskatha2: false ,
    	iskatha3: false ,
    	is_countdown_over: false,
    	is_video_over: false,
    	isMosenter: false ,
    	isMosenterScene: 0
    });

		// Clear the hud out
		Q.clearStage(1) ;

		var bg = stage.insert(new Q.Background()) ;
		var landing_logo = stage.insert(new Q.Logo()) ;
		var landing_play = stage.insert(new Q.Landing_start());
		var landing_player = stage.insert(new Q.Landing_player());
		// ＊＊＊＊＊＊
		// 開始玩遊戲!!
		// ＊＊＊＊＊＊
		landing_play.on('touch' , function(){
			
			// animate BG!
			bg.animate({ cy: Q.height/2 }, 1, Q.Easing.Quadratic.InOut , {
				callback: function(){Q.stageScene("introStory");}
			});

			// 消失 LOGO
			landing_logo.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;

			// 消失按鍵
			landing_play.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
			landing_player.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
		});

		// ＊＊＊＊＊＊
		// 角色說明!!
		// ＊＊＊＊＊＊
		landing_player.on('touch' , function(){
			
			// 消失背景
			bg.animate({ opacity: 0 }, 1, Q.Easing.Quadratic.InOut);

			// 消失 LOGO
			landing_logo.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut , {
				callback: function(){Q.stageScene("introPlayerMan");}
			}) ;

			// 消失按鍵
			landing_play.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
			landing_player.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
		});

		// loadAllVideo
		loadAllVideo();
	})

	Q.scene("introStory" , function(stage){
		// 介紹故事
		console.log("Scene: introStory");

		var intro_bg = stage.insert(new Q.IntroBg()) ;
		var intro_man = stage.insert(new Q.IntroMan()) ;
		var intro_text = stage.insert(new Q.IntroText()) ;
		var intro_howplay = stage.insert(new Q.IntroHowplay());
		var intro_go = stage.insert(new Q.IntroGo());
		
		intro_howplay.on("touch" , function(){
			Q.stageScene("gameDescription");
		});

		// start game!
		intro_go.on('touch' , function(){
			
			intro_bg.animate({opacity: 0} , 1 , Q.Easing.Linear ) ;
			intro_text.animate({opacity: 0} , 0.5 , Q.Easing.Linear , {
				callback: function(){Q.stageScene("level1")}
			}) ;
			intro_go.animate({opacity: 0 }, 0.5 ,  Q.Easing.Linear);
			intro_howplay.animate({opacity: 0 }, 0.5 ,  Q.Easing.Linear);

			intro_man.animate({scale: 0} , 0.3 , Q.Easing.Quadratic.InOut , {
				callback: function(){ this.destroy(); }
			}) ;
		})

	});

	Q.scene("gameDescription" , function(stage){

		stage.insert(new Q.GameDescription_bg());
		stage.insert(new Q.UI.Text({
			label: "白線斑蚊將以「血刺」攻擊\n玩家，須不斷閃躲或用攻擊\n抵消。",
			color: "black",
			x: Q.width/2 + 85 ,
			y: Q.height/2 - 140,
			weight: "normal",
			align: "left",
			size: 16
		}))

		stage.insert(new Q.UI.Text({
			label: "神秘魔王現身，必須要小心\n以防血泡突破護體真氣。",
			color: "black",
			x: Q.width/2 + 85 ,
			y: Q.height/2 - 40,
			weight: "normal",
			align: "left",
			size: 16
		}))

		stage.insert(new Q.UI.Text({
			label: "玩家操控主角，\nA鍵向左、D鍵向右。",
			color: "black",
			x: Q.width/2 + 60 ,
			y: Q.height/2 + 60 ,
			weight: "normal",
			align: "left",
			size: 15
		}))

		stage.insert(new Q.UI.Text({
			label: "以滑鼠控制方向，點擊左鍵\n發出氣功，勇猛殺敵。",
			color: "black",
			x: Q.width/2 + 80 ,
			y: Q.height/2 + 140 ,
			weight: "normal",
			align: "left",
			size: 15
		}))

		var close_btn = stage.insert(new Q.Sprite({
			x: Q.width - 120,
      y: Q.height/2 + 170,
			asset: 'katha/katha_close.png',
      type: Q.SPRITE_UI
		}))

		close_btn.on("touch", function(){
			Q.clearStage(2);
		})

	} , {stage : 2 });

	Q.scene("introPlayerMan" , function(stage){
		// 介紹故事
		console.log("Scene: introPlayerMan");

		// SET player_state = 1
		Q.state.set('player_state' , 1);

		stage.insert(new Q.PlayerManBg()) ;
		stage.insert(new Q.PlayerManRotate());
		stage.insert(new Q.PlayerManMan());
		stage.insert(new Q.PlayerManText1());

		Q.stageScene("playerFooter") ;

	});

	Q.scene("introPlayerMosking" , function(stage){
		// 介紹故事
		console.log("Scene: introPlayerMosking");

		// SET player_state = 2
		Q.state.set('player_state' , 2);

		stage.insert(new Q.PlayerMoskingBg()) ;
		stage.insert(new Q.PlayerMoskingRotate());
		stage.insert(new Q.PlayerMosking());

		Q.stageScene("playerFooter") ;

	});

	Q.scene("introPlayerMos" , function(stage){
		// 介紹故事
		console.log("Scene: introPlayerMos");

		// SET player_state = 1
		Q.state.set('player_state' , 3);

		stage.insert(new Q.PlayerMosBg()) ;
		stage.insert(new Q.PlayerMoskingRotate());
		stage.insert(new Q.PlayerMos());

		Q.stageScene("playerFooter") ;

	});

	Q.scene("playerFooter", function(stage){
		var player_state = Q.state.get("player_state");
		var back = stage.insert(new Q.PlayerBack());
		right = stage.insert(new Q.PlayerRight());
		left = stage.insert(new Q.PlayerLeft());

		right.on("touch" , function(){
			if(player_state == 1){
				Q.stageScene("introPlayerMosking");
			}else if(player_state == 2){
				Q.stageScene("introPlayerMos");
			}else if (player_state == 3){
				Q.stageScene("introPlayerMan")
			}

			right.play("click");
			// Ｑ：why 'this.play("click")' didn't work;
		})

		left.on("touch" , function(){
			if(player_state == 1){
				Q.stageScene("introPlayerMos");
			}else if(player_state == 2){
				Q.stageScene("introPlayerMan");
			}else if (player_state == 3){
				Q.stageScene("introPlayerMosking")
			}

			left.play("click");
		})

		back.on("touch" , function(){
			Q.stageScene("title") ;
		})

	} , {stage: 1});

	Q.scene("mosEnter" , function(stage){

		Q.state.set("isMosenter",true);
		var mosEnterScene = Q.state.get("isMosenterScene");

		stage.insert(new Q.Mosking_talk());
		stage.insert(new Q.Mosking_talk_frame());

		if(mosEnterScene ==2)
			var text = stage.insert(new Q.Mosking_talk_text_2());
		else if(mosEnterScene ==3)
			var text = stage.insert(new Q.Mosking_talk_text_3());

		text.animate({opacity:1},0.3,Q.Easing.Quadratic.InOut,{
			delay:0.6,
			callback: function(){
				level.on("touch",function(){
					Q.clearStage(4);

					var circle = Q.stage().insert(new Q.Mos_magic_circle());
					circle.animate({scale:1 , opacity:1},0.3,Q.Easing.Quadratic.InOut , {
						callback: function(){
							this.stage.insert(new Q.MosquitoTracker({
	    					data: Q.asset("addMos_"+ mosEnterScene) ,
	    					y: 70,
	    					scale: 1,
	    					direct:"up"
	    				}));

	    				this.animate({opacity:0},0.5,Q.Easing.Linear,{
	    					delay:0.5,
	    					callback:function(){ this.destroy(); Q.state.set("isMosenter",false);}
	    				})
						}
					});

					level.listeners.touch.pop(); // pop "touch" Event ;
				})
			}
		});
	},{stage: 4});

	Q.scene("katha" , function(stage){                  
		// kathaNum 會再吃到捲軸的時候被設定！
		var kathaNum = Q.state.get("katha");

		if (kathaNum == 1){
			stage.insert(new Q.Katha_1_bg());
			stage.insert(new Q.Katha_1_title());
			stage.insert(new Q.Katha_1_text());
			stage.insert(new Q.Katha_1_function());
			btn = stage.insert(new Q.Katha_close_btn());

			Q.state.set("iskatha1",true);
		}
		else if(kathaNum == 2 ) {
			stage.insert(new Q.Katha_2_bg());
			stage.insert(new Q.Katha_2_title());
			stage.insert(new Q.Katha_2_text());
			stage.insert(new Q.Katha_2_function());
			btn = stage.insert(new Q.Katha_close_btn());

			Q.state.set("iskatha2",true);
		}else if (kathaNum == 3){
			stage.insert(new Q.Katha_3_bg());
			stage.insert(new Q.Katha_3_title());
			stage.insert(new Q.Katha_3_text());
			stage.insert(new Q.Katha_3_function());
			btn = stage.insert(new Q.Katha_close_btn());

			Q.state.set("iskatha3",true);
		}

		// 按鈕
		btn.on("touch" , function(){
			if (kathaNum == 1){
				window.setTimeout(function(){ Q("Power").trigger("power_recover"); Q.state.set("iskatha1",false);},10000);
			}else if (kathaNum == 2){
				window.setTimeout(function(){ Q("Player").trigger("player_recover"); Q.state.set("iskatha2",false);} , 10000);
			}else if( kathaNum == 3){
				window.setTimeout(function(){ Q("PlayerInvincible").trigger("hidden_destroy"); Q.state.set("iskatha3",false);} , 8500);
			}

			Q.state.set("katha" , 0);
			Q.stage().paused = false;
			
			// Clear the katha
			Q.clearStage(2) ;
		})

	},{ stage: 2});

	// hud --> 下面的分數狀態列
	Q.scene("hud" , function(stage){

		// landing UI
		// stage.insert(new Q.Score()) ;
		stage.insert(new Q.Lives_text()) ;
		stage.insert(new Q.LevelStop_btn()) ;

	} , {stage : 1 });

	Q.scene("countdown", function(stage){

		var container = stage.insert(new Q.UI.Container({
			fill: "rgba(90,88,92,0.85)" ,
      shadowColor: "rgba(0,0,0,0.5)",
      w: Q.width,
      h: 120,
      x: - Q.width/2,
      y: Q.height/2 - 30
		}))
		container.add("tween");
		container.animate({x:Q.width/2},0.2 ,Q.Easing.Quadratic.InOut);

		stage.insert(new Q.Countdown_three(),container);
		stage.insert(new Q.Countdown_two(),container);
		stage.insert(new Q.Countdown_one(),container);

		stage.on("countdown_over",function() {  
			Q.state.set("is_countdown_over",true) ;
			Q.clearStage(3)
		});

	} , {stage: 3});

	function setupLevel(levelAsset,stage) {

		// ASK!!  Q.useTiles --> 不知道要幹嗎(可能是用bg.tmx的意思)
    if(Q.useTiles) {
      stage.collisionLayer(new Q.GameTiles());
    } else {
      level = stage.insert(new Q.Level_bg());
    }
    stage.insert(new Q.Player());
    
    Q.state.inc("isMosenterScene",1) ;
    Q.state.set("isMosenter",true);

    var circle = Q.stage().insert(new Q.Mos_magic_circle());
    circle.animate({ scale: 1, opacity: 1 }, 0.3, Q.Easing.Quadratic.InOut, {
      callback: function() {
        this.stage.insert(new Q.MosquitoTracker({ data: Q.asset(levelAsset) , direct: "up" , y: 70}));
        this.animate({ opacity: 0 }, 0.5, Q.Easing.Linear, {
          delay: 0.5,
          callback: function() { this.destroy(); Q.state.set("isMosenter", false); }
        })
      }
    });
  }

	// 第一關
	Q.scene("level1" , function(stage){

		// show timeBar
		showBar();

		// Set up the game state
    Q.state.set("level" , 1);
    Q.state.set("isLevelStop" , false);

    Q.stageScene("hud") ;

    setupLevel("level1", stage);

    // Play fight video
    playVideo(video_fight);

    // Set up a listener for when the stage is complete to load the next level
    stage.on("complete",function() {  Q.stageScene("winner");  });
	})

	// 第二關
	Q.scene("level2" , function(stage){
		console.log("level2");

		// 更改 UI.Text
		Q.state.set("level" , 2);
		setupLevel("level2" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("level3"); });
	})

	// 第三關
	Q.scene("level3" , function(stage){
		console.log("level3");

		// 更改 UI.Text
		Q.state.set("level" , 3);
		setupLevel("level3" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("winner"); });
	})

	// 遊戲結束畫面
	Q.scene("gameOver" , function(stage){
		console.log("Scene: gameOver");

		reset(stage);
		
		stage.insert(new Q.Sprite({
			asset:"level/gameover_bg.png",
			x: Q.width/2,
			y: Q.height/2
		})) ;

		var goTitle = stage.insert(new Q.Sprite({
			sheet:"level_goTitle_gameover",
			x: Q.width/2,
			y: Q.height/2 - 15,
			type: Q.SPRITE_UI
		})) ;

		var goAgain = stage.insert(new Q.Sprite({
			sheet:"level_goAgain_gameover",
			x: Q.width/2,
			y: Q.height/2 + 35,
			type: Q.SPRITE_UI
		})) ;

		goTitle.on("touch",function(){ Q.stageScene("title")});
		goAgain.on("touch",function(){ Q.stageScene("level1")});
	})

	// 遊戲贏家畫面
	Q.scene("winner" , function(stage){
		console.log("Scene: winner");

		reset(stage);

		stage.insert(new Q.Sprite({
			asset:"level/winner_bg.png",
			x: Q.width/2,
			y: Q.height/2
		})) ;

		var goTitle = stage.insert(new Q.Sprite({
			sheet:"level_goTitle_winner",
			x: Q.width/2,
			y: Q.height/2 + 100,
			type: Q.SPRITE_UI
		})) ;

		var goFanspage = stage.insert(new Q.Sprite({
			sheet:"level_goFanspage_winner",
			x: Q.width/2,
			y: Q.height/2 + 150,
			type: Q.SPRITE_UI
		})) ;

		goTitle.on("touch",function(){
			Q.stageScene("title") ;
		})

		goFanspage.on("touch",function(){
			Q.stageScene("title") ;
			window.open('https://www.facebook.com/themosquitoman/', '_blank');
		})
	})
}


function showBar(){
	bar.style.display="block";
}

function hiddenBar(){
	bar.style.display="none";
}

function reset(stage) {
  // 把沒打死的蚊子，所有計時器停掉
  for (i = 0; i < attackTimer.length; i++)
    clearInterval(attackTimer[i]);
  for (i = 0; i < k_attackTimer.length; i++)
    clearInterval(k_attackTimer[i]);

  // 初始化 attackTimer(射蚊子的針用的)、k_attackTimer
  // 把length = 0 是清空同一個記憶體，若是指定為 [] ，其實舊有資料還是存在，只是另外配給一段記憶體給新陣列
  attackTimer.length = 0; 
  k_attackTimer.length = 0;
  mosId = 0;
  k_attackId = 0;

  // 消除level 下面那條
	Q.clearStage(1) ;

	// Update Q.state
	Q.state.set({
		mosking_life: 10,
		lives: 4,
		isPlayerAttack:false ,
		isMosenter:false,
		isMosenterScene:0
	});// reset mosking life

	mos_addCount = 2; 

	allSecs = 300 ; //reset timeBar timer
	bar.style.display="none";
}


function mosEnter(stage, random , y) {

  var circle = stage.insert(new Q.Mos_magic_circle({y:220}));

  circle.animate({ scale: 1, opacity: 1 }, 0.3, Q.Easing.Quadratic.InOut, {
    callback: function() {
      k_attack_5.push(this.stage.insert(new Q.MosquitoTracker({ data: Q.asset("addKingattack_s_"+random), y: y ,direct: "down"})));
      this.animate({ opacity: 0 }, 0.5, Q.Easing.Linear, {
        delay: 0.5,
        callback: function() { this.destroy(); }
      })
    }
  });
}

function dropKatha(stage,obj,rate) {
  // 掉寶物(記得調倍率)
  var rand = Math.round(Math.random() * rate);

  if (rand == 1 && Q("Katha_1").length == 0 && !Q.state.get("iskatha1")) {
    stage.insert(new Q.Katha_1({
      x: obj.c.x,
      y: obj.c.y
    }));
  } else if (rand == 2 && Q('Katha_2').length == 0 && !Q.state.get("iskatha2")) {
    stage.insert(new Q.Katha_2({
      x: obj.c.x,
      y: obj.c.y
    }));
  } else if (rand == 3 && Q('Katha_3').length == 0 && !Q.state.get("iskatha3")) {
    stage.insert(new Q.Katha_3({
      x: obj.c.x,
      y: obj.c.y
    }));
  }
}

