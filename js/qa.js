var open_toggle = 0 ;

$('.open-answer').click(function(){
	id = this.id.split("q")[1] ;
	console.log(id);
	$('#a'+id).toggleClass("open");
})

$('.open-all').click(function(){
	if (open_toggle == 0){
		$('.open-all').toggleClass("back-yellow");
		$('.open-all').text("close all");
		$('.answer-box').addClass("open");
		open_toggle = 1 ;
	}
	else {
		$('.open-all').toggleClass("back-yellow");
		$('.open-all').text("open all");
		$('.answer-box').removeClass("open");
		open_toggle = 0;
	}
})