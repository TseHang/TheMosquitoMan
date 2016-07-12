var deviceWidth = $(window).width(), deviceHeight = $(window).height() ;
var distance = $(window).scrollTop();


/****

做 ＲＷＤ 時，需要改data-xxx的屬性，先用這個js來更改，然後做RWD

****/
if (deviceWidth >= 1500){
	$('.background').attr("data-540p","left:-223%");
	$('.background').attr("data-460p","left:-111%");
	$('.background').attr("data-400p","left:-111%");
}

if(deviceWidth >= 1800){
	$('.background').attr("data-540p" , "left:-158%;");
}

if(deviceWidth <= 1200 ){
	$('.background').attr("data-540p" , "left:-195%;");	
}

if(deviceWidth <= 1100){
	$('.background').attr("data-540p" , "left:-267%;");	
	$('.background').attr("data-460p","left:-132%");
	$('.background').attr("data-400p","left:-132%");
}


// //////////////////////
// 直版
if(deviceWidth < 800 && deviceHeight <= 1025){
	$('#section2-text').attr("data-80p" , "display:block;left:20%;opacity:0;");	
	$('#section2-text').attr("data-100p" , "display:block;left:20%;opacity:1;");	
	$('#section2-text').attr("data-140p" , "display:block;left:20%;opacity:1;");	
	$('#section2-text').attr("data-180p" , "display:none;left:20%;opacity:0;");	

	$('#tsunami').attr("data-320p" ,  "bottom:0%;width:350%;left:0%;")
	$('.bone').attr("data-320p","bottom:-1%");

	$('.background').attr("data-540p" , "left:-400%;");	
	$('.background').attr("data-460p","left:-270%");
	$('.background').attr("data-400p","left:-270%");
}

if(deviceWidth < 500 && deviceHeight <= 750){

	$('#tsunami').attr("data-320p" ,  "bottom:0%;width:500%;left:0%;")

	$('.background').attr("data-540p" , "left:-500%;");	
	$('.background').attr("data-460p","left:-350%");
	$('.background').attr("data-400p","left:-350%");
}