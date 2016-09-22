/*
如果讓人動的話，
(1)那麼攻擊到底要用空白鍵?
(2)還是繼續點擊呢？

*/
window.addEventListener('load',function(){
	var Q = Quintus().include('Sprites , Scenes , Input , Anim , 2D , Audio , Touch , UI')
			.include('EnemySprites , PlayerSprites , KathaSprites , WarScenes , LandingUI , LevelUI , WarLevels')
			.enableSound()
			.setup({
				// scaleToFit: true,
				width:530 ,
				height: 550,
				upsampleWidth: 318,  // Double the pixel density of the 
  			upsampleHeight: 330 , 
				downsampleWidth: 901,
				downsampleHeight: 935,
				scaleToFit: true
			})
			.touch();

  Q.input.keyboardControls();

	Q.load([
		// Images
		"sprite.png","logo.png","animate_sprites.png","player_mos_rotate_sprite.png",

		// landing
		"landing/landing_bg_long.png","landing/landing_btn_start.png", "landing/landing_btn_player.png" ,
		"landing/intro_bg.png","landing/intro_man.png","landing/intro_btn_go.png","landing/intro_btn_howplay.png",
		"landing/game_description_bg.png",

		// player
		"player/player_mos_bg.png","player/player_mosking_bg.png","player/player_man_bg.png",
		"player/player_mos.png",
		"player/player_man_text1.png","player/player_man_text2.png","player/player_man_text3.png","player/player_man_text4.png",

		// level
		"level/level_bg.png",

		// katha
		"katha/katha_1_bg.png","katha/katha_1_title.png","katha/katha_close.png",

		// Sound
		"brickDeath.ogg",
		
		// Data
		"level.tmx" , "sprites.json","animate.json","player_mos_rotate.json"
		] , function(){
			Q.useTiles = window.location.href.indexOf('usetiles') > -1 ;

			// Set all sprites sheets
			Q.compileSheets("sprite.png" , "sprites.json") ;
			Q.compileSheets("animate_sprites.png" , "animate.json") ;
			Q.compileSheets("player_mos_rotate_sprite.png" , "player_mos_rotate.json") ;

			// Now add in the animations for the various sprites
			Q.animations("player_man_man", { 
        default: { frames: [ 0,1,2,3 ], rate: 1,  trigger:"startRotate",loop: false }
      });
			Q.animations("player_man_rotate", { 
        rotate: { frames: [ 2,1,0 ], rate: 0.3,  loop: true }
      });
      Q.animations("player_mos_rotate", { 
        rotate: { frames: [ 0,1,2,3,4,5,6,7,8 ], rate: 0.3,  loop: true }
      });
      Q.animations("mosking_anim", { 
        default: { frames: [ 0,1,2,3 ], rate: 0.5,  loop: true }
      });
      Q.animations("pre_power" , {
      	shoot: { frames: [0,1] , rate:0.3 , loop: false}
      })
      Q.animations("pre_power_up" , {
      	shoot: { frames: [0,1,2,3] , rate:0.5 , loop: false}
      })

			// Go Time
			Q.stageScene("title");
		})

	// Q.debug = true ;

	window.Q = Q ;
} , true);