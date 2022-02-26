
d3.json("data/json_data/messi_goals.json").then(function(data) {
       console.log("Check D3 JSON Messi Goals Data:",data);

});

const url = "data/json_data/messi_goals.json";
var data_test;

// Promise Pending
const data_Messi_Goals = d3.json(url);

data_Messi_Goals.then(function (data) {
    const assisted_list = data.assisted;
    const date_list = data.date;
    const min_list = data.min;
    const assisted_id = data.id
    

    console.log("Assisted Name:",assisted_list);
    console.log("ID: ", assisted_id);
    // console.log("Date:", date_list);
    // console.log("Min: ", min_list);

    test_list = [];
    

    // For loop to go through all names
    for (let i = 0; i < assisted_list.length; i++) {
        // Variable to hold current movie in loop
        let assist_number = assisted_list[i];
        // console.log(`ID:`, sample_number.id, sample_number.otu_ids)
        test_list.push(assisted_id.id);

    }

    // console.log('The test list:', test_list)

    empty_list = [];

    for (let i = 0; i < test_list.length; i++) {
        empty_list = empty_list.concat(test_list[i]);
    }

    console.log(`Assisted ID's`, empty_list);

    const counts = {};
    empty_list.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    console.log('Counts per Otu ID:',counts)

    var data_test = data;

    // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    var dropdown_button = document.getElementById("selDataset");
    var list_of_names = data.names;
    // var selectList = document.createElement("select")
    // selectList.setAttribute("id", "test");
    // dropdown_button.appendChild(selectList);

    for (var i = 0; i < list_of_names.length; i++) {
        var name_outcome = list_of_names[i];
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        var optionElement = document.createElement("option");
        // cannot be out side of for loop... because this code going each by each test subject ID No. and if its outside of for loop,
        //  it will be the last test subject ID Number

        // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
        optionElement.textContent = name_outcome;
        // // Has the list of data[names]: ['940', '941', '943', '944', '945', '946', '947', '948', '949', etc.] only the strings
        // // this is also the id numbers for data[metadata]
        
        // // console.log('optionElement', optionElement.textContent)
        // // Prints out...
        // // optionElement 940
        // // optionElement 941
        // // optionElement 942

        // // https://www.educba.com/javascript-values/
        optionElement.value = name_outcome;

        // console.log('optionElement', optionElement.value)
        // // Prints out...
        // // optionElement 940
        // // optionElement 941
        // // optionElement 942

        // Samething as | optionElement.textContent = name; | yet we text, its a string. We want both since we will be graphing

        // http://jsfiddle.net/4pwvg/ <--- DEMO

        dropdown_button.appendChild(optionElement);


    }

    const firstItem = list_of_names[0];
    build_Bar_Chart(firstItem, data);

    console.log("Data_test check for samples: ", data_test.samples);

    function build_Bar_Chart(itemid, data) {
        if (data === undefined)
            data = data_test;

        var data_samples = data.samples;

        var sample_Filter = data_samples.filter(sampleObject => sampleObject.id == itemid);
    
        var result = sample_Filter[0];
    
        var dataBar = [
            {
            x: result.sample_values.slice(0, 10).reverse(),
            y: result.otu_ids.slice(0, 10).map(val=>"OTU " + val).reverse(),
            type: 'bar',
            orientation: "h",
            text: result.otu_labels.slice(0, 10).reverse()
    
            }
        ];

        var layOut = {
            title: "Top 10 OTUs Found",
            yaxis:{
                // https://plotly.com/python/tick-formatting/
                // linear is for the y axis to become "numbers"
                tickmode:"linear",
            },
            margin: {
                // l for to the right of screen...the higher number is, the more right the graph will shift
                l: 100,
                // r for to the left of screen...the higher number is, the more left of graph will be
                r: 100,
                // t for away from title/towards bottom of screen...the higher number is, the more smaller and further away it is from title
                t: 100,
                // b for to the top of screen...the higher number is, the more it shifts its graph to the top of the page
                b:20
            }
        };
        Plotly.newPlot("bar", dataBar, layOut);
    }

    // var firstItem = list_of_names[0];
    build_Bubble_Chart(firstItem, data);
    console.log("Bubble Chart data_test samples check: ", data_test.samples)

    function build_Bubble_Chart(itemid, data) {
        if (data === undefined)
            data = data_test;
        var data_samples = data.samples;
        var sample_Filter = data_samples.filter(sampleObject => sampleObject.id == itemid);
    
        var result = sample_Filter[0];
    
        var dataBubble = [
            {
            x: result.otu_ids,
            y: result.sample_values,
            mode: 'markers',
            marker: {
                size: result.sample_values,
                color: result.otu_ids
            },
            orientation: "h",
            text: result.otu_labels
    
            }
        ];

        var layOut_2 = {
            xaxis: {title:"Otu ID"},
            height: 500, 
            width: 900
        };
        Plotly.newPlot("bubble", dataBubble, layOut_2);
    }

    build_Meta_Data(firstItem);
    console.log("Build Metadata data check: ", data_test.metadata)

    function build_Meta_Data(itemid, data) {
        if (data === undefined)
            data = data_test;

        console.log("Samples test:", data.metadata);

        var data_metadata = data.metadata;
        var sample_Filter = data_metadata.filter(sampleObject => sampleObject.id == itemid);
    
        var result = sample_Filter[0];

        var sample_metadata_panel = d3.select("#sample-metadata");
        sample_metadata_panel.html("")
        sample_metadata_panel.append("h6").text("id: " + itemid);
        sample_metadata_panel.append("h6").text("ethnicity: " + result.ethnicity);
        sample_metadata_panel.append("h6").text("gender: " + result.gender);
        sample_metadata_panel.append("h6").text("age: " + result.age);
        sample_metadata_panel.append("h6").text("location: " + result.location);
        sample_metadata_panel.append("h6").text("bbtype: " + result.bbtype);
        sample_metadata_panel.append("h6").text("wfreq: " + result.wfreq);
    };




});

    function build_Bar_Chart(test_subject_id, all_data) {
        if (all_data === undefined)
            all_data = data_test;
            console.log("bar chart all_data: ", all_data)

        var data_samples = all_data.samples;

        var sample_Filter = data_samples.filter(sampleObject => sampleObject.id == test_subject_id);
    
        var result = sample_Filter[0];
    
        var dataBar = [
            {
            x: result.sample_values.slice(0, 10).reverse(),
            y: result.otu_ids.slice(0, 10).map(val=>"OTU " + val).reverse(),
            type: 'bar',
            orientation: "h",
            text: result.otu_labels.slice(0, 10).reverse()
    
            }
        ];

        var layOut = {
            title: "Top 10 OTUs Found",
            yaxis:{
                // https://plotly.com/python/tick-formatting/
                // linear is for the y axis to become "numbers"
                tickmode:"linear",
            },
            margin: {
                // l for to the right of screen...the higher number is, the more right the graph will shift
                l: 100,
                // r for to the left of screen...the higher number is, the more left of graph will be
                r: 100,
                // t for away from title/towards bottom of screen...the higher number is, the more smaller and further away it is from title
                t: 100,
                // b for to the top of screen...the higher number is, the more it shifts its graph to the top of the page
                b:20
            }
        };
        Plotly.newPlot("bar", dataBar, layOut);
    };

    function build_Bubble_Chart(test_subject_id, all_data) {
        if (all_data === undefined)
            all_data = data_test;
            console.log("bubble chart all_data: ", all_data)

        var data_samples = all_data.samples;
        var sample_Filter = data_samples.filter(sampleObject => sampleObject.id == test_subject_id);
    
        var result = sample_Filter[0];
    
        var dataBubble = [
            {
            x: result.otu_ids,
            y: result.sample_values,
            mode: 'markers',
            marker: {
                size: result.sample_values,
                color: result.otu_ids
            },
            orientation: "h",
            text: result.otu_labels
    
            }
        ];

        var layOut_2 = {
            xaxis: {title:"Otu ID: " + test_subject_id},
            height: 500, 
            width: 900
        };
        Plotly.newPlot("bubble", dataBubble, layOut_2);
    };


    function build_Meta_Data(test_subject_id, all_data) {
        if (all_data === undefined)
            all_data = data_test;
            console.log("metadata all_data test:", all_data.metadata);

        var data_metadata = all_data.metadata;
        var sample_Filter = data_metadata.filter(sampleObject => sampleObject.id == test_subject_id);
    
        var result = sample_Filter[0];

        var sample_metadata_panel = d3.select("#sample-metadata");
        sample_metadata_panel.html("")
        sample_metadata_panel.append("h6").text("id: " + test_subject_id);
        sample_metadata_panel.append("h6").text("ethnicity: " + result.ethnicity);
        sample_metadata_panel.append("h6").text("gender: " + result.gender);
        sample_metadata_panel.append("h6").text("age: " + result.age);
        sample_metadata_panel.append("h6").text("location: " + result.location);
        sample_metadata_panel.append("h6").text("bbtype: " + result.bbtype);
        sample_metadata_panel.append("h6").text("wfreq: " + result.wfreq);
    };

// 'item' is needed because this will be the number of the test subject
function optionChanged(item) { 



    dataSamples.then(function (data_samples){

    
    build_Bar_Chart(item, data_samples);

    build_Bubble_Chart(item, data_samples);

    build_Meta_Data(item, data_samples);

    });
};
