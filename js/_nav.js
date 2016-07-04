var num = 9 ;

$(document).scroll(function(){  
  $('.navbar').css({
  	"backgroundColor":"rgba(2555,255,255,0.9)",
  	"boxShadow":"0px 1px 10px -2px black"
  })

  if ( $(window).scrollTop() < 80 ){
  	$('.navbar').css({
  		"backgroundColor":"rgba(2555,255,255,0)",
  		"boxShadow":"0px 0px 0px 0px black"
  	});
  }
});

// /////////////////
// Mosquito-Router!!
$('#mosquito-knowledge').click(function(){
	window.location.href = "knowledge.html";
});

$('#mosquito-killer').click(function(){
	window.location.href = "killer.html";
});

$('#mosquito-realTime').click(function(){
	window.location.href = "realTime.html";
});

$('#mosquito-content').click(function(){
	window.location.href = "content.html";
});

$('#mosquito-interacting').click(function(){
	window.location.href = "interacting.html";
});

$('#mosquito-qa').click(function(){
	window.location.href = "qa.html";
})

$('#sub-logo').click(function(){
	window.location.href = "../index2.html";
})


// 一直放大的實驗！！
// 
// 

// $('#sub-logo').mouseover(function(){
// 	incNum = window.setInterval("addNum()",50);
// });

// $('#sub-logo').mouseout(function(){
// 	$('#sub-logo').css("width" ,'9%');
// 	window.clearInterval(incNum);

// 	num = 9 ;
// })

// function addNum(){
// 	if (num >= 40)
// 		;
// 	else {
// 		num++ ;
// 		$('#sub-logo').css("width" , num+'%');
// 	}
// }