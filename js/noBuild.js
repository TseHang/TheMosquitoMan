var isShowMos = 0 ;

// 
//蚊子出來的動畫
$('#text').click(function(){
  console.log("11");

  $('.mos-after').toggleClass("mos-disappear");
  $('#text p').text("快點別頁！！！")

  if (isShowMos == 0){
    $('.mos1').animate({opacity: 1,} , 200 , function(){
      $('.mos2').animate({opacity: 1,} , 200 , function(){
        $('.mos3').animate({opacity:1} , 200 , function(){
          $('.mos4').animate({opacity:1} , 200 , function(){
            $('.mos1').toggleClass('mos-after-animation-1');
            $('.mos2').toggleClass('mos-after-animation-2');
            $('.mos3').toggleClass('mos-after-animation-3');
            $('.mos4').toggleClass('mos-after-animation-4');
            $('#mosss').toggleClass('shake-crazy shake-constant');
          });
        });
     });
    });

    isShowMos = 1;
  }
  else {
    $('#mosss').toggleClass('shake-crazy shake-constant');
    $('#text p').text("資料建置中....")

    for (i = 1 ; i < 5 ; i++){
      $('.mos'+i).toggleClass("mos-after-animation-"+i);
      $('.mos'+i).css("opacity",0);
    }

    isShowMos = 0;
  }
})