(function(window){
	$('#box-1').click(function(){
	window.location.href="./realTime_patient.html";
	});

	$('#box-2').click(function(){
		window.location.href="./realTime_heat.html";
	});


	d3.csv('https://s3-ap-northeast-1.amazonaws.com/static.twstat.com/dengue105.csv', function(data) {
    $('.dengue_num').text(data.length);
  });
})(window)