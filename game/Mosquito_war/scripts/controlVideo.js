/*

video_mosking_appear : The mosking Appear!

*/

// Contro Video Input ;
videoArray = [] ;

// List All Video
videoArray.push(video_mosking_appear = document.getElementById("video_mosking_appear") );

function playVideo(video){
	video.style.zIndex=1;
	video.style.opacity=1;

	video.play();
}

function hidden(video){
	video.style.zIndex=0;
	video.style.opacity=0;
}

function loadAllVideo(){
	console.log(videoArray);
	for (i = 0 ; i < videoArray.length ; i++){
		videoArray[i].load();
		videoArray[i].addEventListener("ended",function() { hidden(this); });
	}
}