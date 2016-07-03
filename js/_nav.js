var num = 9 ;

$(document).scroll(function(){  
  $('.navbar').css({
  	"backgroundColor":"rgba(2555,255,255,0.9)",
  	"boxShadow":"1px 1px 5px -1px black"
  })

  if ( $(window).scrollTop() < 80 ){
  	$('.navbar').css({
  		"backgroundColor":"rgba(2555,255,255,0)",
  		"boxShadow":"0px 0px 0px -1px black"
  	});
  }
});

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