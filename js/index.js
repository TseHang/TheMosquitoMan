var deviceWidth = $(window).width(), deviceHeight = $(window).height();

$(window).load(function(){
	console.log('都載入完了');
})


$(document).ready(function(){
	//img-logo
	imgLogoShow();
})

$(document).scroll(function(){  
	//img-logo
	imgLogoShow();

	distance = $(window).scrollTop() - $('#cloud-1').offset().top ;
  if ( distance > -1*deviceHeight){
  	$('.cloud').addClass('cloud-move');
  	console.log('加入囉');
  }
  else {
  	$('.cloud').removeClass('cloud-move');
  	console.log('移掉囉');
  }
});


function imgLogoShow(){
	if ($(window).scrollTop() < 80){
		$('#img-logo').css({'display':'none'});
		$('#img-logo').removeClass('logo-show');
	}
	else{
		$('#img-logo').addClass('logo-show');
	}
}