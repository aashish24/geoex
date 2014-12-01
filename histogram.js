function createHistogram(node, data, states_hash) {

   var margin = {top: 50, right: 20, bottom: 50, left: 38},
        width = $(node).width() - margin.left - margin.right,
        height = $(node).height() - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

    var svg = d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return states_hash[d.state]; }));
    y.domain([0, d3.max(data, function(d) { return d.thought_perc; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-3.0em")
        .style("text-anchor", "end")
        .text("Suicidal Thoughts (%)");

    svg.selectAll(".bar")
        .data(data)
    .enter().append("rect")
        .style("fill", "#6495ED")
        .attr("class", "bar")
        .attr("x", function(d) { return x(states_hash[d.state]); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.thought_perc); })
        .attr("height", function(d) { return height - y(d.thought_perc); });
}
