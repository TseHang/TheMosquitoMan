var GAME = {
	VIDEO: {},
	AUDIO: {},
	TIMEBAR: {},
	ADD: {},
	ENEMY: {},
	PLAYER: {},
	kathaTimer:[],
	rank:[]
};

/*
	videoArray: cuz opening isn't put in videoArray, so GAME.VIDEO.fight is videoArray[0]... and so on...
*/
GAME.VIDEO = {
	"isOpening": true ,
	"opening": document.getElementById("video_opening") , 
	"fight": document.getElementById("video_fight") , 
	"mosking_appear": document.getElementById("video_mosking_appear"),
	"winnerB": document.getElementById("video_winnerB"),
	"winnerA": document.getElementById("video_winnerA"),
	"winnerS": document.getElementById("video_winnerS"),
	"skip_btn":document.getElementById("skip_btn") ,
	"videoArray": []
};

GAME.AUDIO = {
	"audioArray": []
};

GAME.TIMEBAR = {
	"now": new Date(),
	"allSecs": 300 ,
	"remainSecs": 300 , 
	"timeBarFlag": null 
};

GAME.ADD = {
	"quintus_container": null,
	"bar": null ,
	"result":null ,
	"inner_bar": null,
	"input_name": null,
	"winner_name": null,
	"winner_time": null,
	"state": document.getElementById('state'),
}

// attackTimer: 針出現的 Timer
// k_attack_5 : 蚊子王的血泡
GAME.ENEMY = {
	"attackTimer": [],
	"k_attackTimer": [] ,
	"k_attack_5" : [],
	"mosId" : 0 ,
	"k_attackId" : 0,
	"RATE_mosAttack":6,
	"RATE_moskingAttack":5,
	"mosSpeed":100
}

GAME.PLAYER = {
	"mos_addCount": 2 ,
	"moveSpeed": 3,
	"life":[]
}

function resetAttackTimer(){
	// 把沒打死的蚊子，所有計時器停掉
	GAME.ENEMY.attackTimer.forEach(function(value){
		clearInterval(value);
	})
	GAME.ENEMY.k_attackTimer.forEach(function(value){
		clearInterval(value);
	})

  // 初始化 attackTimer(射蚊子的針用的)、k_attackTimer
  // 把length = 0 是清空同一個記憶體，若是指定為 [] ，其實舊有資料還是存在，只是另外配給一段記憶體給新陣列
  GAME.ENEMY.attackTimer.length = 0; 
  GAME.ENEMY.k_attackTimer.length = 0;
  GAME.ENEMY.k_attack_5.length = 0;
  GAME.ENEMY.mosId = 0;
  GAME.ENEMY.k_attackId = 0;
}

function reset() {

	resetAttackTimer();
	resetTimeBar();

  // 消除level 下面那條
	Q.clearStage(1) ;
	Q.clearStage(4) ;

	// Update Q.state
	Q.state.set({
		mosking_life: 10,
		lives: 4,
		isPlayerAttack:false ,
		isMosenter:false,
		isMosenterScene:0
	});// reset mosking life

	GAME.PLAYER.mos_addCount = 2; 
	GAME.PLAYER.moveSpeed = 3 ;
	GAME.PLAYER.life.length = 0 ;

	GAME.kathaTimer.forEach(function(value){
		clearInterval(value);
		GAME.kathaTimer.length = 0;
	}) 
}


function mosBloodEnter(stage, random , y) {

  var circle = stage.insert(new Q.Mos_magic_circle({y:220}));

  circle.animate({ scale: 1, opacity: 1 }, 0.3, Q.Easing.Quadratic.InOut, {
    callback: function() {
      GAME.ENEMY.k_attack_5.length = 0 ;
      this.stage.insert(new Q.MosquitoTracker({ data: Q.asset("addKingattack_s_"+random), y: y ,direct: "down"}));
      this.animate({ opacity: 0 }, 0.5, Q.Easing.Linear, {
        delay: 0.5,
        callback: function() { this.destroy(); }
      })
    }
  });
}

function dropKatha(stage,obj,rate) {
  // 掉寶物(記得調倍率)
  var rand = Math.round(Math.random() * rate);

  if (rand == 1 && Q("Katha_1").length == 0 && !Q.state.get("iskatha1")) {
    stage.insert(new Q.Katha_1({
      x: obj.c.x,
      y: obj.c.y
    }));
  } else if (rand == 2 && Q('Katha_2').length == 0 && !Q.state.get("iskatha2")) {
    stage.insert(new Q.Katha_2({
      x: obj.c.x,
      y: obj.c.y
    }));
  } else if (rand == 3 && Q('Katha_3').length == 0 && !Q.state.get("iskatha3")) {
    stage.insert(new Q.Katha_3({
      x: obj.c.x,
      y: obj.c.y
    }));
  }
}

function button_click(obj){
	obj.animate({opacity:0.3,scale:0.9},0.05,Q.Easing.Linear,{
    callback: function(){
      obj.animate({opacity:1,scale:1},0.1,Q.Easing.Linear);
    }
 	})
}

function stageStop(){
	Q.stage().paused = true ;
	stopTimeBar();
}

function stageContinue(){
	Q.stage().paused = false ;
	if(Q.state.get("is_countdown_over"))
		startClock(getUsedTime());
}

function setState(state){
	GAME.ADD.state.innerHTML = state;
}

function sortRank(time, name){
	var rank = false;

	GAME.rank.push({
		time: time,
		name: name,
		rank: -1
	})

	// compare & sort
	GAME.rank.sort(function(a, b){
		var keyA = a.time;
		var keyB = b.time;

		if(keyA < keyB)
			return -1;
		else if(keyA > keyB)
			return 1;
		else
			return 0;
	})

	GAME.rank.forEach(function(value, index){
		value.rank = index + 1;

		// 取排序好的前五名，若是有找到跟這個一樣的時間，就回傳他的排名，沒有就 False
		if(index < 5){
			if (value.time === time)
				rank = index + 1;
		}
	})
	return rank;
}

function formatTime(time){
	var min = Math.floor(time / 60);
	var sec = time % 60;

	if(sec < 10)
		sec = '0' + sec;

	return min + ':' + sec;
}


function sendWinnerData(time, name){
	var reault = {
		time: time,
		name: name
	};

	ref
    .push()
    .set(reault)
    .then(function() {
      console.log('sucuess');
    })
    .catch(function() {
      console.log('error');
    });

  GAME.ADD.winner_name.innerHTML = name;

  inputNameHidden();
  winnerNameShow();
}

function inputNameHidden(){
	GAME.ADD.input_name.style.display = "none";
}

function inputNameShow(){
	GAME.ADD.input_name.style.display = "block";
}

function winnerNameHidden(){
	GAME.ADD.winner_name.style.display = "none";
}

function winnerNameShow(){
	GAME.ADD.winner_name.style.display = "block";
}

function winnerTimeHidden(){
	GAME.ADD.winner_time.style.display = "none";
}

function winnerTimeShow(){
	GAME.ADD.winner_time.style.display = "block";
}