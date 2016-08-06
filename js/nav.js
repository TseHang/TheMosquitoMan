(function(window) {

  var toggle = 0;
  var colorIndex = 0;
  $(document).scroll(function() {
    if ( $(window).scrollTop() < 80 && colorIndex === 1){
      $('.navbar').css({
        "backgroundColor":"rgba(2555,255,255,0)"
      });
      colorIndex = 2;
    }
    else if (colorIndex === 2) {
      $('.navbar').css({
        "backgroundColor":"rgba(2555,255,255,0.9)"
      });
      colorIndex = 1;
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
      $('#bar1').css("transform","skew");
    }
  });

})(window);
