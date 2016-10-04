/*

video_mosking_appear : The mosking Appear!

*/

// Contro Video Input ;
videoArray = [] ;

// List All Video（ Don't push opening video , cuz it's will reloading , and errpr )
videoArray.push(video_fight = document.getElementById("video_fight") );
videoArray.push(video_mosking_appear = document.getElementById("video_mosking_appear") );

function playVideo(video){
	
	Q.stage().paused = true;

	video.style.display="block";
	video.style.zIndex=1;
	video.style.opacity=1;

	skip_btn.style.display = "block";

	// hidden the timeBar
	hiddenBar();
	video.play();

	Q.state.set("is_video_over",false);
}

function hidden(video){

	video.style.display="none";
	video.style.zIndex=0;
	video.style.opacity=0;

	skip_btn.style.display = "none";

	showBar(); // show the timeBar
	Q.stage().paused = false;
	
	Q.state.set("is_video_over",true);
}

function loadAllVideo(){
	console.log(videoArray);
	for (i = 0 ; i < videoArray.length ; i++){
		if(i==0)
			; // video_fight 已經loada
		else
			videoArray[i].load();
		
		videoArray[i].addEventListener("ended",function() {
			hidden(this); 
			
			if (this == video_fight){
				Q.stageScene("countdown");
				Q.state.set("is_countdown_over",false);
				starClock(); // Start Timebar

				playBGM(bgm_level1,1) ;

			}else if(this == video_mosking_appear){
				Q.stageScene("countdown");
				Q.state.set("is_countdown_over",false);
				
				playBGM(bgm_mosking);
			}
		});
	}
}