(function(window){

	var interactContent = [
		{
			"audio":"bgm_competition" ,
			"link": "./competition.html",
			"title":"群眾集力環境回報比賽",
			"content":"雨後清積水，Iphone 任你選！"
		},
		{
			"audio":"bgm_game" ,
			"link": "./game.html",
			"title":"掌蚊人遊戲",
			"content":"戰友們！請幫助我一起滅蚊吧！！"
		}
	] ;
	var interactId = 1 ;
	var interactLength = interactContent.length ;
	
	$('.select-right').click(function(){
		$('.select-right').addClass('click_anim');

		$('#interact_'+interactId).toggleClass('active');
		stopAudio(interactContent[interactId-1].audio);

		interactId = (interactId+1 > interactLength)? 1 : interactId+1 ;
		playAudio(interactContent[interactId-1].audio );
		changeContent() ;
		// console.log("11");

		window.setTimeout(function(){
			$('.select-right').removeClass('click_anim');			
		},200);
	})

	$('.select-left').click(function(){
		$('.select-left').addClass('click_anim');

		$('#interact_'+interactId).toggleClass('active');
		stopAudio(interactContent[interactId-1].audio);
		
		interactId = (interactId-1 <= 0)? interactLength : interactId-1 ;
		playAudio(interactContent[interactId-1].audio );
		changeContent() ;

		window.setTimeout(function(){
			$('.select-left').removeClass('click_anim');			
		},200);
	})


	function changeContent(){
		$('#interact_'+ interactId).toggleClass('active');

		if(interactId === interactLength){
			$('#right_text').text(interactContent[0].title) ;
			$('#left_text').text(interactContent[interactId-2].title) ;

		}else if(interactId === 1){
			$('#right_text').text(interactContent[interactId].title) ;
			$('#left_text').text(interactContent[interactLength-1].title) ;
		}else{
			$('#right_text').text(interactContent[interactId].title) ;
			$('#left_text').text(interactContent[interactId-2].title) ;
		}
	}


	// 圓圈小動畫
	$(".circle").mouseover(function(){
	  $(".circle").css("fontSize","30px");
	  $(".circle").text("GO!");

		$(".intro-text").addClass("stretch");  
	});

	$(".circle").mouseout(function(){
	  $(".circle").css("fontSize","75px");
	  $(".circle").text("●");

	  $(".intro-text").removeClass("stretch");
	});

	$('.circle').click(function(){
		// 執行 mouseover 的動作
		$(".circle").css("fontSize","75px");
	  $(".circle").text("●");

	  $(".intro-text").removeClass("stretch");

		window.location.href= interactContent[interactId-1].link;
	})

	// 左右動畫
	$('#t-r').mouseover(function(){
		$('.full').css("zIndex",3);
		$('#slide-bar-r').css({
			"transform":"scale(1.3)"
		});
		$('#box-right').toggleClass("box-right-hover");
	})

	$('#t-r').mouseout(function(){
		$('.full').css("zIndex",-1);
		$('#slide-bar-r').css({
			"transform":"scale(1)"
		});

		$('#box-right').toggleClass("box-right-hover");
	})

	$('#t-l').mouseover(function(){
		$('.full').css("zIndex",3);
		$('#slide-bar-l').css({
			"transform":"scale(1.3)"
		});

		$('#box-left').toggleClass("box-left-hover");
	})

	$('#t-l').mouseout(function(){
		$('.full').css("zIndex",-1);
		$('#slide-bar-l').css({
			"transform":"scale(1)"
		});

		$('#box-left').toggleClass("box-left-hover");
	})

	// enter_text show/off
	$('.board').mouseover(function(){
		$('#enter_text').css("display","block");
	})
	$('.board').mouseout(function(){
		$('#enter_text').css("display","none");
	})

	// Control Sound
	$('#sound').click(function(){
		$('#sound').toggleClass("sound_off");
		$("#"+interactContent[interactId-1].audio).prop("muted",!$("#"+interactContent[interactId-1].audio).prop("muted"));
	})

	function volumeDown(id){
	  var volume = $("#" + id).prop("volume")-0.0001;
	  if(volume <=0){
	    volume = 0;
	    return true ;
	  }
	  $("#"+id).prop("volume",volume);
	  return false ;
	}

	function stopAudio(id){
		while(volumeDown(id) === false){
			volumeDown(id) ;
		}
		console.log("slow mute");

	  $("#"+id).trigger('pause');
	  $("#"+id).prop("currentTime",0);
	}

	function playAudio(id , direct){
		$("#"+id).prop("volume",1);
		$('#'+id).trigger('play');

		if($('#sound').hasClass('sound_off'))
			$('#'+id).prop("muted",true);
		else
			$('#'+id).prop("muted",false);
	}

})(window)