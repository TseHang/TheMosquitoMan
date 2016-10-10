/*
All BGM will replay!!!
*/

// Not Preload
(function(){
	GAME.AUDIO.audioArray.push(bgm_opening = document.getElementById("bgm_opening") );
	GAME.AUDIO.audioArray.push(bgm_ready_start = document.getElementById("bgm_ready_start") );
	GAME.AUDIO.audioArray.push(bgm_player_man = document.getElementById("bgm_player_man") );
	GAME.AUDIO.audioArray.push(bgm_player_mosking = document.getElementById("bgm_player_mosking") );
	GAME.AUDIO.audioArray.push(bgm_player_mos = document.getElementById("bgm_player_mos") );
	GAME.AUDIO.audioArray.push(bgm_player_mosG = document.getElementById("bgm_player_mosG") );
	GAME.AUDIO.audioArray.push(bgm_level1 = document.getElementById("bgm_level1") );
	GAME.AUDIO.audioArray.push(bgm_mosking = document.getElementById("bgm_mosking") );
	GAME.AUDIO.audioArray.push(bgm_mos_appear = document.getElementById("bgm_mos_appear") );
	GAME.AUDIO.audioArray.push(bgm_mosG_appear = document.getElementById("bgm_mosG_appear") );
	GAME.AUDIO.audioArray.push(bgm_heartbeat_slow = document.getElementById("bgm_heartbeat_slow") );
	GAME.AUDIO.audioArray.push(bgm_lose = document.getElementById("bgm_lose") );
	GAME.AUDIO.audioArray.push(bgm_winner = document.getElementById("bgm_winner") );
})();

function playBGM(audio , volume , state){
	/*
		Safari don't accept 默認參數，所以用另一種形式
		ex: a = a || 1 ;

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
	for(var i = 0 ; i < GAME.AUDIO.audioArray.length ; i ++){
		GAME.AUDIO.audioArray[i].load();
		GAME.AUDIO.audioArray[i].addEventListener("ended",function(){
			this.currentTime = 0 ;
			this.play();
		})
	}
}