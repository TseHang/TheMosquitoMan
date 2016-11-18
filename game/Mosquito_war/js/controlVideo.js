/*
GAME.video.opening : OPENING video
GAME.video.fight : FIGHT video
GAME.video.mosking_appear : MOSKING_APPEAR video
GAME.video.skip_btn : SKIP_BTN button
*/

(function(){
	GAME.VIDEO.videoArray.push(GAME.VIDEO.fight);
	GAME.VIDEO.videoArray.push(GAME.VIDEO.mosking_appear);
	GAME.VIDEO.videoArray.push(GAME.VIDEO.winnerB);
	GAME.VIDEO.videoArray.push(GAME.VIDEO.winnerA);
	GAME.VIDEO.videoArray.push(GAME.VIDEO.winnerS);

	GAME.VIDEO.skip_btn.addEventListener("mouseover",function(){ GAME.VIDEO.skip_btn.innerHTML = "SKIP";}) ;
	GAME.VIDEO.skip_btn.addEventListener("mouseout",function(){ GAME.VIDEO.skip_btn.innerHTML = "⥤";}) ;
	GAME.VIDEO.skip_btn.addEventListener("click",function(){
		if(GAME.VIDEO.isOpening){
			GAME.VIDEO.opening.currentTime = GAME.VIDEO.opening.duration; // skip button 
		}
		else{
			var videoNum = Q.state.get("video_num");
			GAME.VIDEO.videoArray[videoNum - 1].currentTime = GAME.VIDEO.videoArray[videoNum - 1].duration; // skip button 
		}
	}) ;

	// When video_opening canplay , then loading start !
	GAME.VIDEO.opening.addEventListener("canplay",canplayHandler,false);
	GAME.VIDEO.opening.addEventListener("ended",function(){

		this.style.display="none";
		this.style.zIndex=0;
		this.style.opacity=0;

		GAME.ADD.quintus_container.style.zIndex = 1 ;
		
		GAME.VIDEO.skip_btn.style.display = "none";
		GAME.VIDEO.isOpening = false ;

		playBGM(bgm_opening ,1);

		console.log("video_opening_ended");
	},false) ;

})() ;

function canplayHandler(){
	console.log("start opening video");
	this.style.display="block";
	this.style.zIndex=1;
	this.style.opacity=1;

	GAME.VIDEO.skip_btn.style.display = "block";

	loadAllVideo();// loadAllVideo
	loadAllAudio();// loadAllaudio

	console.log("All Audio and Video Loading Over!!");
	GAME.VIDEO.opening.removeEventListener("canplay",canplayHandler,false);
}

function playVideo(video, num){
	Q.state.set("video_num", num);
	Q.state.set("is_video_over", false);
	Q.audio.play("change_scene.mp3");
	
	// 消掉針、氣功彈
	Q('MosAttack').trigger('disappear');
	Q('Power').trigger('disappear');

	video.style.display="block";
	video.style.zIndex=1;
	video.style.opacity=1;

	GAME.ADD.quintus_container.style.zIndex = -1 ;
	GAME.VIDEO.skip_btn.style.display = "block";

	stageStop();
	hiddenBar();
	video.play();
}


function loadAllVideo(){
  GAME.VIDEO.videoArray.forEach(function(value, index){
    value.load();
    value.addEventListener("ended",function() {

      hiddenVideo(this); 
      if (index === 0){
        Q.stageScene("countdown");
        Q.state.set("is_countdown_over",false);

        playBGM(bgm_level1, 1);

      }else if(index === 1){

        Q.stageScene("countdown");
        Q.state.set("is_countdown_over",false);

        playBGM(bgm_mosking);
      }
    });
  })

	function hiddenVideo(video){

		video.style.display="none";
		video.style.zIndex=0;
		video.style.opacity=0;

		GAME.ADD.quintus_container.style.zIndex = 1 ;
		GAME.VIDEO.skip_btn.style.display = "none";

    if(video === GAME.VIDEO.fight || video === GAME.VIDEO.mosking_appear)
      showBar(); // show the timeBar

		// REMEMBER don't need to startClock , cuz we have to wait countdown over
		Q.stage().paused = false ;
		Q.state.set("is_video_over",true);
	}
}