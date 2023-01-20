(function () {
	// Source
	// https://www.youtube.com/watch?v=lPr60pexvEM&list=PLewNEVDy7gq1qWBGS2BSOqND6c3DLt2CV&index=1&t=7s&ab_channel=JonathanSoma
	// https://www.youtube.com/watch?v=FUJjNG4zkWY&list=PLewNEVDy7gq1qWBGS2BSOqND6c3DLt2CV&index=3&ab_channel=JonathanSoma

	// Set the dimensions of the canvas / graph
	let width = 1000,
		height = 500;

	let smallestSkill = 0; // Set the smallest value of the datapoints
	let largestSkill = 100; // Set the largest value of the datapoints
	let smallestCircle = 5; // Set the radius of the smallest circle
	let largestCircle = 50; // Set the radius of the largest circle
	let circleGap = 5; // Set the gap between the circles

	// Create and add the SVG to the page
	var svg = d3
		.select("#chart")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(0,0)");

	var defs = svg.append("defs");
	defs
		.append("pattern") // Append a pattern tag to the svg
		.attr("id", "image") // Set up its attributes
		.attr("height", "100%")
		.attr("width", "100%")
		.attr("patternContentUnits", "objectBoundingBox")
		.append("image")
		.attr("height", 1)
		.attr("width", 1)
		.attr("preserveAspectRatio", "none")
		.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
		.attr("xlink:href", "GraphQL Logo.png");
	// .attr("xlink:href", "assets/images/");

	// Define the scale for the radius of the circles
	var radiusScale = d3.scaleSqrt().domain([smallestSkill, largestSkill]).range([smallestCircle, largestCircle]);

	// Create the simulation and add forces
	var simulation = d3
		.forceSimulation()
		.force("x", d3.forceX(width / 2).strength(0.05)) // Add a force to push the nodes to the center of the SVG in the x direction
		.force("y", d3.forceY(height / 2).strength(0.05)) // Add a force to push the nodes to the center of the SVG in the y direction
		.force(
			"collide",
			d3.forceCollide(function (d) {
				return radiusScale(d.value) + circleGap; // Set the radius of the circle to the value of the datapoint
			})
		); // Add a force to prevent the nodes from overlapping

	// Grab the data from the CSV file
	d3.queue().defer(d3.csv, "/assets/data/skills.csv").await(ready);

	function ready(error, datapoints) {
		// Add the patterns to the SVG
		defs
			.selectAll(".artist-pattern")
			.data(datapoints)
			.enter()
			.append("pattern")
			.attr("class", "artist-pattern")
			.attr("id", function (d) {
				return d.name;
			}) // Set up its attributes
			.attr("height", "100%")
			.attr("width", "100%")
			.attr("patternContentUnits", "objectBoundingBox")
			.append("image")
			.attr("height", 1)
			.attr("width", 1)
			.attr("preserveAspectRatio", "none")
			.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
			.attr("xlink:href", function (d) {
				return d.image_path;
			});

		// Add circles to the SVG
		var circles = svg
			.selectAll(".artist")
			.data(datapoints)
			.enter()
			.append("circle")
			.attr("class", "artist")
			.attr("r", function (d) {
				return radiusScale(d.value); // Set the radius of the circle to the value of the datapoint
			})
			.attr("fill", function (d) {
				return "url(#" + d.name + ")";
			}) // Set the fill of the circle to the image
			.on("mouseover", function (d) {
				// When the mouse hovers over the circle, show the tooltip
				//Tooltip.style("display", null);
			})
			.on("click", function (d) {
				// When the user clicks on a circle, log the data to the console
				console.log(d);
			});

		// Add the ticked function to the simulation
		simulation.nodes(datapoints).on("tick", ticked);

		// Create a function that will be called on each tick
		function ticked() {
			circles
				.attr("cx", function (d) {
					return d.x;
				})
				.attr("cy", function (d) {
					return d.y;
				});
		}
	}
})();
