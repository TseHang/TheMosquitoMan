
window.addEventListener("load", function() {
  var Q = window.Q = new Quintus({
      imagePath: "images/",
      dataPath: "data/",
      development: true
    })
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 320,
      height: 180,
      //maximize: true ,
      scaleToFit: true
    })
    .controls()
    .touch();

  Q.enableSound();
  Q.setImageSmoothing(false);

  // define assets
  Q.scene("level" , function(stage){
    var player ;

    Q.stageTMX("small_level.tmx" , stage);

    // 選到所有的 Player
    player = Q("Player").first();

    // 讓螢幕幕跟著這個主角在動
    stage.add("viewport").follow(player, {x: true , y:true})

  })

  // load assets
  // 載入 mp3 後， ogg 就會一起被載入
  Q.loadTMX("small_level.tmx, sprites.json, sprites.png, kill-enemy.mp3, jump.mp3" , function(){
    Q.compileSheets("sprites.png","sprites.json") ;
    Q.stageScene("level");
  });

});

//   // 玩家角色
//   Q.Sprite.extend("Player", {
//     init: function(p) {
//       this._super({
//         sheet: "player",
//         x: 200,
//         y: 0
//       });

//       this.add("2d, platformerControls");
//     },

//     step: function() {

//     }
//   });

//   // Insert背景與舞台, 角色
//   Q.scene("level", function(stage) {
//     stage.insert(new Q.Player());

//     var landspace = new Q.Sprite({
//       x: 700,
//       y: 300,
//       w: 1500,
//       h: 100
//     });
//     landspace.draw = function(ctx) {
//       ctx.fillStyle = 'green';
//       ctx.fillRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
//     };
//     stage.insert(landspace);

//     stage.add("viewport").follow(Q("Player").first());
//   });

//   // 載入圖檔資料
//   Q.load("dinosaur.png", function() {
//     Q.sheet("player", "dinosaur.png", {
//       tilew: 300,
//       tileh: 174
//     });
//     Q.stageScene("level");
//     Q.debug = true;
//   });
// });
/*
  ... Actual game code goes here ... 
*/
