var toggle = 0;

$(document).scroll(function(){  
  $('.navbar').css({
  	"backgroundColor":"rgba(2555,255,255,0.9)"
  })

  if ( $(window).scrollTop() < 80 ){
  	$('.navbar').css({
  		"backgroundColor":"rgba(2555,255,255,0)"
  	});
  }
});


// //////////
// 小icon
// //////////
$('.nav-small-icon').click(function(){
	$('.navbar').toggleClass("nav-small-show");
	$('.back-black').toggleClass("display-block");
	$('.nav-small-bar').toggleClass("display-block");
	$('.nav-small-icon').toggleClass("nav-small-icon-show");

	if (toggle == 1){
		$('#bar1').css("transform","skew")
	}
	else {

	}
})

// /////////////////
// Mosquito-Router!!
$('.mosquito-knowledge').click(function(){
	window.location.href = "../main/knowledge.html";
});

$('.mosquito-killer').click(function(){
	window.location.href = "../main/killer.html";
});

$('.mosquito-realTime').click(function(){
	window.location.href = "../main/realTime.html";
});

$('.mosquito-content').click(function(){
	window.location.href = "../main/context.html";
});

$('.mosquito-interacting').click(function(){
	window.location.href = "../main/interacting.html";
});

$('.mosquito-qa').click(function(){
	window.location.href = "../main/qa.html";
})

$('#sub-logo').click(function(){
	window.location.href = "../index2.html";
})