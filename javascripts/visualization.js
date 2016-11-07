var movieBudgets = groupData(pixarMovies.data, "budget");
var movieGrosses = groupData(pixarMovies.data, "worldwideGross");
var dataOffset = 40;
var maxBoxSize = 30;

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

var infographic = d3.select("#infograph")
	.append("svg")
	.attr("width", 200)
	.attr("height", 1100)
	.style("background", "lightblue")
;

var svgGroupElements = infographic.selectAll("g").data(pixarMovies.data)
	.enter()
	.append("g").attr("id", function(data){ return data.id; })
;

// svgGroupElements.each(function(data) {
// 	d3.select("#" + data.id)
// 	.enter()
// 	.append("rect").classed("gross-profit", true)
// 	.style("fill", "black")
// 	.style("opacity", .1)
// 	.attr("width", function(data) {
// 		return (budgetScale(data.worldwideGross) / maxBoxSize) * 100;
// 	})
// 	.attr("height", function(data) {
// 		return (budgetScale(data.worldwideGross) / maxBoxSize) * 100;
// 	})
// 	.attr("x", 20)
// 	.attr("y", function(data, index) {
// 		return index * (20 + dataOffset);
// 	})
// });

infographic.data(pixarMovies.data).selectAll("rect")
	.enter()
	.append("rect").classed("gross-profit", true)
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

infographic.selectAll(".allocated-budget").data(pixarMovies.data)
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

infographic.selectAll(".movie-title").data(pixarMovies.data)
	.enter().append("text").classed("movie-title", true)
	.style("fill", "black")
	.style("font-family", "sans-serif")
	.style("font-size", 15)
	.style("fill", "green")
	.html(function(data) { return data.title; })
	.attr("x", 20)
	.attr("y", function(data, index) {
		return index * (20 + dataOffset);
	})
;
