window.addEventListener("load", function() { // Wait for the window to finish loading
  var Q = window.Q = Quintus().include("Sprites, Scenes, UI, Touch")
      .setup({
        width: 960 , 
        height:512
      })
      .touch();
  Q.scene("start" , function(stage){
    var container = stage.insert(new Q.UI.Container({
      fill: "gray" ,
      border: "5",
      shadow: 10,
      shadowColor: "rgba(0,0,0,0.5)",
      y: 50,
      x: Q.width/2
    }));

    // 塞到container 這個容器
    stage.insert(new Q.UI.Text({
      label: "Here is a label\nin a container",
      color: "white",
      x: 0,
      y: 0
    }),container);

    stage.insert(new Q.UI.Button({
      label: "A Button",
      font: "weigth:900, size: 24px, family: arial" ,
      y: 150,
      x: Q.width/2
    }, function(){
      console.log(this );
      this.p.label = "pressed" ;
    }));

    stage.insert(new Q.UI.Button({
      label: "Another Button",
      y: 200,
      x: Q.width/2 ,
      fill: "#990000",
      border: 5,
      shadow: 10,
      shadowColor: "rgba(0,0,0,0.5)"
    },function(){
      console.log(this );
      this.p.label = "Pressed" ;
    }))

    stage.insert(new Q.UI.Text({
      label: "Image below is a\nbutton using an asset",
      color: "black",
      align: "center",
      x: 0,
      y: 220
    }),container)

    stage.insert(new Q.UI.Button({
      asset: 'sprite.png',
      x: Q.width/2,
      scale: 0.9,
      y:430
    }, function(){
      console.log(this );
      this.p.angle += 90 ;
    }));

    container.fit(20,20);
  })

  Q.load("sprite.png" , function(){
    Q.stageScene("start");
  })

  // Q.debug = true ;
  Q.debufFill = true ;

});
