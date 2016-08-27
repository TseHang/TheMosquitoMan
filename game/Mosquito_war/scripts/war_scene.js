/*

STATE: 
1: score分數！
2: lives 生命！
3: level 關卡
4: katha 指吃到哪一個奧義的編號（用來顯示捲軸）
5: player_state 角色介紹編號（1:掌蚊人，2:蚊子王，3:蚊子） 
6: power_up 控制攻擊泡泡，有沒有變大
7: player_h 主角的身長
-
 */
;Quintus.WarScenes = function(Q) {
	var powerTimeInterval ;

	// 第一頁面
	Q.scene("title" , function(stage){
		console.log("Scene: title");

		// Set up the game state
    Q.state.reset({ player_h: 0 , score: 0, lives: 3, level: 0 , katha: 0 , player_state: 1 , power_up: 0});

		// Clear the hud out
		Q.clearStage(1) ;

		var bg = stage.insert(new Q.Background()) ;
		var landing_logo = stage.insert(new Q.Logo()) ;
		var landing_play = stage.insert(new Q.Landing_play());
		var landing_story = stage.insert(new Q.Landing_story());

		// ＊＊＊＊＊＊
		// 開始玩遊戲!!
		// ＊＊＊＊＊＊
		landing_play.on('touch' , function(){
			
			// 移動背景
			bg.animate({ cy: Q.height/2 }, 1, Q.Easing.Quadratic.InOut , {
				callback: function(){Q.stageScene("introStory");}
			});

			// 消失 LOGO
			landing_logo.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;

			// 消失按鍵
			landing_play.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
			landing_story.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
		});

		// ＊＊＊＊＊＊
		// 角色說明!!
		// ＊＊＊＊＊＊
		landing_story.on('touch' , function(){
			
			// 消失背景
			bg.animate({ opacity: 0 }, 1, Q.Easing.Quadratic.InOut);

			// 消失 LOGO
			landing_logo.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut , {
				callback: function(){Q.stageScene("introPlayerMan");}
			}) ;

			// 消失按鍵
			landing_play.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
			landing_story.animate({ opacity: 0 }, 0.5 , Q.Easing.Quadratic.InOut) ;
		});
	})

	Q.scene("introStory" , function(stage){

		// 介紹故事
		console.log("Scene: introStory");
		var intro_bg = stage.insert(new Q.IntroBg()) ;
		var intro_man = stage.insert(new Q.IntroMan()) ;
		var intro_text = stage.insert(new Q.IntroText()) ;
		var intro_txet_click = stage.insert(new Q.IntroTextClick());

		intro_bg.on("touch" , function(){
			
			// console.log("11");
			intro_bg.animate({opacity: 0} , 1 , Q.Easing.Linear ) ;
			intro_text.animate({opacity: 0} , 0.5 , Q.Easing.Linear , {
				callback: function(){Q.stageScene("level1")}
			}) ;
			intro_txet_click.animate({opacity: 0 }, 0.5 ,  Q.Easing.Linear);

			intro_man.animate({scale: 0} , 0.3 , Q.Easing.Quadratic.InOut , {
				callback: function(){ this.destroy(); }
			}) ;
		})

	} );

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

		// SET player_state = 1
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
		player_state = Q.state.get("player_state");

		right = stage.insert(new Q.PlayerRight());
		left = stage.insert(new Q.PlayerLeft());
		back = stage.insert(new Q.PlayerBack());

		right.on("touch" , function(){
			if(player_state == 1){
				Q.stageScene("introPlayerMosking");
			}else if(player_state == 2){
				Q.stageScene("introPlayerMos");
			}else if (player_state == 3){
				Q.stageScene("introPlayerMan")
			}
		})

		left.on("touch" , function(){
			if(player_state == 1){
				Q.stageScene("introPlayerMos");
			}else if(player_state == 2){
				Q.stageScene("introPlayerMan");
			}else if (player_state == 3){
				Q.stageScene("introPlayerMosking")
			}
		})

		back.on("touch" , function(){
			Q.stageScene("title") ;
		})

	} , {stage: 1});

	Q.scene("katha" , function(stage){                  
		// kathaNum 會再吃到捲軸的時候被設定！
		var kathaNum = Q.state.get("katha");

		if (kathaNum == 1){
			stage.insert(new Q.Katha_1_bg());
			stage.insert(new Q.Katha_1_text());
			btn = stage.insert(new Q.Katha_close_btn());
		}
		else{
			console.log("You Wrong");
		}

		// 按鈕
		btn.on("touch" , function(){

			Q.state.set("katha" , 0);
			Q.stage().paused = false;

			// 讓大球失效
			window.setTimeout(function(){
				Q("Power").trigger("power_recover");
			},10000);
			
			// Clear the katha
			Q.clearStage(2) ;
		})

	},{ stage: 2});

	// hud --> 下面的分數狀態列
	Q.scene("hud" , function(stage){

		// 去 UI 那邊找
		stage.insert(new Q.Score()) ;
		stage.insert(new Q.Lives()) ;
		stage.insert(new Q.Level()) ;
	} , {stage : 1 });

	function setupLevel(levelAsset,stage) {

		// ASK!!  Q.useTiles --> 不知道要幹嗎(可能是用bg.tmx的意思)
    if(Q.useTiles) {
      stage.collisionLayer(new Q.GameTiles());
    } else {
      stage.insert(new Q.Level_bg());
    }
    stage.insert(new Q.Player());
    stage.insert(new Q.MosquitoTracker({ data: Q.asset(levelAsset) }));

    // 每一秒設一次球
    // powerTimeInterval = window.setInterval(function(){
    // 	stage.insert(new Q.Power());
    // },1000)

  }

	// 第一關
	Q.scene("level1" , function(stage){

		// Set up the game state
    Q.state.set("level" , 1);

    // Add in hud
    Q.stageScene("hud") ;

    // Call the helper methods to get the level all set up with blocks, a ball and a paddle
    setupLevel("level1", stage);
    
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
		stage.on("complete" , function(){ Q.stageScene("level4"); });
	})

	// 第四關
	Q.scene("level4" , function(stage){
		console.log("level4");

		// 更改 UI.Text
		Q.state.set("level" , 4);
		setupLevel("level4" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("level5"); });
	})

	// 第五關
	Q.scene("level5" , function(stage){
		console.log("level5");

		// 更改 UI.Text
		Q.state.set("level" , 5);
		setupLevel("level5" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("winner"); });
	})

	// 遊戲結束畫面
	Q.scene("gameOver" , function(stage){
		console.log("Scene: gameOver");

		var bg = stage.insert(new Q.Background({ type: Q.SPRITE_UI})) ;
		bg.on("touch", function() {
			Q.stageScene("title") ;
		});

		stage.insert(new Q.Logo()) ;

		stage.insert(new Q.UI.Text({
			label : "Game Over" ,
			align: "center" ,
			x: Q.width/2 ,
			y: 350 ,
			weight: "normal" ,
			size: 20
		}))
	})

	// 遊戲贏家畫面
	Q.scene("winner" , function(stage){
		console.log("Scene: winner");

		var bg = stage.insert(new Q.Background({ type: Q.SPRITE_UI})) ;
		bg.on("touch", function() {
			Q.stageScene("title") ;
		});

		stage.insert(new Q.Logo()) ;

		stage.insert(new Q.UI.Text({
			label : "You Win~" ,
			align: "center" ,
			x: Q.width/2 ,
			y: 300 ,
			weight: "bold" ,
			size: 40
		}))
	})

}