
// Set the dimensions and margins of the graph. You don't need to change this.
const margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


/* SVG_SCATTER WILL REPRESENT THE CANVAS THAT YOUR SCATTERPLOT WILL BE DRAWN ON */
// Append the svg object to the body of the page. You don't need to change this.
const svg_scatter = d3.select("#my_scatterplot")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

// *NEW*: Canvas for the scatterplot legend
// You can change properties of the SVG if you'd like, but it's not necessary
const svg_scatter_legend = d3.select("#scatterplot_legend")
                .append("svg")
                .attr("width", 500)
                .attr("height", 50)
                .append("g")
                .attr("transform", `translate(${margin.left + 55},${margin.top - 10})`);

/* SVG_BAR WILL REPRESENT THE CANVAS THAT YOUR BARCHART WILL BE DRAWN ON */
// Append the svg object to the body of the page. You don't need to change this.
const svg_bar = d3.select("#my_barchart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

// *NEW*: Canvas for the barchart legend
// You can change properties of the SVG if you'd like, but it's not necessary
const svg_bar_legend = d3.select("#barchart_legend")
                .append("svg")
                .attr("width", 500)
                .attr("height", 50)
                .append("g")
                .attr("transform", `translate(${margin.left + 55},${margin.top - 10})`);


// Read the iris dataset
d3.csv("/iris.csv").then(function(data){

    /**********************************************************  
     TO DO: Complete the scatter plot tasks

     NOTE: Below, we outline "to do" tasks that correspond
     to the tasks in your handout. These to do's are meant
     to help guide you towards a correct solution, however,
     you may implement your code in whichever way you'd like.
    **********************************************************/

    // TO DO: Create a list of options for the axes dropdowns (all numerical attribute)
    var scatterAxesOptions = ["sepal.length", "sepal.width", "petal.length", "petal.width"];

    // add the options to the X-axis dropdown
    // The below code should not need to be changed
    d3.select("#xAxisDropdown")
      .selectAll('option')
     	.data(scatterAxesOptions)
      .enter()
    	.append('option')
      .attr("value", function (d) { return d; }) // corresponding value returned by the button
      .text(function (d) { return d; }) // text showed in the menu
    // assign dropdown value to the selected y axis
    var selectedXAxisOption = d3.select("#xAxisDropdown").property("value");

    // TO DO: add the options to the Y-axis dropdown, fix below
    // d3.select(...)

    // TO DO: define the selectedYAxisOption
    d3.select("#yAxisDropdown")
      .selectAll('option')
        .data(scatterAxesOptions)
      .enter()
        .append('option')
      .attr("value", function(d) {return d;})
      .text(function (d) {return d;})

    var selectedYAxisOption = d3.select("#yAxisDropdown").property("value");

    // TO DO: Create a legend for the scatterplot
    // scatter_color_classes is an array of objects, with iris varieties and their colors
    // change this if you used different colors in your scatterplot
    var scatter_color_classes = [{variety: "Versicolor", color:"#a6cee3"} , 
                                 {variety:"Virginica", color:"#b2df8a"}, 
                                 {variety:"Setosa", color:"#1f78b4"}]
    
    // var color_classes_map = new Map(scatter_color_classes)

    // draw the colored dots
    svg_scatter_legend.append("g")
        .selectAll("dot")
        .data(scatter_color_classes)
        .join("circle")
        // TO DO: FINISH THESE
        // Hint for cx: you might want to utilize i (the index being iterated on for the current datum)
        .attr("cx", function(d, i) {
            console.log(i);
            return i*440/3;
        })
        .attr("cy", function(d) {
            return 20;
        })
        .attr("r", 6)
        .attr("stroke", "black")
        .attr("stroke-weight", 1)
        .style("fill", function(d) {
            console.log(Object.values(d)[1])
            // return color_classes_map.get(Object.keys(d));
            return Object.values(d)[1]
        })

    // create the legend title
    svg_scatter_legend.append("text")
        // TO DO: FINISH THESE
        .attr("x", margin.left+55)
        .attr("y", 0)
        .text("Iris Variety")
        .style("font-size", "12px")
        .attr("alignment-baseline","middle")

    // add text labels for the dots in the legend 
    // TO DO: Finish these
    svg_scatter_legend.selectAll("legend.label")
        .data(scatter_color_classes)
        .enter()
        .append("text")
        .attr("x", function(d, i) {
            return 7+i*440/3;
        })             
        .attr("y", 21)
        .style("font-size", "12px")
        .attr("alignment-baseline","middle")
        .text(function (d) { 
            return Object.values(d)[0];
        });
    
    // Call drawScatter() here to draw the first instance of our plot
    drawScatter();


    /************************************************************************************
        drawScatter(): updates the scatterplot after a dropdown menu item is selected
        Special note: This function needs to wrap around your entire scatter plot code
        and be called after a dropdown menu item is selected. If not, the plot won't
        be updated accordingly, as the scatterplot will otherwise only be drawn once 
    *************************************************************************************/
    // ADD YOUR SCATTERPLOT CODE HERE AND UPDATE IT FOR THE TASKS
    function drawScatter() {
        // THIS LINE CLEARS THE SCATTERPLOT CANVAS, as they are redrawn every time a dropdown is selected 
        // Although this is a bit of a hacky workaround, this line will simplify everything for you down the line. 
        svg_scatter.selectAll('*').remove();

        // TO DO: Compute x-axis min and max using dropdown choice
        // HINT: It may help to do...
            // var x_axis_min = d3.min(data, function(d){return d[selectedXAxisOption]});
            //  var x_axis_max = ....


        // TO DO: Compute x-axis scale using the above computed min and max, using your original lab 4 code
        // var sepal_length_min = 3.7
        // var sepal_length_max = 8
        var x_axis_min = d3.min(data, function(d){
            return d[selectedXAxisOption];
        })-0.5;
        var x_axis_max = d3.max(data, function(d){
            return d[selectedXAxisOption];
        });
    
        // TO DO: Implement the x-scale domain and range for the x-axis
        var xScale_scatter = d3.scaleLinear()
                                // TO DO: Fill these out
                                .domain([x_axis_min, 1.05*x_axis_max])
                                .range([0, width])
    
        // TO DO: Append the scaled x-axis tick marks to the svg
    
        svg_scatter.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale_scatter).tickSize(-height)
            .tickFormat(''));
    
        svg_scatter.append("g")
            .attr("class", "xAxis")
            .style("font", "11px monaco")
            .attr("transform", `translate(0, ${height})`)
            // TO DO: Explain the following line of code in a comment
            // d3.axisBottom creates the bottom axis using our designed x-scale domain. This line calls the axisBottom function
            // so that x-axis could be drawn in the svg
            .call(d3.axisBottom(xScale_scatter))
    
    
    
        // TO DO: Create a scale for the y-axis that maps the y axis domain to the range of the canvas height
        // Hint: You can create variables to represent the min and max of the y-axis values
        // TO DO: Fix these
        // var petal_length_min = 0.5
        // var petal_length_max = 7.3
        var y_axis_min = d3.min(data, function(d){
            return d[selectedYAxisOption]-0.5;
        });
        var y_axis_max = d3.max(data, function(d){
            return d[selectedYAxisOption];
        })
    
        var yScale_scatter = d3.scaleLinear()
                            // TO DO: Fill these out
                            .domain([y_axis_min, 1.05*y_axis_max])
                            .range([height, 0])
    
        // TO DO: Append the scaled y-axis tick marks to the svg
    
        svg_scatter.append("g")
                .attr('class', 'y axis')
                .call(d3.axisLeft(yScale_scatter).tickSize(-width)
                .tickFormat(''))
    
        svg_scatter.append("g")
                .attr("class", "yAxis")
                .style("font", "11px monaco")
                .call(d3.axisLeft(yScale_scatter))

        svg_scatter.append("text")
            .attr("id", "scatterTooltip")
            .attr("opacity", 0)
            .style("padding", "10px")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16px");
    
    
        // TODO: Draw scatter plot dots here
        svg_scatter.append("g")
            .selectAll("dot")
            // TO DO: Finish the rest of this
            .data(data)
            .join('circle')
            .attr("cx", function(d) {
                // console.log(d[selectedYAxisOption]);
                return xScale_scatter(d[selectedXAxisOption]);
            })
            .attr("cy", function(d) {
                return yScale_scatter(d[selectedYAxisOption]);
            })
            .attr("r", 6)
            .attr("stroke", "black")
            .attr("stroke-weight", 1)
            // .style('fill', "#3182bd")
            .style("fill", function(d) {
                if (d["variety"] == "Setosa") {
                    return "#3182bd";
                }
                if (d["variety"] == "Versicolor") {
                    return "#9ecae1";
                }
                if (d["variety"] == "Virginica") {
                    return "#a1d99b"
                }
            })
            .on("mouseover", function(event, d) {
                // TO DO: Change the radius size on hover
                d3.select(this).style("r", 10)
                console.log(event.pageX)
            
                // TO DO: Add and position text to display x-axis values & y-axis label
                svg_scatter.select("#scatterTooltip")
                    .attr("x", 10)
                    .attr("y", 15)
                    .text(selectedXAxisOption + ": " + d[selectedXAxisOption]) // This should be '<x-axis label>: <x-axis value>'
                    .attr("opacity", 10);

                // TO DO: Add and position text to display y-axis values & y-axis label
                svg_scatter.select("#scatterTooltip").append("tspan")
                    .attr("x", 10)
                    .attr("y", 33)
                    .text(selectedYAxisOption + ": " + d[selectedYAxisOption]) // This should be '<y-axis label>: <y-axis value>'
                    .attr("opacity", 1);

                // TO DO: Add and position text to display the variety
                svg_scatter.select("#scatterTooltip").append("tspan")
                    .attr("x", 10)
                    .attr("y", 51)
                    .text("Variety: " + d["variety"]) // This should be 'Variety: <variety value>'
                    .attr("opacity", 1);
            })
            // Code to 'remove' the tooltip information
            .on("mouseleave", function(d) {
                // TO DO: Change the radius size when not hovered
                d3.select(this).style("r", 6)

                // TO DO: remove tooltip when data point not being hovered
                svg_scatter.select("#scatterTooltip")
                    .transition()
                    .duration(150)
                    .attr("opacity", 0) // FIX THIS
            })
    
        // TO DO: X axis label
        // svg_scatter.append("text")
        //     .attr("text-anchor", "end")
        //     // TO DO: Finish these...
        //     .attr("x", width)
        //     .attr("y", height+margin.top+20)
        //     .text(selectedXAxisOption)
            
        // TO DO: Y axis label
        /*svg_scatter.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            // TO DO: Finish these...
            .attr("y", -margin.left+20)
            .attr("x", -margin.top)
            .text(selectedYAxisOption)
            */
    
        // TO DO: Chart title
        svg_scatter.append("text")
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            // TO DO: Finish these...
            .attr("x", 0.5*width)             
            .attr("y", -10)
            .text(selectedYAxisOption+" vs. "+selectedXAxisOption);


        // TO DO: Append the scaled x-axis tick marks to the svg
        // TO DO: Add X axis label based on dropdown choices
        svg_scatter.append("text")
            .attr("class", "xAxisLabel")
            .attr("text-anchor", "end")
            .attr("x", width - 20)
            .attr("y", height + margin.top + 10)
            // Update x-axis label based on dropdown choice
            .text(function (d) { 
                return selectedXAxisOption; // FIX THIS
            })
            
        // TO DO: Add Y axis label based on dropdown choices
        svg_scatter.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top)
            // Update y-axis label based on dropdown choice
            .text(function (d) { 
                return selectedYAxisOption; // FIX THIS
            })
        
        // var tip = d3.select("body").append("div")
        //     .attr("class", "tooltip")
        //     .style("opacity", 0)
        // // Add events to circles
        // dots.on("mouseover", function(d) {
        //   tip.style("opacity", 1)
        //      .html(d["variety"] + "<br/> "+ selectedXAxisOption + ": " + d[selectedXAxisOption] + "<br/>" + selectedYAxisOption + ": " + d[selectedYAxisOption])
        //      .style("left", (d3.event.pageX-25) + "px")
        //      .style("top", (d3.event.pageY-75) + "px")
        //   })
        //   .on("mouseout", function(d) {
        //     tip.style("opacity", 0)
        //   })
    }
  
    // TO DO: Run the appropriate code when the dropdown menu is selected for x-axis choice
    // NOTE: We provide the below code to help you, you do not need to change it.
    d3.select("#xAxisDropdown").on("change", function(d) {
        console.log("inside xAxisDropdown(), x-axis has been changed to ", d3.select(this).property("value"))

        selectedXAxisOption = d3.select(this).property("value")
        // run the drawScatter function
        drawScatter();
    })

    // TO DO: Run the appropriate code when the dropdown menu is selected for y-axis choice
    d3.select("#yAxisDropdown").on("change", function(d) {
        // TO DO: FINISH THIS FUNCTION
        console.log("inside yAxisDropdown(), y-axis has been changed to ", d3.select(this).property("value"))

        selectedYAxisOption = d3.select(this).property("value")
        // run the drawScatter function
        drawScatter();
    })


    /**********************************************************  
     TO DO: Complete the bar chart tasks

     NOTE: Below, we outline "to do" tasks that correspond
     to the tasks in your handout. These to do's are meant
     to help guide you towards a correct solution, however,
     you may implement your code in whichever way you'd like.
    **********************************************************/

    // TO DO: Calculate domain for AVG values
    // Add the values to your array
    // Compute the maximum and minimum values from the average values to use for later

    // TO DO: Calculate domain for MAX values
    // Add the values to your array
    // Compute the maximum and minimum values from the MAX values to use for later

    // TO DO: Calculate domain for MIN values
    // Add the MIN values to your array
    // Compute the maximum and minimum values from the MIN values to use for later

    // Create a scale for the x-axis that maps the x axis domain to the range of the canvas width
    xDomain = ['sepal.length','sepal.width','petal.length','petal.width']
    var xScale_bar = d3.scaleBand()
                .domain(xDomain)
                .range([0, width])
                .padding(0.4)

    // Variables to use for our bar chart. Update them in the drawBarChart()... function
    // NOTE: These values are given to you as a hint for how to implement the tasks below
    var all_y_values, min_y_value, max_y_value

    // For the first drawing, send in AVG as the default radio button
    // Call drawBarChart("AVG") here to draw the first instance of our plot
    drawBarChart("AVG");

    /************************************************************************************
        drawBarChart(radioValue): updates the bar chart after a radio button is selected
        radioValue: the string value selected from the radio button (AVG, MAX, MIN)

        Special note: This function needs to wrap around your entire scatter plot code
        and be called after a radio button is selected. If not, the plot won't
        be updated accordingly, as the bar chart will otherwise only be drawn once.

        Use "radioValue" to help as logic for assigning values in the chart.
        This route is one possible solution. There are others, but we suggest 
        you use this hint to implement yours.
    *************************************************************************************/
    // ADD YOUR BAR CHART CODE HERE AND UPDATE IT FOR THE TASKS
    function drawBarChart(radioValue) {
        // CLEAR THE BAR CHART & LEGEND CANVAS, as they are redrawn every time a radio button is selected 
        // Although this is a bit of a hacky workaround, this line will simplify everything for you down the line. 
        svg_bar.selectAll('*').remove();
        svg_bar_legend.selectAll('*').remove();

        // TO DO: Add logic for if the radio button is AVG, MAX, MIN
        // Note that "all_y_values" should be the entire array of corresponding values
        // "min_y_value" should be the minimum value in the array, and max_y_value should be the max value
        all_y_values = []
        sorted_values = []
        if (radioValue === "AVG") {
            // all_y_values = [] // FIX THIS
            for (let i = 0; i < xDomain.length; i++) {
                let prop = xDomain[i]
                all_y_values.push({i: d3.mean(data, function(d){
                    return d[prop];
                }),
                name:xDomain[i]});
                sorted_values.push(d3.mean(data, function(d){
                    return d[xDomain[i]];
                }))
            }
            // min_y_value = d3.min(all_y_values, function(d){
            //     return Object.values(d)[0]
            // }) // FIX THIS
            // max_y_value = d3.max(all_y_values, function(d){
            //     return Object.values(d)[0]
            // }) // FIX THIS
            // console.log(min_y_value)
        } else if (radioValue === "MAX") {
            for (let i = 0; i < xDomain.length; i++) {
                let property = xDomain[i]
                all_y_values.push({property : d3.max(data, function(d){
                    return d[property];
                }),
                name:xDomain[i]});
                sorted_values.push(d3.max(data, function(d){
                    return d[xDomain[i]];
                }))
            }
        } else {
            for (let i = 0; i < xDomain.length; i++) {
                let property = xDomain[i]
                all_y_values.push({property : d3.min(data, function(d){
                    return d[property];
                }),
                name:xDomain[i]});
                sorted_values.push(d3.min(data, function(d){
                    return d[property];
                }))
            }
        } 

        min_y_value = d3.min(all_y_values, function(d){
            return Object.values(d)[0]
        }) // FIX THIS
        max_y_value = d3.max(all_y_values, function(d){
            return Object.values(d)[0]
        }) // FIX THIS

        for(let i = 0; i < xDomain.length; i++) {
            for( let j = i+1; j < xDomain.length; j++) {
                if(sorted_values[i] > sorted_values[j]) {
                    let temp = sorted_values[i];
                    sorted_values[i] = sorted_values[j];
                    sorted_values[j] = temp;
                }
            }
        }

        for(let i = 0; i < all_y_values.length; i++) {
            for(let j = 0; j < xDomain.length; j++) {
                if(Object.values(all_y_values[i])[0] == sorted_values[j]) all_y_values[i].sorted = j;
            }
        }

        console.log(max_y_value)
  
        // TO DO: Create the legend
        // This array of objects encodes each iris variety to an assigned color
        var bar_classes = ["#fee5d9", "#fcae91", "#fb6a4a", "#cb181d"]

        // FIX THESE
        // Rectangles for legend
        svg_bar_legend.append("g")
            .selectAll("rect")
            .data(bar_classes)
            .join("rect")
            // Update the data being drawn based on the user's dropdown choices
            .attr("x", function(d,i) { return i*67; })
            .attr("cy", 10)
            .attr("width", 67)
            .attr("height", 20)
            .style("fill", function(d) { 
                console.log(d);
                return d; 
            })

        // FIX THESE
        // Legend title
        svg_bar_legend.append("text")
            .attr("x", 85)
            .attr("y", -10)
            .text("Range of Values")
            .style("font-size", "12px")
            .attr("alignment-baseline","middle")

        // FIX THESE
        // Legend minimum value on the left
        svg_bar_legend.append("text")
            .attr("x", -20)
            .attr("y", 10)
            .text(Math.round(min_y_value * 100) / 100) // This rounds to 2 decimal places
            .style("font-size", "12px")
            .attr("alignment-baseline","middle")

        // FIX THESE
        // Legend maximum value on the right
        svg_bar_legend.append("text")
            .attr("x", 4*67)
            .attr("y", 10)
            .text(Math.round(max_y_value * 100) / 100)
            .style("font-size", "12px")
            .attr("alignment-baseline","middle")

        // TO DO: Add your original x-axis tick marks and value

        // TO DO: Add your original sequential color map

        // TO DO: Add domain/range for y-axis, using the radio button selection
        var yScale_bar = d3.scaleLinear()
                    .domain([0, (1.05 * max_y_value)])
                    .range ([height, 0])

        // TO DO: Add your original y-axis tick marks and values

        svg_bar.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale_bar))
        // ....
        .selectAll("text")
            .style("text-anchor", "middle")
            .style("font", "10px monaco");

    svg_bar.append("g")
        .attr('class', 'x axis')
        .call(d3.axisBottom(xScale_bar).tickSize(height).tickFormat('').ticks(4))

    // TO DO: Create a scale for the y-axis that maps the y axis domain to the range of the canvas height
        
    // TO DO: Finish this

    svg_bar.append("g")
                .attr("class", "yAxis")
                .style("font", "11px monaco")
                .call(d3.axisLeft(yScale_bar))


    svg_bar.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale_bar).tickSize(-width).tickFormat('').ticks(10))

        // TO DO: Append bars to the bar chart with the appropriately scaled height
        // Make sure the height corresponds to the radio button selection
        // Color the bars using the sequential color map
        svg_bar.selectAll("bar")
          .data(all_y_values)
          .enter()
          .append("rect")
          .attr("stroke", 'black') 
          .attr("x", function(d) { 
            // console.log(Object.values(d)[1]);
            return xScale_bar(Object.values(d)[1]); 
        })
          .attr("y", function(d) { 
            // console.log(yScale_bar(Object.values(d)[0]));
            return yScale_bar(Object.values(d)[0]); 
        })
          .attr("width", xScale_bar.bandwidth())
          .attr("height", function(d) { 
            // console.log(Object.values(d)[0])
            return height-yScale_bar(Object.values(d)[0]); 
        })
          .attr("fill", function(d) {
            console.log(bar_classes[Object.values(d)[2]])
            return bar_classes[Object.values(d)[2]];
          })

        // TO DO: Add y-value for each bar, above the bar. Make sure y-value corresponds to radio button
        svg_bar.selectAll("bar-title")
             .data(all_y_values)
             .enter()
             .append("text")
             .classed('bar-title', true)
             .attr('text-anchor', 'middle')
             .attr("x", (d) => xScale_bar(Object.values(d)[1])+28) // Make sure x position is in line with the x-tick mark
             .attr("y", (d) => yScale_bar(Object.values(d)[0])-5) // Make sure y position is above the bar
             .style("font", "11px monaco")
             .text((d) =>Math.round(Object.values(d)[0] * 100) / 100) // Rounds value to 2 decimal places

        // Append original x-axis label
            
        // TO DO: Append y-axis label corresponding to radio button selection
        
        // TO DO: Append bar chart title corresponding to radio button selection

        // TO DO: Draw gridlines for both charts 
        svg_bar.append("text")
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            // TO DO: Finish these...
            .attr("x", 0.5*width)             
            .attr("y", -10)
            .text(radioValue+" Values Per Attribute");


        // TO DO: Append the scaled x-axis tick marks to the svg
        // TO DO: Add X axis label based on dropdown choices
        svg_bar.append("text")
            .attr("class", "xAxisLabel")
            .attr("text-anchor", "end")
            .attr("x", width - 20)
            .attr("y", height + margin.top + 10)
            // Update x-axis label based on dropdown choice
            .text("Attribute")
            
        // TO DO: Add Y axis label based on dropdown choices
        svg_bar.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top)
            // Update y-axis label based on dropdown choice
            .text(radioValue)
    }
    
    // The below code works similarly to the scatter plot's dropdown change function
    // Every time a radio button is selected, the function should call the drawBarChart(...)
    // function with the value being selected.
    d3.selectAll(("input[name='barChartButton']")).on("change", function() {
        console.log("radio button changed to ", this.value);

        // TO DO: Fix this
        // console.log(d3.select("input[name='barChartButton']").property("value"))
        drawBarChart(this.value);
        
    });
})