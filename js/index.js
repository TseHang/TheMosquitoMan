//初始化
var s = skrollr.init({
  //跟smoothScrolling的功能，主要都是讓scroll事件不要這麼敏感，動畫才不會看起來卡卡的。
  smoothScrolling : true,
  smoothScrollingDuration:200,
  
  //可以定義一些常數在影格使用，Example: data-_myconst-200 and skrollr.init({constants: {myconst: 300}}) result in data-500.
  constants:{
    initTop:100
  },
  
  //讓文本高度自動達到滿足Keyframe的條件
  forceHeight:true,
  
  //針對行動裝置的功能
  mobileCheck:function(){},
  mobileDeceleration:0.004,
  
  //畫面一開始，元素的初始值set：物件上第一個影格的值，ease：相對畫面開始的Scrolltop值使用兩格影格作參考，reset:使用他原生的CSS值
  edgeStrategy:'set',
  
  //render事件

  render: function(data) {
      //Log the current scroll position.

      console.log(data.curTop);
  }

});

$('.section-horizontal').mousewheel(function(e, delta){
	if(e.deltaY < 0){
		$(this).css("left","200px");
		console.log("22");
	}
});


// var deviceWidth = $(window).width(), deviceHeight = $(window).height();

// $(document).ready(function(){
// 	//img-logo
// 	imgLogoShow();
// })

// $(document).scroll(function(){  
// 	//img-logo
// 	imgLogoShow();

// 	distance = $(window).scrollTop() - $('#cloud-1').offset().top;
//   if ( distance > -1*deviceHeight){
//   	$('.cloud').addClass('cloud-move');
//   	console.log('加入囉');
//   }
//   else {
//   	$('.cloud').removeClass('cloud-move');
//   	console.log('移掉囉');
//   }
  
// });


// function imgLogoShow(){
// 	if ($(window).scrollTop() < 80){
// 		$('#img-logo').css({'display':'none'});
// 		$('#img-logo').removeClass('logo-show');
// 	}
// 	else{
// 		$('#img-logo').addClass('logo-show');
// 	}
// }