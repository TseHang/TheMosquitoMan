var pageMode = "0" ;
var tempId = "0" ;

var pageId ="none";
var temp1Id = "page1-bar5" ;
var temp2Id = "page2-bar5" ;
var temp3Id = "page3-bar5" ;

// 考慮換成tempId？？

var tempSelectId = "select-none" ;

$('.bar-page').click(function(){

	$("#"+ this.id).toggleClass("bar-close");
	$("#"+ this.id).toggleClass("bar-open");

	if(this.id == pageId){

		// 收起來
		pageId = "none";
	}
	else {
		// 把原本的收起來
		$("#"+ pageId).toggleClass("bar-close");
		$("#"+ pageId).toggleClass("bar-open");

		pageId = this.id ;
	}

	setPageId(pageMode , 2);
})

// ///////////////////
// CHOOSE PAGE ！！！
// //////////////////
$('.page-box').click(function(){
	pageMode = this.id.split('-')[2];

	setPageId(pageMode);

	if (pageMode == tempId){
		;
	}
	else {
		// 消掉原本的
		$('#select-'+tempId).removeClass('h-page-choose');
		$('#select-'+tempId).removeClass('display-none');
		$('#page-'+ tempId).toggleClass('display-none');

		// 增加新的
		$('.page').removeClass('display-none');
		$('#select-'+pageMode).addClass('h-page-choose');
		$('#page-'+ pageMode).toggleClass('display-none');

	}

	$('body').animate({
    scrollTop: ($('.page').offset().top - 80)
  },400);

  tempId = pageMode ;

})

// ////////////////
// Select Page Click
// ////////////////
$('.h-page-title').click(function(){

	pageMode = this.id.split("-")[1] ;
  tempSelectId = "select-"+ tempId;

  setPageId(pageMode);

	if (tempSelectId == this.id){
		;
	}
	else {

		// 把上個消掉
		$('#'+tempSelectId).toggleClass('h-page-choose');
		
		// 加入現在的
		$('#'+this.id).toggleClass('h-page-choose');

		$('#page-'+ tempId).toggleClass('display-none');
		$('#page-'+ pageMode).toggleClass('display-none');

		tempId = pageMode;
	}

	$('body').animate({
    scrollTop: ($('.page').offset().top - 80)
  },400);
})


function setPageId(pageMode , toggle){

	toggle = toggle || 1 ;

	if (toggle == 1){
		switch(pageMode) {
			case "1":
				pageId = temp1Id ;
				break;
			case "2":
				pageId = temp2Id ;
				break;
			case "3":
				pageId = temp3Id;
				break;
			default:
				window.alert("Page-Box-toggle1 出錯囉！");
		}
	}
	else if (toggle == 2){
		switch(pageMode) {
			case "1":
				temp1Id = pageId;
				console.log("1:"+temp1Id);
				break;
			case "2":
				temp2Id = pageId ;
				console.log("2:"+temp2Id);
				break;
			case "3":
				temp3Id = page3Id;
				console.log("3:"+temp3Id);
				break;
			default:
				window.alert("Page-Box-toggle2 出錯囉！");
		}
	}
}