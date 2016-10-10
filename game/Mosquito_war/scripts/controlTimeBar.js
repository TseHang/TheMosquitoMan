function afterTime(){
  var timeNow = new Date();
  var timeDiff = timeNow.getTime() - GAME.TIMEBAR.now.getTime() ; //get diff seconds

  return (timeDiff/1000); // Return SECONDS after start time
}

function resultGetTimes(lastUsedTime){
  GAME.TIMEBAR.remainSecs = GAME.TIMEBAR.allSecs - afterTime() - lastUsedTime; // remain secends

  var min = Math.floor(GAME.TIMEBAR.remainSecs/60) +"" ; //--> String 
  var sec = parseInt( GAME.TIMEBAR.remainSecs - (min*60))+""; //--> String

  if(min < 0){
    Q.stageScene("gameOver");
  }else{
    while( min.length < 2){ min = '0'+min};
    while( sec.length < 2){ sec = '0'+sec};
    
    GAME.ADD.result.innerHTML= min + " : "+sec;
    GAME.TIMEBAR.timeBarFlag = window.setTimeout('resultGetTimes('+lastUsedTime +')',1000);

    updateBar();
  }
}

function updateBar(){
  var usedTime = GAME.TIMEBAR.remainSecs / GAME.TIMEBAR.allSecs ;
  GAME.ADD.inner_bar.style.width = usedTime*100 +"%";
}

function stopTimeBar(){
  clearInterval(GAME.TIMEBAR.timeBarFlag);
}

function getUsedTime(){
  return GAME.TIMEBAR.allSecs - GAME.TIMEBAR.remainSecs;
}

function showBar(){
  GAME.ADD.bar.style.display="block";
}

function hiddenBar(){
  GAME.ADD.bar.style.display="none";
}

function startClock(lastUsedTime){
  /*
    the 'startClock' fun. will start TimeBar(),
    and this is called ahfter trigger "countdown_over" first time
  */

  GAME.TIMEBAR.now  = new Date() ; // update now time
  resultGetTimes(lastUsedTime);
  GAME.ADD.bar.style.display="block";
}
