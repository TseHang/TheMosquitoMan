;Quintus.WarLevels = function(Q) {
  
  var k_m = 6 // 血泡ex
  var k_s = 5 // 血泡

  var z = 4; // 爆
	// var y = 3; // 狂
	var m = 2; // 中
	var s = 1; // 小
	var X = 0; // null

  Q.assets['level1'] = [
    [X,X,s,s,X,X],
    [s,s,s,s,s,s],
    [X,s,s,s,s,X]
  ];

  Q.assets['addMos_2'] = [
    [X,z,X,X,z,X],
    [m,X,m,m,X,m],
    [X,m,s,s,m,X],
    [s,m,X,X,m,s]
  ];

  Q.assets['addMos_3'] = [
    [z,X,m,m,X,z],
    [m,z,s,s,z,m],
    [X,m,X,X,m,X],
    [z,s,m,m,s,z],
    [X,s,s,s,s,X]
  ];

  Q.assets['addKingattack_s_1'] = [
    [X,k_s,X,k_s,k_s,k_s,k_s,k_s,k_s,X,k_s,X]
  ];
  Q.assets['addKingattack_s_2'] = [
    [k_s,X,k_s,X,X,k_s,X,k_s,k_s,X,k_s,k_s]
  ];
  Q.assets['addKingattack_s_3'] = [
    [X,k_s,k_s,k_s,X,X,k_s,X,X,k_s,k_s,k_s]
  ];
};
