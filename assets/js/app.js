// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
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
  		data.income = +data.income
  		data.smokes = +data.smokes;
  	});

  	var xIncomeScale = d3.scaleLinear()
  		.domain(d3.extent(healthData, d => d.income))
  		.range([0, width]);

  	var ySmokesScale = d3.scaleLinear()
  		.domain([(d3.min(healthData, d => d.smokes * .8)), d3.max(healthData, d => d.smokes)])
  		.range([height, 0]);

  	var xAxis = d3.axisBottom(xIncomeScale)
  	var yAxis = d3.axisLeft(ySmokesScale)

  	chartGroup.append("g")
  		.attr("transform", `translate(0, ${height})`)
  		.call(xAxis);

  	chartGroup.append("g")
  		.call(yAxis);

  	var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xIncomeScale(d.income))
        .attr("cy", d => ySmokesScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "orange")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        .attr("opacity", ".5");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smoking Rate");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Income in USD");

	var text = circlesGroup.selectAll("text")
		.data(healthData)
		.enter()
		.append("text")
		.attr("")

  })
