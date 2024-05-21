
var file;
var lines;		
var reader = new FileReader();
var setupPlotCalled = false;

reader.onload = function(event) {
	var data = event.target.result;
	lines = data.trim().split('\n');
	setupPlots();
	refreshPlots();
	plotBeam();
};

document.getElementById('fileInput').addEventListener('change', function() {
    file = this.files[0];	
    reader.readAsText(file);
});

document.getElementById('xAxis').addEventListener('change', function() {
    refreshPlots();
});

document.getElementById('yAxis1').addEventListener('change', function() {
    refreshPlots();
});

document.getElementById('yAxis2').addEventListener('change', function() {
    refreshPlots();
});

document.getElementById('yAxis3').addEventListener('change', function() {
    refreshPlots();
});

document.getElementById('yAxis4').addEventListener('change', function() {
    refreshPlots();
});

function setupPlots()
{
	// Only call setupPlots() once.
	if (setupPlotCalled)
		return;
	
	setupPlotCalled = true;
	
	// Display log file info lines
	document.getElementById('infoLine1').innerHTML = lines[1] + " " + lines[0];


	// Populate headers dynamically from the log file
	var optionValue = 0;
	var headerLine = lines[3].trim().split('\t');
	var selectXAxis = document.getElementById('xAxis');
	var selectYAxis1 = document.getElementById('yAxis1');
	var selectYAxis2 = document.getElementById('yAxis2');
	var selectYAxis3 = document.getElementById('yAxis3');
	var selectYAxis4 = document.getElementById('yAxis4');

    headerLine.forEach
	(
		function(headers)
		{
			var optionXAxis = document.createElement("option");
			var optionYAxis1 = document.createElement("option");
			var optionYAxis2 = document.createElement("option");
			var optionYAxis3 = document.createElement("option");
			var optionYAxis4 = document.createElement("option");
			
			optionXAxis.text = headers;
			optionXAxis.value = optionValue;
			selectXAxis.appendChild(optionXAxis);
			
			// Dont include Time in Y axis.  Null value as an option not to plot.
			if (optionValue == 0)
			{
				headers = "-"
			}
			
			optionYAxis1.text = headers;
			optionYAxis1.value = optionValue;
			selectYAxis1.appendChild(optionYAxis1);
			
			optionYAxis2.text = headers;
			optionYAxis2.value = optionValue;
			selectYAxis2.appendChild(optionYAxis2);
			
			optionYAxis3.text = headers;
			optionYAxis3.value = optionValue;
			selectYAxis3.appendChild(optionYAxis3);
			
			optionYAxis4.text = headers;
			optionYAxis4.value = optionValue;
			selectYAxis4.appendChild(optionYAxis4);
			
			optionValue++;
		}
	);
	
	// Set default values to plot
	selectYAxis1.value = 1;
	selectYAxis2.value = 0;
	selectYAxis3.value = 0;
	selectYAxis4.value = 0;
}

function refreshPlots()
{
	var data = [];
    var xData = [];
    var yData1 = [];
    var yData2 = [];
    var yData3= [];
    var yData4 = [];
	var setPlotVisible1 = false;
	var setPlotVisible2 = false;
	var setPlotVisible3 = false;
	var setPlotVisible4 = false;
	var selectXAxis = document.getElementById('xAxis');
	var selectYAxis1 = document.getElementById('yAxis1');
	var selectYAxis2 = document.getElementById('yAxis2');
	var selectYAxis3 = document.getElementById('yAxis3');
	var selectYAxis4 = document.getElementById('yAxis4');
 
	// Plot data into arrays
    lines.forEach
	(
		function(line)
		{
			var parts = line.trim().split('\t');
			xData.push(parts[selectXAxis.value]);
			
			if (selectYAxis1.value != 0)
			{
				yData1.push(parts[selectYAxis1.value]);
				setPlotVisible1 = true;
			}
			
			if (selectYAxis2.value != 0)
			{
				yData2.push(parts[selectYAxis2.value]);
				setPlotVisible2 = true;
			}
			
			if (selectYAxis3.value != 0)
			{
				yData3.push(parts[selectYAxis3.value]);
				setPlotVisible3 = true;
			}
			
			if (selectYAxis4.value != 0)
			{
				yData4.push(parts[selectYAxis4.value]);
				setPlotVisible4 = true;
			}
		}
	);

    var trace1 = {
        x: xData.slice(4),
        y: yData1.slice(4),
        type: 'scatter',
		name: yData1[3],
		line: {color: 'red'},
		yaxis: 'y2'
    };
	
    var trace2 = {
        x: xData.slice(4),
        y: yData2.slice(4),
        type: 'scatter',
		name: yData2[3],
		line: {color: 'black'},
		yaxis: 'y1'
    };
	
    var trace3 = {
        x: xData.slice(4),
        y: yData3.slice(4),
        type: 'scatter',
		name: yData3[3],
		line: {color: 'blue'},
		yaxis: 'y3'		
    };
	
    var trace4 = {
        x: xData.slice(4),
        y: yData4.slice(4),
        type: 'scatter',
		name: yData4[3],
		line: {color: 'cyan'},
		yaxis: 'y4'
    };
	
    var layout =
	{
		showlegend: true,
		legend:
		{
			yanchor: "top",
			xanchor: "left",
			x: 0.10,
			y: 0.99
		},
        xaxis:
		{
            title: xData[3],
			domain: [0.1, 0.9]
        },
        yaxis:
		{
            title: yData2[3],
			titlefont: {color: 'black'},
			tickfont: {color: 'black'},
			visible: setPlotVisible2
		},
		yaxis2:
		{
            title: yData1[3],
			titlefont: {color: 'red'},
			tickfont: {color: 'red'},
			anchor: 'free',
			overlaying: 'y',
			side: 'left',
			position: 0.04,
			visible: setPlotVisible1
		},
		yaxis3:
		{
            title: yData3[3],
			titlefont: {color: 'blue'},
			tickfont: {color: 'blue'},
			anchor: 'x',
			overlaying: 'y',
			side: 'right',
			visible: setPlotVisible3
		},
		yaxis4:
		{
            title: yData4[3],
			titlefont: {color: 'cyan'},
			tickfont: {color: 'cyan'},
			anchor: 'free',
			overlaying: 'y',
			side: 'right',			
			position: 0.96,
			visible: setPlotVisible4
		}
    };
	
	data.push(trace1);
	data.push(trace2);
	data.push(trace3);
	data.push(trace4);

    Plotly.newPlot('plot', data, layout);
}

function plotBeam()
{
	var data = [];
    var xData = [];
    var yData1 = [];
    var yData2 = [];
    var yData3= [];
    var yData4 = [];
	var selectXAxis = 0;	// Time
	var selectYAxis1 = 7;	// Foil-I
	var selectYAxis2 = 9;	// Target-I
	var selectYAxis3 = 8;	// Coll-l-I
	var selectYAxis4 = 10;	// Coll-r-I
 
	// Plot data into arrays
    lines.forEach
	(
		function(line)
		{
			var parts = line.trim().split('\t');
			xData.push(parts[selectXAxis]);
			yData1.push(parts[selectYAxis1]);
			yData2.push(parts[selectYAxis2]);
			yData3.push(parts[selectYAxis3]);
			yData4.push(parts[selectYAxis4]);
		}
	);

    var trace1 = {
        x: xData.slice(4),
        y: yData1.slice(4),
        type: 'scatter',
		name: yData1[3],
		line: {color: 'red'}
    };
	
    var trace2 = {
        x: xData.slice(4),
        y: yData2.slice(4),
        type: 'scatter',
		name: yData2[3],
		line: {color: 'black'}
    };
	
    var trace3 = {
        x: xData.slice(4),
        y: yData3.slice(4),
        type: 'scatter',
		name: yData3[3],
		line: {color: 'orange'}
    };
	
    var trace4 = {
        x: xData.slice(4),
        y: yData4.slice(4),
        type: 'scatter',
		name: yData4[3],
		line: {color: 'cyan'}
    };
	
    var layout =
	{
		showlegend: true,
		legend:
		{
			yanchor: "top",
			xanchor: "left",
			x: 0.10,
			y: 0.99
		},
        xaxis:
		{
            title: xData[3],
			domain: [0.1, 0.9]
        },
        yaxis:
		{
            title: "Beam"
		}
    };
	
	data.push(trace1);
	data.push(trace2);
	data.push(trace3);
	data.push(trace4);

    Plotly.newPlot('plotBeam', data, layout);
}
