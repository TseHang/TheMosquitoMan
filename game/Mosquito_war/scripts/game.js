/*
	
*/
var quintus_container ;
var bar ; // Global
var result ;// Global 
var inner_bar ;// Global
var skip_btn ;

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
		"sprite.png","logo.png","animate_sprite.png","player_mos_rotate_sprite.png",

		// landing
		"landing/landing_bg_long.png","landing/landing_btn_start.png", "landing/landing_btn_player.png" ,
		"landing/intro_bg.png","landing/intro_man.png","landing/intro_btn_go.png","landing/intro_btn_howplay.png",
		"landing/game_description_bg.png",

		// player
		"player/player_mos_bg.png","player/player_mosking_bg.png","player/player_man_bg.png",
		"player/player_mos.png","player/player_mosG_bg.png",
		"player/player_man_text1.png","player/player_man_text2.png","player/player_man_text3.png","player/player_man_text4.png",

		// level
		"level/level_bg.png","level/gameover_bg.png","level/winner_bg.png",
		"level/mosking_talk_2.png","level/mosking_talk_3.png","level/mos_magic_circle.png",

		// katha
		"katha/katha_1_bg.png","katha/katha_1_title.png","katha/katha_close.png",
		"katha/katha_2_bg.png","katha/katha_2_title.png",
		"katha/katha_3_bg.png","katha/katha_3_title.png",

		// Sound
		"power_collide.ogg","click.mp3","countdown.mp3","countdown_final.mp3",
		"mos_scream.mp3","mosking_scream.mp3","mosG_scream.mp3","change_scene.mp3","speedup.mp3",
		"player_invincible_attack.mp3","player_invincible.mp3","player_powerup.mp3","powerUp.mp3",
		"damage.mp3","player_hurt.mp3","blood_bubble_broken.mp3","katha_drop.mp3",
		"kick.mp3","player_ha.mp3","mosking_hurt.mp3","mosking_die_roar.mp3",
		
		// Data
		"level.tmx" , "sprites.json","animate.json","player_mos_rotate.json"
		] , function(){
			Q.useTiles = window.location.href.indexOf('usetiles') > -1 ;

			// Set all sprites sheets
			Q.compileSheets("sprite.png" , "sprites.json") ;
			Q.compileSheets("animate_sprite.png" , "animate.json") ;
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
      Q.animations("player_right" , {
      	click: {frames:[0,1,0] , rate: 0.2 , loop:false }
      })
      Q.animations("player_left" , {
      	click: {frames:[0,1,0] , rate: 0.2 , loop:false }
      })
      Q.animations("mosking_anim", { 
        default: { frames: [ 0,1,2,3,4,5,6,4,2,1], rate: 0.3,  loop: true }
      });
      Q.animations("pre_power" , {
      	shoot: { frames: [0,1] , rate:0.3 , loop: false}
      })
      Q.animations("pre_power_up" , {
      	shoot: { frames: [0,1,2,3] , rate:0.5 , loop: false}
      })

      Q.animations("player_speedup" , {
      	default: {frames:[0,1,2,3] , rate:0.4 , loop:true}
      })

      Q.animations("moskingattack",{
      	disappear: {frames:[0,1,2,3,4], rate:0.1 ,loop:false,trigger:"disappear"}
      })

			Q.stageScene("title");
		})

	// Q.debug =  true ;

	quintus_container = document.getElementById("quintus_container");
	skip_btn = document.getElementById("skip_btn") ;

	bar = document.createElement("DIV") ; // Global
	result = document.createElement("DIV");// Global 
	inner_bar = document.createElement("DIV") ;// Global

	bar.setAttribute("class", "bar");
	inner_bar.setAttribute("id" , "inner_bar")
	result.setAttribute("id","result");

	result.innerHTML= "05 : 00";
	
	bar.appendChild(inner_bar);
	bar.appendChild(result);

	quintus_container.appendChild(bar);

	skip_btn.addEventListener("mouseover",function(){ skip_btn.innerHTML = "SKIP";})
	skip_btn.addEventListener("mouseout",function(){ skip_btn.innerHTML = "⥤";})
	
	skip_btn.addEventListener("click",function(){

		if(isOpening){
			video_opening.currentTime = video_opening.duration; // skip button 
		}
		else{
			var num = Q.state.get("video_num");
			videoArray[num - 1].currentTime = videoArray[num - 1].duration; // skip button 
		}
	})

	window.Q = Q ;
	
	console.log("gameJS Loading");
} , true);
