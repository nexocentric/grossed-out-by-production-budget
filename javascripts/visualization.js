var dataOffset = 40;
var maxBoxSize = 30;
var movieBudgets = groupData(pixarMovies.data, "budget");
var movieGrosses = groupData(pixarMovies.data, "worldwideGross");

function groupData(data, property) {
	dataArray = new Array(data.length);
	data.forEach(function(currentValue, index) {
		console.log(currentValue);
		dataArray[index] = currentValue[property]
	});
	console.log(dataArray);
	return dataArray;
}

var tooltip = d3.select("body").append("div")
	.classed("tooltip", true)
	.style("position", "absolute")
	.style("padding", "0 10px")
	.style("background", "white")
	.style("opacity", "0")
;

var budgetScale = d3.scaleLinear()
	.domain([3, d3.max(movieGrosses)])
	.range([3, maxBoxSize])
;

var chart = d3.select("#infograph").append("svg")
	.attr("width", 200)
	.attr("height", 500)
	.style("background", "lightblue")
;
	
chart.selectAll(".gross-profit").data(pixarMovies.data)
	.enter().append("rect").classed("gross-profit", true)
	.style("fill", "black")
	.style("opacity", .1)
	.attr("width", function(data) {
		return (budgetScale(data.worldwideGross) / maxBoxSize) * 100;
	})
	.attr("height", function(data) {
		return (budgetScale(data.worldwideGross) / maxBoxSize) * 100;
	})
	.attr("x", 20)
	.attr("y", function(data, index) {
		return index * (20 + dataOffset);
	})
;

chart.selectAll(".allocated-budget").data(pixarMovies.data)
	.enter().append("rect")
	.style("fill", "orange")
	.attr("width", function(data) {
		return (budgetScale(data.budget) / maxBoxSize) * 100;
	})
	.attr("height", function(data) {
		return (budgetScale(data.budget) / maxBoxSize) * 100;
	})
	.attr("x", 20)
	.attr("y", function(data, index) {
		return index * (20 + dataOffset);
	})

	.on("mouseover", function(data) {
		tooltip.transition()
			.style("opacity", .5);
		tooltip.html(data.releaseDate)
			.style("left", (d3.event.pageX) + "px")
			.style("top",  (d3.event.pageY) + "px");
	})
;