var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2 ;
var y = canvas.height - 30 ;
var dx = 4 ;
var dy = -4 ;
var ballRadius = 10;

var paddleHeight = 10 ;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2 ;

var rightPressed = false ;
var leftPressed = false ;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var brickX = 0 + brickOffsetLeft , brickY = 0 + brickOffsetTop;
var bricks = [] ;

var score = 0 ;
var lives = 3 ;

for (c = 0 ; c < brickColumnCount ; c++){

	bricks[c]= [] ;

	for (r = 0 ; r < brickRowCount ; r++){
		bricks[c][r] = {x :0 , y :0 , status :1} ;
	}
}

document.addEventListener("keydown" , keyDownHandler , false);
document.addEventListener("keyup" , keyUpHandler , false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function drawLives(){
	ctx.font = "16px Arial" ;
	ctx.fillStyle = "#0095DD" ;
	ctx.fillText("Lives: " + lives , canvas.width - 70 , 20 ) ;
}

function drawScore(){
	ctx.font = "16px Arial" ;
	ctx.fillStyle = "#0095DD" ;
	ctx.fillText("Score: "+score , 8 , 20 );
}

function collisionDetect(){
	for ( c = 0 ; c < brickColumnCount ; c++){
		for (r = 0 ; r < brickRowCount ; r++ ){
			b = bricks[c][r]; 
			if (b.status == 1){
				if (x > b.x && x < b.x+paddleWidth && y > b.y && y < b.y+paddleHeight){
					dy = -dy ;
					b.status = 0 ;
					score++ ;

					if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
				}
			}	
		}
	}
}

function drawBricks(){
	for(c = 0 ; c < brickColumnCount ; c++){
		for ( r = 0 ; r < brickRowCount ; r++){
			if (bricks[c][r].status == 1){
				brickX = c*(brickWidth + brickPadding) + brickOffsetLeft ;
				brickY = r*(brickHeight + brickPadding)  + brickOffsetTop ;

				bricks[c][r].x = brickX ;
				bricks[c][r].y = brickY ;

				ctx.beginPath();
				ctx.rect(brickX , brickY , brickWidth , brickHeight) ;
				ctx.fillStyle = "#0095DD" ;
				ctx.fill() ;
				ctx.closePath() ;
			}
		}
	}
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX ;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function keyDownHandler(e) {
	console.log(e.keyCode);
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}



function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetect();
	drawLives();

	// 判斷高度、彈的方向
	if( y + dy < ballRadius) {
		dy = -dy;
	}
	else if (y + dy > (canvas.height - ballRadius)){
		if( x > paddleX && x < paddleX + paddleWidth){
			dy = -dy ;
		}
		else{
			lives-- ;

			if (!lives){
				alert("GAME OVER!!") ;
				document.location.reload();
			}
			else{
				x = canvas.width/2 ;
				y = canvas.height - 40 ;
				dx = 4 ;
				dy = -4 ;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
	if( x + dx < ballRadius || x + dx > (canvas.width - ballRadius) ){
		dx = -dx;
	}

	// 偵測按鍵！！
	if(rightPressed) {
    paddleX += 3;
	}
	else if(leftPressed) {
	  paddleX -= 3;
	}

	// 移動球球
	x += dx ;
	y += dy ;

	// 打開動畫開關
	requestAnimationFrame(draw);
}

$('#button').click(function(){
	$('#myCanvas').css("display","block");
	$('#guide').css("display","none");

	// 執行一次，打開動畫開關
	draw();
})
