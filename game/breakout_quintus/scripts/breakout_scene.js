;Quintus.BreakoutScenes = function(Q) {

	// 第一頁面
	Q.scene("title" , function(stage){
		console.log("Scene: title");

		// Set up the game state
    Q.state.reset({ score: 0, lives: 3, level: 0 });

		// Clear the hud out
		Q.clearStage(1) ;

		var bg = stage.insert(new Q.Background({ type: Q.SPRITE_UI})) ;
		bg.on("touch", function() {
			Q.stageScene("level1") ;
		});

		stage.insert(new Q.Logo()) ;

		var verb = Q.touchDevice? 'Tap': 'Click' ;

		stage.insert(new Q.UI.Text({
			label: verb + " to start . " ,
			align: "center",
			x: Q.width/2 ,
			y: 280 ,
			weight: "normal",
			size: 20
		}))

		stage.insert(new Q.UI.Text({
			label : "Let's start!" ,
			align: "center" ,
			x: Q.width/2 ,
			y: 370 ,
			weight: "normal" ,
			size: 20
		}))
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

	// hud --> 下面的分數狀態列
	Q.scene("hud" , function(stage){

		// 去 UI 那邊找
		stage.insert(new Q.Score()) ;
		stage.insert(new Q.Lives()) ;
		stage.insert(new Q.Level()) ;
	} , {stage : 1 });

	function setupLevel(levelAsset,stage) {

		// ASK!!  Q.useTiles --> 不知道要幹嗎
    if(Q.useTiles) {
      stage.collisionLayer(new Q.GameTiles());

    } else {
      stage.insert(new Q.Background());
    }

    stage.insert(new Q.BlockTracker({ data: Q.asset(levelAsset) }));

    stage.insert(new Q.Ball({ x: 50, y: 250 }));
    stage.insert(new Q.Countdown());
    stage.insert(new Q.Paddle());

  }

	// 第一關
	Q.scene("level1" , function(stage){

		// Set up the game state
    Q.state.set("level" , 1);

    // Add in hud
    Q.stageScene("hud") ;
    // Call the helper methods to get the 
    // level all set up with blocks, a ball and a paddle
    setupLevel("level1",stage);
    
    // Set up a listener for when the stage is complete to load the next level
    stage.on("complete",function() { Q.stageScene("level2"); });
	})

	// 第二關
	Q.scene("level2" , function(stage){
		// 更改 UI.Text
		Q.state.set("level" , 2);
		setupLevel("level2" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("level3"); });
	})

	// 第三關
	Q.scene("level3" , function(stage){
		// 更改 UI.Text
		Q.state.set("level" , 3);
		setupLevel("level3" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("level4"); });
	})

	// 第四關
	Q.scene("level4" , function(stage){
		// 更改 UI.Text
		Q.state.set("level" , 4);
		setupLevel("level4" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("winner"); });
	})

	// 第五關
	Q.scene("level5" , function(stage){
		// 更改 UI.Text
		Q.state.set("level" , 5);
		setupLevel("level5" , stage) ;
		stage.on("complete" , function(){ Q.stageScene("winner"); });
	})


	// Control Level
	Q.input.on('left' , function(){
		var level = Q.state.get("level") ;

		if(level > 1){
			Q.stageScene("level" + (level - 1)) ;
		}else {
			Q.stageScene('title');
		}
	})

	Q.input.on('right' , function(){
		var level = Q.state.get("level") ;
		console.log(level);

		if (level < 5){
			Q.stageScene('level' + (level + 1)) ;
		}else {
			Q.stageScene('title');
		}
	})
}