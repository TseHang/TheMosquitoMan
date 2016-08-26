(function(window) {

   initData(
     'https://s3-ap-northeast-1.amazonaws.com/static.twstat.com/dengue105.csv',
     null,
     null,
     null,
     null
  );

  var map,
      data,
      circles = [],
      markers = [],
      info = L.control(),
      latlngs = {},
      stopIntervalIsTrue = false,
      defaultCircleParams = {
        size: 100,
        color: '#F44336',
        fillColor: '#F44336',
        showBig: true,
        opacity: 1
      };

  info.onAdd = onInfoAdd;
  info.update = onInfoUpdate;
  window.initData = initData;
  initMap();

  function initData(dengueUrl, drugUrl, barUrl, villageUrl, topoUrl) {

    d3.csv(dengueUrl, function(d) {
      data = d;
      var pivot = new Date(data[data.length-1].date);
      var key = pivot.toISOString().substring(0, 10).replace(/-/g, '/');
      $('.current').text(key);
      $('.number').text(d.length);
      drawCircle(data, defaultCircleParams);
    });


    if (barUrl) {
      d3.json(barUrl, function(error, data) {
        window.drawChart(data, showDefaultTip, true);
      });
    }
  }

  function format(arr) {
    var data = [];
    for (var i = 1; i < arr.length; ++ i){
      var tmp = {};
      for (var j = 0; j < arr[i].length; ++ j) {
        tmp[arr[0][j]] = arr[i][j];
      }
      data.push(tmp);
    }
    return data;
  }

  function getDate(dateArr) {
    if (dateArr[1] < 10) {
      dateArr[1] = '0' + dateArr[1];
    }
    if (dateArr[2] < 10) {
      dateArr[2] = '0' + dateArr[2];
    }
    return dateArr;
  }

  function initMap() {
    map = new L.Map('map');

    var url = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
    var attrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>';
    var osm = new L.TileLayer(url, {minZoom: 8,  maxZoom: 19, attribution: attrib});

    var accessToken = 'pk.eyJ1IjoiYWJ6NTMzNzgiLCJhIjoiUkRleEgwVSJ9.rWFItANcHAZQ2U0ousK4cA',
    mapID = 'abz53378.0klc153h';

    L.tileLayer('https://api.tiles.mapbox.com/v4/'+mapID+'/{z}/{x}/{y}.png?access_token='+accessToken, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a><a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/nl/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/3.0/nl/80x15.png" /></a>.'
    }).addTo(map);

    map.setView(new L.LatLng(22.86, 120.5), 10);
    //osm.addTo(map);
    info.addTo(map);
  }

  function drawCircle(data, argvs) {
    latlngs = {};
    data.forEach(function(point) {
      point.Longitude = parseFloat(point.Longitude);
      point.Latitude = parseFloat(point.Latitude);

      if (!point.Longitude || latlngs[point.Longitude] && latlngs[point.Longitude][point.Latitude]) {
        return;
      }
      console.log(point);
      var circle = L.circle([point.Latitude, point.Longitude], argvs.size,
        {fillColor: argvs.fillColor, color: argvs.color, opacity: argvs.opacity,
          clickable: false})
        .addTo(map);

      circles.push(circle);

      if (!latlngs[point.Longitude])
        latlngs[point.Longitude] = {};

      latlngs[point.Longitude][point.Latitude] = true;
    });
  }

  function onInfoAdd(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this._div.innerHTML = '';
    return this._div;
  }

  function onInfoUpdate() {
     this._div.innerHTML = '';
    return this._div;
  }

  function removeCircles(_circles) {
    _circles.forEach(function(circle) {
      map.removeLayer(circle);
    });
  }


})(window);
