(function(window) {

  window.drawChart = drawChart;

  var barDivWidth = $("#bar").width(),
      parseDate = d3.time.format("%Y/%m/%d").parse;

  var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = barDivWidth - margin.left - margin.right,
      height = 250;

  var x,
      y,
      xAxis,
      yAxis,
      xDomain;

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0]);

  function drawChart(data, tipInfo, showLine) {
    tip.html(tipInfo);

    svg = d3.select("#bar").append("svg")
      .attr("width", '100%')
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
      .call(tip);

    x = d3.scale.ordinal().rangeRoundBands([0, width], 0.55);
    y = d3.scale.linear().range([height, 0]);

    xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(30);

    yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

    x.domain(data.map(function(d) { return d.city; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    addAxis();
    addBar(data);
    if (showLine) {
      addMovingLine(data, 5, '五日移動平均線', '#E10707', -10, width-100);
      addMovingLine(data, 10, '十日移動平均線', '#15B321', -10, width-220);
    }
  }

  function addMovingLine(data, days, title, color, y_pos, x_pos) {

    var movingAverageLine = movingAvg(days);
    var lineData = movingAverageLine(data);
    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

    svg.append("path")
      .datum(lineData)
      .attr("class", "line")
      .attr("stroke", color)
      .attr("d", line);

    svg.append("text")
      .attr("transform", "translate(" + x_pos + "," + y_pos + ")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", color)
      .text(title);
  }

  function addBar(data) {
    barWidth = width / 26;
    if (barWidth < 0) barWidth = 1;

    svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", function(d) {
        return 'steelblue';
      })
      .attr('class', function(d) {
        if (d.drug_times > 0) {
          return 'in-drug-day';
        }
        return '';
      })
      .attr("x", function(d) { return x(d.city); })
      .attr("width", barWidth)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  }

  function addAxis() {
    if (barDivWidth > 500) {
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(5.5," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "1.5em")
      .attr("dy", "1em")
      .attr("transform", "rotate(0)" );
    }
    else {

   svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-65)" )
      .style('font-size', 10);
    }


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("7日內病例數（人）");
  }

  function movingAvg(n) {
    return function (points) {
      points = points.map(function(each, index, array) {
        var to = index + n - 1;
        var subSeq, sum, indexDay;
        if (to < points.length) {
            subSeq = array.slice(index, to + 1);
            indexDay = subSeq[subSeq.length-1];
            sum = subSeq.reduce(function(a,b) {
                if (getDiffDays(a.date, b.date) < n) {
                  return {value: a.value + b.value, date: indexDay.date };
                }
                return {value: a.value, date: indexDay.date};
            });
            return {value: sum.value/n, date: indexDay.date};
        }
        return undefined;
      });
      points = points.filter(function(each) { return typeof each !== 'undefined';});
      return points;
    };
  }

  function getDiffDays(d1, d2) {
    var timeDiff = Math.abs(d1.getTime() - d2.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

})(window);
