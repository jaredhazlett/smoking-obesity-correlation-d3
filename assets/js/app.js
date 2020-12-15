// @TODO: YOUR CODE HERE!
var svgWidth = 1300;
var svgHeight = 1000;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//look at the csv
  d3.csv("assets/data/data.csv").then(function(healthData) {
  	console.log(healthData)

  	//parse the data
  	healthData.forEach(function(data) {
  		data.smokes = +data.smokes
  		data.obesity = +data.obesity
  		data.id = +data.id

  	});

  	var xSmokesScale = d3.scaleLinear()
  		.domain([(d3.min(healthData, d => d.smokes)), d3.max(healthData, d => d.smokes)])
  		.range([0, width]);

  	var yObesityScale = d3.scaleLinear()
  		.domain([(d3.min(healthData, d => d.obesity)), d3.max(healthData, d => d.obesity)])
  		.range([height, 0]);

  	var xAxis = d3.axisBottom(xSmokesScale)
  	var yAxis = d3.axisLeft(yObesityScale)

  	chartGroup.append("g")
  		.attr("transform", `translate(0, ${height})`)
  		.call(xAxis);

  	chartGroup.append("g")
  		.call(yAxis);

  	var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xSmokesScale(d.smokes))
        .attr("cy", d => yObesityScale(d.obesity))
        .attr("r", "9")
        .attr("fill", "orange")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        .attr("opacity", ".65");

	var textGroup = chartGroup.selectAll("null")
		    .data(healthData)
		    .enter()
		    .append("text")
		    .attr("x", d => xSmokesScale(d.smokes))
		    .attr("y", d => yObesityScale(d.obesity - .05))
		    .text(d => d.abbr)
		    .attr("font-family", "sans-serif")
		    .attr("text-anchor", "middle")
		    .attr("font-size", "10px")
		    .attr("fill", "blue")

	chartGroup.append("text")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 0 - margin.left + 20)
      	.attr("x", 0 - (height / 1.5))
      	.attr("dy", "1em")
      	.attr("class", "axisText")
      	.text("Obesity Rate");

    chartGroup.append("text")
      	.attr("transform", `translate(${width / 2.5}, ${height + margin.top + 30})`)
      	.attr("class", "axisText")
      	.text("Smokes Frequency");
  }).catch(function(error) {
    console.log(error);

  })
