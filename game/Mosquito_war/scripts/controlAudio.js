/*
All audio will replay!!!
*/

audioArray = []; 

// Preload
audioArray.push(bgm_opening = document.getElementById("bgm_opening") );
audioArray.push(bgm_ready_start = document.getElementById("bgm_ready_start") );
audioArray.push(bgm_player_man = document.getElementById("bgm_player_man") );

// Not Preload
audioArray.push(bgm_player_mosking = document.getElementById("bgm_player_mosking") );
audioArray.push(bgm_player_mos = document.getElementById("bgm_player_mos") );
audioArray.push(bgm_player_mosG = document.getElementById("bgm_player_mosG") );
audioArray.push(bgm_level1 = document.getElementById("bgm_level1") );
audioArray.push(bgm_mosking = document.getElementById("bgm_mosking") );
audioArray.push(bgm_mos_appear = document.getElementById("bgm_mos_appear") );
audioArray.push(bgm_mosG_appear = document.getElementById("bgm_mosG_appear") );
audioArray.push(bgm_heartbeat_slow = document.getElementById("bgm_heartbeat_slow") );
// audioArray.push(bgm_heartbeat_quick = document.getElementById("bgm_heartbeat_quick") );
audioArray.push(bgm_lose = document.getElementById("bgm_lose") );
audioArray.push(bgm_winner = document.getElementById("bgm_winner") );

/*
	Safari don't accept 默認參數，所以用另一種形式
	ex: a = a || 1 ;
*/

function playBGM(audio , volume , state){
	/*
		audio:  audio identifier
		volum: control volumn
		state: whether it is sub  bgm ( if sub , that set 'false')
	*/

	volume = volume || 1 ;
	state = state || true;

	audio.play();
	audio.volume = volume ;
	if(state)
		Q.state.set("whichBGM",audio);
}

function stopBGM(audio , state ){
	state = state || 'restart';
	audio.pause();

	if(state == 'restart')
		audio.currentTime = 0;
	else if (state = 'continue')
		;
}

function loadAllAudio(){
	for(var i = 0 ; i < audioArray.length ; i ++){
		// // 已經preload
		// if(i == 0 || i == 1 || i == 2)
		// 	;
		// else
		audioArray[i].load();

		audioArray[i].addEventListener("ended",function(){
			this.currentTime = 0 ;
			this.play();
		})
	}
}