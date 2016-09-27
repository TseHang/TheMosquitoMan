/*

video_mosking_appear : The mosking Appear!

*/

// Contro Video Input ;
videoArray = [] ;

// List All Video
videoArray.push(video_mosking_appear = document.getElementById("video_mosking_appear") );
videoArray.push(video_fight = document.getElementById("video_fight") );

function playVideo(video){
	
	Q.stage().paused = true;

	video.style.display="block";
	video.style.zIndex=1;
	video.style.opacity=1;

	// hidden the timeBar
	hiddenBar();
	video.play();

	Q.state.set("is_video_over",false);
}

function hidden(video){

	video.style.display="none";
	video.style.zIndex=0;
	video.style.opacity=0;

	showBar(); // show the timeBar
	Q.stage().paused = false;
	
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
				starClock(); // Start Timebar

			}else if(this == video_mosking_appear){
				Q.stageScene("countdown");
				Q.state.set("is_countdown_over",false);
			}

		});
	}
}
