var now  = new Date() ;
var allSecs = 300 ; // add 1 sec to wait 
var remainSecs = 300; // remainSeconds
var timeBarFlag ;

function afterTime(){
  var timeNow = new Date();
  var timeDiff = timeNow.getTime() - now.getTime() ; //get diff seconds

  return (timeDiff/1000); // Return SECONDS after start time
}

function resultGetTimes(lastUsedTime){
  remainSecs = allSecs - afterTime() - lastUsedTime; // remain secends

  var min = Math.floor(remainSecs/60) +"" ; //--> String 
  var sec = parseInt( remainSecs - (min*60))+""; //--> String

  if(min < 0){
    Q.stageScene("gameOver");
  }else{
    while( min.length < 2){ min = '0'+min};
    while( sec.length < 2){ sec = '0'+sec};
    
    result.innerHTML= min + " : "+sec;
    updateBar();

    timeBarFlag = window.setTimeout('resultGetTimes('+lastUsedTime +')',1000);
  }
}

function updateBar(){
  var usedTime = remainSecs/allSecs ;
  inner_bar.style.width = usedTime*100 +"%";
}

function stopTimeBar(){
  clearInterval(timeBarFlag);
}

/*
  the 'startClock' fun. will start TimeBar(),
  and this is called ahfter trigger "countdown_over" first time
*/
function startClock(lastUsedTime){
  // update now time
  now  = new Date() ;
  resultGetTimes(lastUsedTime);
  bar.style.display="block";
}


