/*
GAME.video.opening : OPENING video
GAME.video.fight : FIGHT video
GAME.video.mosking_appear : MOSKING_APPEAR video
GAME.video.skip_btn : SKIP_BTN button
*/

(function(){
	GAME.VIDEO.videoArray.push(GAME.VIDEO.fight);
	GAME.VIDEO.videoArray.push(GAME.VIDEO.mosking_appear);

	GAME.VIDEO.skip_btn.addEventListener("mouseover",function(){ GAME.VIDEO.skip_btn.innerHTML = "SKIP";}) ;
	GAME.VIDEO.skip_btn.addEventListener("mouseout",function(){ GAME.VIDEO.skip_btn.innerHTML = "⥤";}) ;
	GAME.VIDEO.skip_btn.addEventListener("click",function(){
		if(GAME.VIDEO.isOpening){
			GAME.VIDEO.opening.currentTime = GAME.VIDEO.opening.duration; // skip button 
		}
		else{
			var num = Q.state.get("video_num");
			GAME.VIDEO.videoArray[num - 1].currentTime = GAME.VIDEO.videoArray[num - 1].duration; // skip button 
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

	console.log("All Audio Video Loading Over");
	GAME.VIDEO.opening.removeEventListener("canplay",canplayHandler,false);
}

function playVideo(video,num){
	Q.state.set("video_num",num);
	Q.state.set("is_video_over",false);
	Q.play("change_scene.mp3");

	video.style.display="block";
	video.style.zIndex=1;
	video.style.opacity=1;

	GAME.ADD.quintus_container.style.zIndex = -1 ;
	GAME.VIDEO.skip_btn.style.display = "block";

	// hidden the timeBar
	stageStop();
	hiddenBar();
	video.play();
}

function hidden(video){

	video.style.display="none";
	video.style.zIndex=0;
	video.style.opacity=0;

	GAME.ADD.quintus_container.style.zIndex = 1 ;
	GAME.VIDEO.skip_btn.style.display = "none";

	showBar(); // show the timeBar

	// REMBER don't need to startClock , cuz we have to wait countdown over
	Q.stage().paused = false ;
	Q.state.set("is_video_over",true);
}

 function loadAllVideo(){
	// console.log(videoArray);
	for (i = 0 ; i < GAME.VIDEO.videoArray.length ; i++){
		
		GAME.VIDEO.videoArray[i].load();
		GAME.VIDEO.videoArray[i].addEventListener("ended",function() {
			
			hidden(this); 
			if (this == video_fight){
				Q.stageScene("countdown");
				Q.state.set("is_countdown_over",false);

				playBGM(bgm_level1,1) ;

			}else if(this == video_mosking_appear){

				Q.stageScene("countdown");
				Q.state.set("is_countdown_over",false);

				playBGM(bgm_mosking);
			}
		});
	}
}