var dataOffset = 5;

var tooltip = d3.select("body").append("div")
	.classed("tooltip", true)
	.style("position", "absolute")
	.style("padding", "0 10px")
	.style("background", "white")
	.style("opacity", "0")
;

var chart = d3.select("#infograph").append("svg")
	.attr("width", 200)
	.attr("height", 500)
	.style("background", "lightblue")
	.selectAll("rect").data(pixarMovies.data)
	.enter().append("rect")
		.style("fill", "orange")
		.attr("width", 20)
		.attr("height", 20)
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
	.exit()
;