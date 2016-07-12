var deviceWidth = $(window).width(), deviceHeight = $(window).height();
var errorDistance = 40 ;

//控制第一頁動畫開關
var isShowMos = 0 ;

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


    // 問啟軒效能？

    // 判斷雲出來的時機
    if (parseInt($('.background').css("left")) < 0){
      $('.cloud').css("display","flex");
      $('.man-run-container').css("display","block");
    }
    else{
      $('.cloud').css("display","none");
      $('.man-run-container').css("display","none");
    }

    // 讓bar不見
    if (data.curTop > 100 && data.direction == "down"){
      navbarHidden() ;
    }
    else{
      navbarShow() ;
    }

    // 判斷小人是否要跑！！
    if (data.curTop > (data.maxTop-errorDistance)){
      $('.man-run-container').addClass("man-run-container-animation");
      navbarShow() ;
    }
    else {
      $('.man-run-container').removeClass("man-run-container-animation");
    }
  }

});

function navbarShow(){
  $('.navbar').css("top","0px");
}
function navbarHidden(){
  $('.navbar').css("top","-76px");
}


// 
//蚊子出來的動畫
$('.logo-title').click(function(){

  $('.mos-after').toggleClass("mos-disappear");

  if (isShowMos == 0){
    $('.mos1').animate({opacity: 1,} , 200 , function(){
      $('.mos2').animate({opacity: 1,} , 200 , function(){
        $('.mos3').animate({opacity:1} , 200 , function(){
          $('.mos4').animate({opacity:1} , 200 , function(){
            $('.mos-main').toggleClass('mosquito-container-animation-main');
            $('.mos1').toggleClass('mos-after-animation-1');
            $('.mos2').toggleClass('mos-after-animation-2');
            $('.mos3').toggleClass('mos-after-animation-3');
            $('.mos4').toggleClass('mos-after-animation-4');
            $('.section1-text').toggleClass('shake-crazy shake-constant shake-constant--hover');
            $('.logo-title').toggleClass('logo-title-animation');
          });
        });
     });
    });

    isShowMos = 1;
  }
  else {
    $('.mos-main').toggleClass('mosquito-container-animation-main');
    $('.logo-title').toggleClass('logo-title-animation');
    $('.section1-text').toggleClass('shake-crazy shake-constant shake-constant--hover');

    for (i = 1 ; i < 5 ; i++){
      $('.mos'+i).toggleClass("mos-after-animation-"+i);
      $('.mos'+i).css("opacity",0);
    }

    isShowMos = 0;
  }
})


// //////
// nav 部分（為了不要讓他在滑下來時變白色，所以分開）
// //////
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
  window.location.href = "main/knowledge.html";
});

$('.mosquito-killer').click(function(){
  window.location.href = "main/killer.html";
});

$('.mosquito-realTime').click(function(){
  window.location.href = "main/realTime.html";
});

$('.mosquito-content').click(function(){
  window.location.href = "main/content.html";
});

$('.mosquito-interacting').click(function(){
  window.location.href = "main/interacting.html";
});

$('.mosquito-qa').click(function(){
  window.location.href = "main/qa.html";
})

$('#sub-logo').click(function(){
  window.location.reload();
})
// 
// ///////////////////////

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