/*

STATE: 
1: player_h 主角的身長
2: lives 生命！
3: level 關卡
4: katha 指吃到哪一個奧義的編號（用來顯示捲軸）
5: player_state 角色介紹編號（1:掌蚊人，2:蚊子王，3:蚊子將軍，4:蚊子） 
6: power_up 控制攻擊泡泡，有沒有變大
7: mosking_life 蚊子王的生命 預設10
8: isPlayerAttack: if player attack?
9: isLevelStop : if level stop
10:iskatha1 : if katha_1 ING?
11:isKatha2 : if katha_2 ING?
12:isKatha3 : if katha_3 ING?
13:is_countdown_over: if countdown over?
14:is_video_over: if video over?
15:video_num: video NUM ;
16:isMosenter: if Mosenter ?
17:isMosenterScene: if MosenterScene NUMBER (蚊子第幾次出現）?
18:whichBGM : which BGM player now in !
-
gameDescription: stage-2
hud: stage-1
katha: stage-2
countdown: stage-3
mosEnter: stage-4

------------------
CONTROL SCENE:
(1)win: enemy_sprite.js --> trigger 'complete'( 人消失、針消失 )
(2)lose: level_ui.js --> trigger 'lose'（ 血泡消失、針消失、人消失）

 */
;Quintus.WarScenes = function(Q) {
	
	var level ; // Level_BG 

	// The Main MenuBar
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
    	video_num: 1,
    	isMosenter: false ,
    	isMosenterScene: 0,
    	whichBGM: bgm_opening
    });

    if(GAME.VIDEO.isOpening === false){
    	console.log("war opening");
    	playBGM(bgm_opening ,1);
    }

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
			Q.audio.play("click.mp3");
			stopBGM(Q.state.get("whichBGM"));

			// animate BG!
			bg.animate({ cy: Q.height/2 }, 1, Q.Easing.Quadratic.InOut , {
				callback: function(){
					// delay 0.02 sec , 因為stageScene 換太快，導致中間會出現黑屏
					window.setTimeout(function(){Q.stageScene("introStory");},20);
				}
			});

			// 消失 LOGO
			landing_logo.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut , {
				callback: function(){ this.destroy(); }
			}) ;

			// 消失按鍵
			landing_play.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut , {
				callback: function(){ this.destroy(); }
			}) ;
			landing_player.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut , {
				callback: function(){ this.destroy(); }
			}) ;
		});

		// ＊＊＊＊＊＊
		// 角色說明!!
		// ＊＊＊＊＊＊
		landing_player.on('touch' , function(){
			Q.audio.play("click.mp3");
			stopBGM(Q.state.get("whichBGM"));

			// 消失背景
			bg.animate({ opacity: 0 }, 1, Q.Easing.Quadratic.InOut , {
				callback: function(){
					landing_logo.destroy();
					landing_play.destroy(); 
					landing_player.destroy();
					this.destroy();
				}
			});

			// 消失 LOGO
			landing_logo.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut , {
				callback: function(){Q.stageScene("introPlayerMan");}
			}) ;

			// 消失按鍵
			landing_play.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
			landing_player.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
		});
	})

	Q.scene("introStory" , function(stage){

		playBGM(bgm_ready_start,0.4);

		// 介紹故事
		console.log("Scene: introStory");

		var intro_bg = stage.insert(new Q.IntroBg()) ;
		var intro_man = stage.insert(new Q.IntroMan()) ;
		var intro_text = stage.insert(new Q.IntroText()) ;
		var intro_howplay = stage.insert(new Q.IntroHowplay());
		var intro_go = stage.insert(new Q.IntroGo());
		
		intro_howplay.on("touch" , function(){
			Q.audio.play("click.mp3");
			Q.stageScene("gameDescription");
		});

		// start game!
		intro_go.on('touch' , function(){
			Q.audio.play("click.mp3");
			stopBGM(Q.state.get("whichBGM")) ;

			intro_bg.animate({opacity: 0} , 1 , Q.Easing.Linear ,{
				callback: function(){
					intro_text.destroy();
					intro_go.destroy();
					intro_howplay.destroy();
				}
			}) ;
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
			x: 255 ,
			y: 110,
			weight: "normal",
			align: "left",
			family:"Arial,微軟正黑體,sans-serif",
			size: 16
		}))

		stage.insert(new Q.UI.Text({
			label: "神秘魔王現身，必須要小心\n以防血泡突破護體真氣。",
			color: "black",
			x: 255 ,
			y: 210,
			weight: "normal",
			align: "left",
			family:"Arial,微軟正黑體,sans-serif",
			size: 16
		}))

		stage.insert(new Q.UI.Text({
			label: "玩家操控主角，\nA鍵向左、D鍵向右。",
			color: "black",
			x: 255 ,
			y: 310,
			weight: "normal",
			align: "left",
			family:"Arial,微軟正黑體,sans-serif",
			size: 16
		}))

		stage.insert(new Q.UI.Text({
			label: "以滑鼠控制方向，點擊左鍵\n發出氣功，勇猛殺敵。",
			color: "black",
			x: 255,
			y: 395 ,
			weight: "normal",
			align: "left",
			family:"Arial,微軟正黑體,sans-serif",
			size: 16
		}))

		var close_btn = stage.insert(new Q.Sprite({
			x: Q.width - 120,
      y: Q.height/2 + 180,
			asset: 'katha/katha_close.png',
      type: Q.SPRITE_UI
		}))

		close_btn.on("touch", function(){
			Q.audio.play("click.mp3");
			Q.clearStage(2);
		})

	} , {stage : 2 });

	Q.scene("introPlayerMan" , function(stage){
		// 介紹故事
		playBGM(bgm_player_man);

		// SET player_state = 1
		Q.state.set('player_state' , 1);

		stage.insert(new Q.PlayerManBg()) ;
		stage.insert(new Q.PlayerManRotate());
		stage.insert(new Q.PlayerManMan());
		stage.insert(new Q.PlayerManText1());

		Q.stageScene("playerFooter") ;

		console.log("Scene: introPlayerMan");
	});

	Q.scene("introPlayerMosking" , function(stage){

		playBGM(bgm_player_mosking);

		// SET player_state = 2
		Q.state.set('player_state' , 2);

		stage.insert(new Q.PlayerMoskingBg()) ;
		stage.insert(new Q.PlayerMoskingRotate());
		stage.insert(new Q.PlayerMosking());

		Q.stageScene("playerFooter") ;
		console.log("Scene: introPlayerMosking");

	});

	Q.scene("introPlayerMosG" , function(stage){

		playBGM(bgm_player_mosG);

		// SET player_state = 3
		Q.state.set('player_state' , 3);

		stage.insert(new Q.PlayerMosGBg()) ;
		stage.insert(new Q.PlayerMoskingRotate());
		stage.insert(new Q.PlayerMosG());

		Q.stageScene("playerFooter") ;
		console.log("Scene: introPlayerMosG");

	});

	Q.scene("introPlayerMos" , function(stage){

		playBGM(bgm_player_mos);

		// SET player_state = 4
		Q.state.set('player_state' , 4);

		stage.insert(new Q.PlayerMosBg()) ;
		stage.insert(new Q.PlayerMoskingRotate());
		stage.insert(new Q.PlayerMos());

		Q.stageScene("playerFooter") ;
		console.log("Scene: introPlayerMos");

	});

	Q.scene("playerFooter", function(stage){
		var player_state = Q.state.get("player_state");
		var back = stage.insert(new Q.PlayerBack());

		right = stage.insert(new Q.PlayerRight());
		left = stage.insert(new Q.PlayerLeft());

		right.on("touch" , function(){
			Q.audio.play("click.mp3");

			if(player_state == 1){
				stopBGM(bgm_player_man);
				Q.stageScene("introPlayerMosking");
			}else if(player_state == 2){
				stopBGM(bgm_player_mosking);
				Q.stageScene("introPlayerMosG");
			}else if (player_state == 3){
				stopBGM(bgm_player_mosG);
				Q.stageScene("introPlayerMos")
			}else if (player_state == 4){
				stopBGM(bgm_player_mos);
				Q.stageScene("introPlayerMan")
			}

			right.play("click");
			// Ｑ：why 'this.play("click")' didn't work;
		})

		left.on("touch" , function(){
			Q.audio.play("click.mp3");

			if(player_state == 1){
				stopBGM(bgm_player_man);
				Q.stageScene("introPlayerMos");
			}else if(player_state == 2){
				stopBGM(bgm_player_mosking);
				Q.stageScene("introPlayerMan");
			}else if (player_state == 3){
				stopBGM(bgm_player_mosG);
				Q.stageScene("introPlayerMosking")
			}else if (player_state == 4){
				stopBGM(bgm_player_mos);
				Q.stageScene("introPlayerMosG")
			}

			left.play("click");
		})

		back.on("touch" , function(){
			Q.audio.play("click.mp3");

			if(player_state === 1){
				stopBGM(bgm_player_man);
			}else if(player_state === 2){
				stopBGM(bgm_player_mosking);
			}else if (player_state === 3){
				stopBGM(bgm_player_mosG);
			}else if( player_state === 4){
				stopBGM(bgm_player_mos);
			}

			Q.stageScene("title") ;
		})

	} , {stage: 1});

	Q.scene("mosEnter" , function(stage){
		
		var mosEnterScene = Q.state.get("isMosenterScene");
		Q.state.set("isMosenter",true);

		stage.insert(new Q.Mosking_talk());
		stage.insert(new Q.Mosking_talk_frame());

		if(mosEnterScene ==2){

			stopBGM(bgm_level1);
			playBGM(bgm_mos_appear);
			
			var text = stage.insert(new Q.Mosking_talk_text_2());
		}
		else if(mosEnterScene ==3){
			stopBGM(bgm_mos_appear);
			playBGM(bgm_mosG_appear);

			var text = stage.insert(new Q.Mosking_talk_text_3());
		}

		text.animate({opacity:1},0.3,Q.Easing.Quadratic.InOut,{
			delay:0.6,
			callback: function(){
				level.on("touch",function(){

					Q.audio.play("click.mp3");
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

	    				if (mosEnterScene == 3)
	    					Q.audio.play("mosG_scream.mp3");

	    				this.animate({opacity:0},0.5,Q.Easing.Linear,{
	    					delay:0.5,
	    					callback:function(){ 
	    						if(mosEnterScene == 2)
	    							Q.audio.play("mos_scream.mp3");

	    						this.destroy();
	    						Q.state.set("isMosenter",false);
	    					;}
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
		var btn ;
		var kathaNum = Q.state.get("katha");
		
		Q.state.set("isLevelStop",true);
		Q.audio.play("katha_drop.mp3")

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
				Q.audio.play("player_powerup.mp3");
				window.setTimeout(function(){ Q("Power").trigger("power_recover"); Q.state.set("iskatha1",false);},10000);
			}else if (kathaNum == 2){
				Q.audio.play("speedup.mp3");
				window.setTimeout(function(){ Q("Player").trigger("player_recover"); Q.state.set("iskatha2",false); } , 10000);
			}else if( kathaNum == 3){
				Q.audio.play("player_invincible.mp3");
				window.setTimeout(function(){ Q("PlayerInvincible").trigger("hidden_destroy"); Q.state.set("iskatha3",false);} , 6666);
			}

			Q.state.set("katha" , 0);

			Q.state.set("isLevelStop",false);
			stageContinue();
			
			Q.audio.play("click.mp3");
			// Clear the katha
			Q.clearStage(2) ;
		})

	},{ stage: 2});

	// hud --> 下面的分數狀態列
	Q.scene("hud" , function(stage){

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
			var videoNum ;

			Q.state.set("is_countdown_over",true) ;
			videoNum = Q.state.get("video_num") ;

			if( videoNum === 1){
				// Start Timebar , lastUsedTime = 0
				startClock(0); 
			}
			else if (videoNum === 2){
				startClock(getUsedTime()); 	
			}
			
			Q.clearStage(3);
		});

	} , {stage: 3});

	function setupLevel(levelAsset,stage) {
		
		var circle;

		showBar();
    stage.insert(new Q.Player());
    
    Q.state.inc("isMosenterScene",1) ;
    Q.state.set("isMosenter",true);

    circle = Q.stage().insert(new Q.Mos_magic_circle());
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

		level = stage.insert(new Q.Level_bg());

		// Set up the game state
    Q.state.set("level" , 1);
    Q.state.set("isLevelStop" , false);

    Q.stageScene("hud") ;

    setupLevel("level1", stage);
    playVideo(GAME.VIDEO.fight , 1);// Play fight video

    // Set up a listener for when the stage is complete to load the next level
    stage.on("complete",function() {  
    	level.animate({opacity:0},1.5,Q.Easing.Linear,{
    		delay:2,
    		callback:function(){
    			Q.stageScene("winner");  
    		}
    	})
    });

    // Set up a listener for when the stage is losed to lose.
    stage.on("lose",function() {  
    	level.animate({opacity:0},1.5,Q.Easing.Linear,{
    		delay:1,
    		callback:function(){
    			Q.stageScene("gameOver") ;
    		}
    	})
    });
	})

	/*
	Q.scene("level2" , function(stage){
		console.log("level2");

		// 更改 UI.Text
		Q.state.set("level" , 2);
		setupLevel("level2" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("winner"); });
	})
	*/

	// 遊戲結束畫面
	Q.scene("gameOver" , function(stage){
		console.log("Scene: gameOver");

		stopBGM(bgm_heartbeat_slow);
		
		stage.insert(new Q.Sprite({
			asset:"level/gameover_bg.png",
			x: Q.width/2,
			y: Q.height/2
		})) ;

		var goTitle = stage.insert(new Q.Sprite({
			sheet:"level_goTitle_gameover",
			x: Q.width/2,
			y: Q.height/2 - 15,
			scale:1 ,
			opacity:1,
			type: Q.SPRITE_UI
		})) ;

		var goAgain = stage.insert(new Q.Sprite({
			sheet:"level_goAgain_gameover",
			x: Q.width/2,
			y: Q.height/2 + 35,
			scale:1 ,
			opacity:1,
			type: Q.SPRITE_UI
		})) ;

		goTitle.add("tween");
		goAgain.add("tween");

		goTitle.on("touch",function(){ 

			button_click(this);
			stopBGM(bgm_lose);

			Q.audio.play("click.mp3") ;
			Q.stageScene("title")
		});

		goAgain.on("touch",function(){ 
			button_click(this);
			stopBGM(bgm_lose);

			Q.audio.play("click.mp3") ;
			Q.stageScene("level1");
		});

		reset();
	})

	// 遊戲贏家畫面
	Q.scene("winner" , function(stage){

		stopBGM(bgm_mosking);
		stopBGM(bgm_heartbeat_slow);
		playBGM(bgm_winner);

		stage.insert(new Q.Sprite({
			asset:"level/winner_bg.png",
			x: Q.width/2,
			y: Q.height/2
		})) ;

		var goTitle = stage.insert(new Q.Sprite({
			sheet:"level_goTitle_winner",
			x: Q.width/2,
			y: Q.height/2 + 100,
			opacity:1,
			scale:1,
			type: Q.SPRITE_UI
		})) ;

		var goFanspage = stage.insert(new Q.Sprite({
			sheet:"level_goFanspage_winner",
			x: Q.width/2,
			y: Q.height/2 + 150,
			opacity:1,
			scale:1,
			type: Q.SPRITE_UI
		})) ;
		
		goTitle.add("tween");
		goFanspage.add("tween");

		goTitle.on("touch",function(){
			button_click(this);
			stopBGM(Q.state.get("whichBGM"));

			Q.audio.play("click.mp3");
			Q.stageScene("title") ;
		})

		goFanspage.on("touch",function(){
			button_click(this);
			stopBGM(Q.state.get("whichBGM"));

			Q.audio.play("click.mp3");
			Q.stageScene("title") ;
			window.open('https://www.facebook.com/themosquitoman/', '_blank');
		})

		reset();
	})
}