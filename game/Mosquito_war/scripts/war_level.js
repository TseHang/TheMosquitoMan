;Quintus.WarLevels = function(Q) {

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

  Q.assets['addRow'] = [
    [s,s,s,s,s,s],
    [s,s,s,s,s,s]
  ];
};
