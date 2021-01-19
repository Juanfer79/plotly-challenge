d3.json("samples.json").then(function(data) {
    var id_samples = data.names;
    var testMetadata = data.metadata;

    console.log(data);
    console.log(testMetadata);
    console.log(testMetadata[0]);
    console.log(testMetadata[1].ethnicity);

    /* var x = `${id_samples[1]}`;
    var y = Object.keys(id_samples);
    console.log (y)
    var us = Object.values(data.samples[0]);
     console.log (us);*/

// Using d3 to append a blank option element in the list    
    d3.select("#selDataset").append("option");     
//  Loop to append all samples ids to selDataset  
    for (let i=0; i<id_samples.length; i++){
        var newOption = document.createElement("option");
        var node = document.createTextNode(id_samples[i]); 
        newOption.appendChild(node);
        newOption.setAttribute("value", i);
        document.getElementById("selDataset").append(newOption);
    }
});

var dropdownMenu = d3.select("#selDataset");