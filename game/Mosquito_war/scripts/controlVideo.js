/*

video_mosking_appear : The mosking Appear!

*/

// Contro Video Input ;
var videoArray = [] ;
var isOpening = false ;
var video_opening = document.getElementById("video_opening") ;

// List All Video（ Don't push opening video , cuz it don't need to reload )
videoArray.push(video_fight = document.getElementById("video_fight") );
videoArray.push(video_mosking_appear = document.getElementById("video_mosking_appear") );

// When video_opening canplay , then loading start !
video_opening.addEventListener("canplay",canplayHandler,false);
video_opening.addEventListener("ended",function(){

	this.style.display="none";
	this.style.zIndex=0;
	this.style.opacity=0;

	quintus_container.style.zIndex = 1 ;
	skip_btn.style.display = "none";

	isOpening = false ;
	playBGM(bgm_opening ,1);
	console.log("video_opening_ended");

},false)

function canplayHandler(){
	console.log("start opening video");
	
	this.style.display="block";
	this.style.zIndex=1;
	this.style.opacity=1;

	isOpening = true ;
	loadAllVideo();// loadAllVideo
	loadAllAudio();// loadAllaudio

	console.log("All Audio Video Loading Over");
	video_opening.removeEventListener("canplay",canplayHandler,false);
}

function playVideo(video){
	Q.play("change_scene.mp3");

	video.style.display="block";
	video.style.zIndex=1;
	video.style.opacity=1;

	quintus_container.style.zIndex = -1 ;
	skip_btn.style.display = "block";

	// hidden the timeBar
	stageStop();
	hiddenBar();
	video.play();

	Q.state.set("is_video_over",false);
}

function hidden(video){

	video.style.display="none";
	video.style.zIndex=0;
	video.style.opacity=0;

	quintus_container.style.zIndex = 1 ;
	skip_btn.style.display = "none";

	showBar(); // show the timeBar

	// Don't need to startClock , cuz we have to wait countdown over
	Q.stage().paused = false ;
	
	Q.state.set("is_video_over",true);
}

function loadAllVideo(){
	console.log(videoArray);
	for (i = 0 ; i < videoArray.length ; i++){
		
		videoArray[i].load();
		videoArray[i].addEventListener("ended",function() {
			
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