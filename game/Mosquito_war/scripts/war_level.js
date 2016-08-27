;Quintus.WarLevels = function(Q) {
  
  var k_m = 6 // 血泡ex
  var k_s = 5 // 血泡

  var z = 4; // 爆
	var y = 3; // 狂
	var m = 2; // 中
	var s = 1; // 小
	var X = 0; // null

  Q.assets['level1'] = [
    [X,X,s,s,X,X],
    [s,s,s,s,s,s],
    [X,s,s,s,s,X]
  ];

  Q.assets['level2'] = [
    [X,X,s,s,X,X],
    [s,s,s,s,s,s],
    [X,s,s,s,s,X],
    [X,s,s,s,s,X],
    [X,s,s,s,s,X]
  ];

  Q.assets['addMos_s'] = [
    [s,s,s,s,s,s],
    [s,s,s,s,s,s]
  ];

  Q.assets['addKingattack_s'] = [
    [X,k_s,X,k_s,k_s,X,X,k_s,k_s,X,k_s,X]
  ]
};
