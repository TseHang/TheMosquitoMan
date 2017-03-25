var data_url = 'https://dengue-breeding-source.s3.amazonaws.com:443/breeding-sources/heatmap_blurred.json'
var clear_url = 'https://dengue-breeding-source.s3.amazonaws.com/breeding-sources/processed.json';


var dataThree = [],
  dataFive = [],
  dataSeven = [],
  dataAll = [];
var clearThree = [],
  clearFive = [],
  clearSeven = [],
  clearAll = [];
var InOutThree = [],
  InOutFive = [],
  InOutSeven = [],
  InOutAll = [];

var datas = getdata(data_url);
var clear = getdata(clear_url);

var svg = null;

var radius = 240 / 2;
var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {
    return d.value; });
var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

$.fn.scrollView = function() {
  console.log("ScollFn");
  return this.each(function() {
    $('html,body').animate({
      scrollTop: $(this).offset().top - screen.height * 0.025
    }, "fast");
  });
}


var mon = {
  "Jan": "1",
  "Feb": "2",
  "Mar": "3",
  "Apr": "4",
  "May": "5",
  "Jun": "6",
  "Jul": "7",
  "Aug": "8",
  "Sep": "9",
  "Oct": "10",
  "Nov": "11",
  "Dec": "12"
};


var in3 = 0,
  out3 = 0,
  in7 = 0,
  out7 = 0,
  out5 = 0,
  in5 = 0,
  inA = 0,
  outA = 0;

datas.data.forEach(function(d) {
  var month = d.update_time.substr(d.update_time.indexOf(" "), d.update_time.indexOf(" ") + 2);
  var day = d.update_time.split(" ");
  var index = day.indexOf("");
  if (index != -1) {
    day.splice(index, 1);
  }
  var date = [day[2], day[4], mon[day[1]]];

  if (judgeDate(date, "all") === "1") {
    var tmp = [d.lat, d.lng, d.weight];
    if (d.type === "戶外") {
      outA = outA + 1;
    } else {
      inA = inA + 1;
    }
    dataAll.push(tmp);

    if (judgeDate(date, "7") === "1") {
      var tmp = [d.lat, d.lng, d.weight];
      if (d.type === "戶外") {
        out7 = out7 + 1;
      } else {
        in7 = in7 + 1;
      }
      dataSeven.push(tmp);

      if (judgeDate(date, "5") === "1") {
        var tmp = [d.lat, d.lng, d.weight];
        if (d.type === "戶外") {
          out5 = out5 + 1;
        } else {
          in5 = in5 + 1;
        }
        dataFive.push(tmp);

        if (judgeDate(date, "3") === "1") {
          var tmp = [d.lat, d.lng, d.weight];
          if (d.type === "戶外") {
            out3 = out3 + 1;
          } else {
            in3 = in3 + 1;
          }
          dataThree.push(tmp);
        }
      } else {
        console.log(date);
      }
    }
  }
})

clear.data.forEach(function(d) {
  var month = d.update_time.substr(d.update_time.indexOf(" "), d.update_time.indexOf(" ") + 2);
  var day = d.update_time.split(" ");
  var index = day.indexOf("");
  if (index != -1) {
    day.splice(index, 1);
  }
  var date = [day[2], day[4], mon[day[1]]];

  if (judgeDate(date, "all") === "1") {
    var tmp = [d.lat, d.lng, d.weight];
    clearAll.push(tmp);

    if (judgeDate(date, "7") === "1") {
      var tmp = [d.lat, d.lng, d.weight];
      clearSeven.push(tmp);

      if (judgeDate(date, "5") === "1") {
        var tmp = [d.lat, d.lng, d.weight];
        clearFive.push(tmp);

        if (judgeDate(date, "3") === "1") {
          var tmp = [d.lat, d.lng, d.weight];
          clearThree.push(tmp);
        }
      } else {
        console.log(date);
      }
    }
  }
})

InOutThree = [{ "value": out3 }, { "value": in3 }];
InOutFive = [{ "value": out5 }, { "value": in5 }];
InOutSeven = [{ "value": out7 }, { "value": in7 }];
InOutAll = [{ "value": outA }, { "value": inA }];


var v = 0;
var nowValue = "all";
var trans = { "3": "最近三天間", "5": "最近五天間", "7": "最近七天間", "all": "至今所有" }

$('.ui.dropdown').dropdown();



$('.dropdown').dropdown({
  onChange: function(value, text) {
    console.log(text);
    if (value === "") {

    } else {
      $(".description").css("float", "left");
      $(".description").css("margin", "40px 5% 20px 5%");
      v = v + 1;
      nowValue = value;
      heatMap(value);
      document.getElementById("header").innerHTML = trans[nowValue] + "環境回報分布圖";
    }
  }
});


var heats = new L.LayerGroup(),
  mymap;
var clearMarkers = new L.LayerGroup();


var legend = L.control({ position: 'bottomright' });
legend.onAdd = function(mymap) {

  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML += '<span class = "legend-header">區域內回報數（個）</span><HR>'

  div.innerHTML += '<i class="color" style="background:linear-gradient(to bottom, rgba(106,90,205,0.7) 0%,rgba(255,215,0,0.4) 50%,rgba(255,0,0,1) 100%);"></i>';

  div.innerHTML += '0<br>&#8768;<br>30 +'
    //div.innerHTML += '<br><hr style="border:1px #cccccc dotted;"><span class="mki mki-clean" style="float:left; font-size:25px"></span>已清掃之舉報點'
  div.innerHTML += '<br><hr style="border:1px #cccccc dotted;"><i class="mdi mdi-broom" style="font-size:17px; margin-right:8px; float:left;"></i>已巡查區域';

  return div;
};

/*
            var btn = L.control({position: 'bottomright'});
            btn.onAdd = function (mymap){
                var div = L.DomUtil.create('div', 'ui button quit');
                div.innerHTML+='<span class = "title">改變調查區間</span>'
                return div;
            }
            $(document).on("click", ".ui.button.quit", function (){
                 $('.ui.dropdown')
                    .dropdown('restore defaults');
                 $(".description").css("float", "none");
                 $(".description").css("margin", "auto");
                removeMap();
                $('.description').prepend('<h2 class="DayTitle" id="header"></h2>');
            });
*/

var btn2 = L.control({ position: 'bottomright' });
btn2.onAdd = function(mymap) {
  var div = L.DomUtil.create('div', 'ui checkbox remove');
  div.innerHTML += '<input type="checkbox" name="remove" checked="true">\
                                <label>顯示巡查區</label>';
  return div;
}


heatMap("all");



function getdata(data_url) {
  var tmp = null;
  $.ajax({
    'async': false,
    url: data_url,
    type: 'GET',
    success: function(data) {
      tmp = data;
    }
  });
  return tmp;
}



function heatMap(value) {

  switch (value) {
    case "3":
      var breedPoints = dataThree;
      var clearPoints = clearThree;
      var InOut = InOutThree;
      break;
    case "5":
      var breedPoints = dataFive;
      var clearPoints = clearFive;
      var InOut = InOutFive;
      break;
    case "7":
      var breedPoints = dataSeven;
      var clearPoints = clearSeven;
      var InOut = InOutFive;
      break;
    case "all":
      var breedPoints = dataAll;
      var clearPoints = clearAll;
      var InOut = InOutAll;
      break;
  }
  var center = [0, 0],
    max = 30;

  if (breedPoints.length > 0) { //none empty
    if (mymap == null) {
      $('.no_content').remove();
      $('.mapM').append('<div id="mapid"></div>');

      mymap = L.map('mapid').setView([22.9971, 120.2126], 15);
      
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(mymap);

      //btn.addTo(mymap);
      btn2.addTo(mymap);
      legend.addTo(mymap);

      $('.ui.checkbox').checkbox();
      $('.checkbox').checkbox({
        onChecked: function() {
          mymap.addLayer(clearMarkers);
        },
        onUnchecked: function() {
          mymap.removeLayer(clearMarkers);
        }
      });

      //locate
      var lc = L.control.locate({
        strings: {
          title: "Show me where I am, yo!"
        }
      }).addTo(mymap);
      document.getElementById("header").innerHTML = trans[nowValue] + "環境回報分布圖";
      $('.compare').append('<p id="first"></p>\
                                      <p id="second"></p>');

    }

    mymap.removeLayer(heats);
    mymap.removeLayer(clearMarkers)
    heats = new L.LayerGroup();
    clearMarkers = new L.LayerGroup();

    clearPoints.forEach(function(d) {
      var marker = L.marker([d[0], d[1]], { icon: L.icon.glyph({ prefix: 'mdi', glyph: 'broom', glyphSize: '18px', glyphColor: 'white' }) }).addTo(clearMarkers);
      //var marker=L.marker([d[0],d[1]],{draggable:false,icon:L.icon.mapkey({icon:"clean",size:40,background:false,color:'#00b300',additionalCSS:"text-shadow: 0px 0px 8px rgba(255, 255, 255, 1);"}) }).addTo(clearMarkers);
    })

    // heat map
    breedPoints = arrayUnique(breedPoints);

    var xArr = [],
      yArr = [];

    breedPoints.forEach(function(d) {
      d[2] = d[2] / max;

      xArr.push(d[0]);
      yArr.push(d[1]);
    })

    if (filterOutliers(xArr).length != 0) {
      xArr = filterOutliers(xArr);
      yArr = filterOutliers(yArr);
    }

    center = [sum(xArr) / xArr.length, sum(yArr) / yArr.length];
    mymap.setView(center, 16);

    var heat = L.heatLayer(breedPoints, {
      radius: 25,
      blur: 17,
      minOpacity: 0.4,
      gradient: {
        0.4: 'SlateBlue',
        0.6: 'Gold',
        1: 'red',
      }
    }).addTo(heats);

    mymap.addLayer(heats);
    mymap.addLayer(clearMarkers);
    $('#mapid').scrollView();

    if (svg === null) {
      var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 350 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

      svg = d3.select(".svgPlot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var z = d3.scale.category20b()
        .range(["#74c476", "#c6dbef"]);




      var path = svg.datum(InOut).selectAll(".pie")
        .data(pie)
        .enter().append("path")
        .attr("class", "pie")
        .attr("transform", "translate(120,120)")
        .style("opacity", 0.95)
        .attr("fill", function(d, i) {
          return z(i); })
        .attr("d", arc)
        .each(function(d) { this._current = d; })


      var legendClassArray = [];
      var legend2 = svg.selectAll(".leg")
        .data(z.domain().slice().reverse())
        .enter().append("g")
        .attr("class", function(d) {
          legendClassArray.push(d);
          return "leg";
        })
        .attr("transform", function(d, i) {
          return "translate(0," + i * 20 + ")"; });
      //reverse order to match order in which bars are stacked
      legendClassArray = legendClassArray.reverse();

      legend2.append("rect")
        .attr("x", 270)
        .attr("y", 2)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", z);

      legend2.append("text")
        .attr("x", 290)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("font-size", "14px")
        .style("font-weight", "normal")
        .text(function(d) {
          switch (d) {
            case 0:
              return "室外"
            case 1:
              return "室內"
            default:
          }
        });

    } else { //update pie plot
      if (v != 0) {
        piePlot(InOut)
      };
    }


    if (InOut[0].value < InOut[1].value) {
      document.getElementById("first").innerHTML = "目前室內回報數 > 室外回報數";
      document.getElementById("second").innerHTML = "請多注意室內周遭積水髒亂處";
    } else if (InOut[0].value == InOut[1].value) {
      document.getElementById("first").innerHTML = "目前室外回報數 = 室內回報數";
      document.getElementById("second").innerHTML = "請多注意室內、外周遭積水髒亂處";
    } else {
      document.getElementById("first").innerHTML = "目前室外回報數 > 室內回報數";
      document.getElementById("second").innerHTML = "請多注意室外周遭積水髒亂處";
    }

  } else {
    console.log("none of any event");
    removeMap();

    $('.description').prepend('<div class="no_content">\
                                    <img src="../dist/src/img/realTime/no_content.png"> \
                                    <h4>此區間暫無調查資料</h4>\
                                </div>');
    $('.description').prepend('<h2 class="DayTitle" id="header"></h2>');
    $(".description").css("float", "none");
    $(".description").css("margin", "auto");
  }
}

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i][0] === a[j][0] && a[i][1] === a[j][1]) {
        a[i][2] = a[i][2] + a[j][2];
        a.splice(j--, 1);
      }
    }
  }

  return a;
}

function filterOutliers(someArray) {

  // Copy the values, rather than operating on references to existing values
  var values = someArray.concat();

  // Then sort
  values.sort(function(a, b) {
    return a - b;
  });

  /* Then find a generous IQR. This is generous because if (values.length / 4)
   * is not an int, then really you should average the two elements on either
   * side to find q1.
   */
  var q1 = values[Math.floor((values.length / 4))];
  // Likewise for q3.
  var q3 = values[Math.ceil((values.length * (3 / 4)))];
  var iqr = q3 - q1;

  // Then find min and max values
  var maxValue = q3 + iqr * 1.5;
  var minValue = q1 - iqr * 1.5;

  // Then filter anything beyond or beneath these values.
  var filteredValues = values.filter(function(x) {
    return (x < maxValue) && (x > minValue);
  });

  // Then return
  return filteredValues;
}

function sum(array) {
  var s = array.reduce(function(pv, cv) {
    return pv + cv; }, 0);
  return s;
}

function removeMap() {
  $('.no_content').remove();
  $('#mapid').remove();
  if (mymap != null) {
    mymap.remove();
    mymap = null;
    console.log("move");
  }
  $('#first').remove();
  $('#second').remove();
  $('svg').remove();
  svg = null;
  $('.DayTitle').remove();
}


function judgeDate(date, slice) {
  var d = new Date();
  var dd = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  var dTime = new Date(dd); //today's AM 12:00

  if (date[1].substr(0, 1) === "0") {
    date[1] = date[1].substr(1, 2);
  }
  if (date[2].substr(0, 1) === "0") {
    date[2] = date[2].substr(1, 2);
  }

  var d2 = new Date(date[1] + "/" + date[2] + "/" + date[0]);
  if (slice === "all") {
    return "1";
  }

  //console.log(dTime);
  //console.log(d2);

  if (dTime.getTime() - d2.getTime() > ((parseInt(slice) - 1) * 24 * 60 * 60 * 1000)) { //out of range
    return "0";
  } else {
    return "1";
  }
}



function piePlot(data) {
  console.log("update");
  var path = svg.datum(data).selectAll(".pie");

  pie.value(function(d) {
    return d.value; }); // change the value function
  path = path.data(pie); // compute the new angles
  path.transition().duration(300).attrTween("d", arcTween); // redraw the arcs
}

function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}
