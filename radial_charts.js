// Store the embedded views for later updates
let tempView, gustView, rainView, tempPieView, rainPieView;

// Load the chart specifications from JSON files
Promise.all([
    fetch('temperature_radial.json').then(response => response.json()),
    fetch('wind_gust_radial.json').then(response => response.json()),
    fetch('rainfall_radial.json').then(response => response.json()),
    fetch('gusty_days_temperature_pie.json').then(response => response.json()),
    fetch('gusty_days_rainfall_pie.json').then(response => response.json())
]).then(function([tempSpec, gustSpec, rainSpec, tempPieSpec, rainPieSpec]) {
    
    // Embed the radial charts and store the views
    vegaEmbed('#tempChart', tempSpec, {actions: false}).then(result => {
        tempView = result.view;
    });
    vegaEmbed('#gustChart', gustSpec, {actions: false}).then(result => {
        gustView = result.view;
    });
    vegaEmbed('#rainChart', rainSpec, {actions: false}).then(result => {
        rainView = result.view;
    });
    
    // Embed the pie charts and store the views
    vegaEmbed('#tempPieChart', tempPieSpec, {actions: false}).then(result => {
        tempPieView = result.view;
    });
    vegaEmbed('#rainPieChart', rainPieSpec, {actions: false}).then(result => {
        rainPieView = result.view;
    });

    // Handle state selection change
    document.getElementById('stateSelect').addEventListener('change', function(e) {
        const selectedState = e.target.value;
        
        // Update the parameter value in each radial chart view
        if (tempView) {
            tempView.signal('stateSelection', selectedState).run();
        }
        if (gustView) {
            gustView.signal('stateSelection', selectedState).run();
        }
        if (rainView) {
            rainView.signal('stateSelection', selectedState).run();
        }
        
        // Update the parameter value in each pie chart view
        if (tempPieView) {
            tempPieView.signal('stateSelection', selectedState).run();
        }
        if (rainPieView) {
            rainPieView.signal('stateSelection', selectedState).run();
        }
    });
}).catch(function(error) {
    console.error('Error loading chart specifications:', error);
});