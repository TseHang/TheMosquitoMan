//////////////////////////////////////////////////////////////////////////////////
// A demonstration of a Canvas nebula effect
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
//
// Please retain this copyright header in all versions of the software if
// using significant parts of it
//////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){	
													   
	(function ($) {			
		//注意Jquery 取用 Canvas 跟 Javascript 取用Canvas的差別
			// The canvas element we are drawing into.      
			var	$canvas = $('#canvas');
			var	$canvas2 = $('#canvas2'); //真正的圖
			var	$canvas3 = $('#canvas3');			
			var	ctx2 = $canvas2[0].getContext('2d');
			var	ctx = $canvas[0].getContext('2d');
			var	w = $canvas[0].width, h = $canvas[0].height;		
			var	img = new Image();	

			console.log($canvas);
			console.log($canvas2);
			console.log($canvas3);
			
			// A puff.
			var	Puff = function(p) {				
				var	opacity,
					sy = (Math.random()*285)*100,
					sx = (Math.random()*285)*100;

				//參數的那個p
				this.p = p;
				
				//function 內的function
				this.move = function(timeFac) {

					// 0.3 可以控制拉近的速度				
					p = this.p + 0.3 * timeFac;	
					opacity = (Math.sin(p*0.05)*0.5);						
					if(opacity <0) {
						p = opacity = 0;
						sy = (Math.random()*285);
						sx = (Math.random()*285);
					}												
					this.p = p;																			
					ctx.globalAlpha = opacity;

					//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
					//前四個參數定義了在來源影像上切割的起始點和切割大小，後四個參數定義了畫到畫布上的位置和影像大小.				
					//因為setTimeout 設定0.01毫秒會拉大一次p（就跟放大的效果一樣～）
					ctx.drawImage($canvas3[0], sx+p, sy+p, 285-(p*2),285-(p*2), 0,0, w, h);	
					//console.log(1);
				};
			};
			
			var	puffs = [];			
			var	sortPuff = function(p1,p2) { return p1.p-p2.p; };	
			puffs.push( new Puff(0) );
			puffs.push( new Puff(20) );
			puffs.push( new Puff(40) );
			//console.log(new Puff(20));

			
			var	newTime, oldTime = 0, timeFac;
			var temp = 1 ; 

			var	loop = function()
			{								
				newTime = new Date().getTime();	

				//" === " equal value and equal type			
				if(oldTime === 0 ) {
					oldTime=newTime;
				}
				
				timeFac = (newTime-oldTime) * 0.1;
				//console.log(timeFac);

				//控制timefac大小
				if(timeFac>3)
					timeFac=3;

				oldTime = newTime;							
				//puffs.sort(sortPuff);
				
				
				for(var i=0;i<puffs.length;i++)
				{
					puffs[i].move(timeFac);	
				}
								
				ctx2.drawImage( $canvas[0] ,0,0,570,570);

				setTimeout(loop , 10);
			};
			// Turns out Chrome is much faster doing bitmap work if the bitmap is in an existing canvas rather
			// than an IMG, VIDEO etc. So draw the big nebula image into canvas3
			var	$canvas3 = $('#canvas3');
			var	ctx3 = $canvas3[0].getContext('2d');

			//只綁助載入圖片時的事件 => 只執行一次
			$(img).bind('load',null, function() {  ctx3.drawImage(img, 0,0, 570, 570);	loop(); });					
			img.src = '1.jpg';
		
	})(jQuery);	 
});

$('#start').on('click', function (){
	$('.pulse').toggleClass('animate');
	console.log("click!");
})
