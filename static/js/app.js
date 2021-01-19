


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

var ddmenu = d3.select("#selDataset");


