// read the data set and incorporate into JS

d3.json("samples.json").then(function(dataRead) {
    var testId = dataRead.names;
    var datasetTest = dataRead.metadata;

    console.log(dataRead);
    console.log(datasetTest);
    console.log(datasetTest[0]);
    console.log(datasetTest[1].ethnicity);



 // Create append funciton in D3 to use the list

      d3.select("#selDataset").append("option");     

      for (let test=0; test<testId.length; test++){
        var idSelect = document.createElement("option");
        var selection = document.createTextNode(testId[test]); 
        idSelect.appendChild(selection);
        idSelect.setAttribute("value", test);
        document.getElementById("selDataset").append(idSelect);
    }
});
;

// DOM Selection calling the Function

function optionChanged() {
    var ddmenu = d3.select("#selDataset");
    var selection = ddmenu.property("value");
    console.log(selection);
    d3.json("samples.json").then(function(dataRead) {
                
    // create horizontal chart

        var x_values = Object.values(dataRead.samples[selection].sample_values).slice(0,10);
        var y_values = Object.values(dataRead.samples[selection].otu_ids).slice(0,10);
        var hover_values = Object.values(dataRead.samples[selection].otu_labels).slice(0,10);
        console.log(x_values);
        console.log(y_values);
        console.log(hover_values);
        
        var traceBar = {
            x: x_values,
            y: y_values.map(d => `OTU ${d}`), 
            hovertext: hover_values,
            orientation: 'h',
            type: "bar",
            
        };
        var dataBar = [traceBar];
        var layout = {
            title: 'Operational Taxonomy Units', //`${stock} closing prices`,
        };
        Plotly.newPlot('bar', dataBar, layout);

        // Population of table with Opertinal Taxonomy unit data

  var metadata = Object.values(dataRead.metadata[selection]);
  console.log(metadata)
 
  d3.select("#sample-metadata").html("");
  d3.select("#sample-metadata").append("p").text(`id: ${metadata[0]}`);
  d3.select("#sample-metadata").append("p").text(`ethnicity: ${metadata[1]}`);
  d3.select("#sample-metadata").append("p").text(`gender: ${metadata[2]}`);
  d3.select("#sample-metadata").append("p").text(`age: ${metadata[3]}`);
  d3.select("#sample-metadata").append("p").text(`location: ${metadata[4]}`);
  d3.select("#sample-metadata").append("p").text(`bbtype: ${metadata[5]}`);
  d3.select("#sample-metadata").append("p").text(`wfreq: ${metadata[6]}`);

    // Buble Chart 
    
        var x = Object.values(dataRead.samples[selection].otu_ids);
        var y = Object.values(dataRead.samples[selection].sample_values);
        var size = Object.values(dataRead.samples[selection].sample_values);
        var colors = Object.values(dataRead.samples[selection].otu_ids);
        var labels = Object.values(dataRead.samples[selection].otu_labels);
    
        console.log(x);
        console.log(y);
        console.log(size);
        console.log(colors);
        console.log(labels);

        var trace1 = {
        x: x,
        y: y,
        text: labels,
        mode: 'markers',
        marker: {
            size: size,
            color: colors
        }
        };

        var dataBubble = [trace1];

        var layout = {
            title: 'OTU Bubble Chart',
            showlegend: true,
        };

        Plotly.newPlot('bubble', dataBubble, layout);
    
    
    // Gauge Grap coding 

        console.log(metadata[6]);

        var dataGauge = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: metadata[6],
              title: { text: "BB Washing Frequency (Scrubs per Week)" },
              type: "indicator",
              mode: "gauge+number+delta",
              delta: { reference: 1 },
              gauge: {
                axis: { range: [null, 10] },
                steps: [
                  { range: [0, 1], color: "lightgray" },
                  { range: [1, 2], color: "lightgray" },
                  { range: [2, 3], color: "gray" },
                  { range: [3, 4], color: "gray" },
                  { range: [4, 5], color: "yellow" },
                  { range: [5, 6], color: "yellow" },
                  { range: [6, 7], color: "lightgreen" },
                  { range: [7, 8], color: "lightgreen" },
                  { range: [8, 9], color: "darkgreen" },
                  { range: [9, 10], color: "darkgreen" }                  
                ],
                threshold: {
                  line: { color: "red", width: 5 },
                  thickness: 1,
                  value: 2
                }
              }
            }
          ];
        var layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', dataGauge, layout);
    });
}