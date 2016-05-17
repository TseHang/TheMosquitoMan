TweenMax.from("#img" , 0.5 , {
	opacity:0,
	//rotationY:360,
	scale:0,
	ease:Bounce.easeOut,
});

TweenMax.staggerFrom('.box' , 0.5 , {x:200 , opacity:0 , scale:2 , delay:0.5 , rotation:360} , 0.1);

//TweenMax.to("#img , .box" , 0.5 , {opacity:0 , delay:1.5});

/*
	left:100,
	backgroundColor:"rgba(0,0,0,0.1)",
	padding:10,
	borderWidth:1,
	borderColor:"black",
	borderRadius:"50%",
	borderStyle:"solid",
*/