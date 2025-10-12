// Store the embedded views for later updates
let tempView, gustView, rainView;

// Load the chart specifications from JSON files
Promise.all([
    fetch('temperature_radial.json').then(response => response.json()),
    fetch('wind_gust_radial.json').then(response => response.json()),
    fetch('rainfall_radial.json').then(response => response.json())
]).then(function([tempSpec, gustSpec, rainSpec]) {
    
    // Embed the charts and store the views
    vegaEmbed('#tempChart', tempSpec, {actions: false}).then(result => {
        tempView = result.view;
    });
    vegaEmbed('#gustChart', gustSpec, {actions: false}).then(result => {
        gustView = result.view;
    });
    vegaEmbed('#rainChart', rainSpec, {actions: false}).then(result => {
        rainView = result.view;
    });

    // Handle state selection change
    document.getElementById('stateSelect').addEventListener('change', function(e) {
        const selectedState = e.target.value;
        
        // Update the parameter value in each view
        if (tempView) {
            tempView.signal('stateSelection', selectedState).run();
        }
        if (gustView) {
            gustView.signal('stateSelection', selectedState).run();
        }
        if (rainView) {
            rainView.signal('stateSelection', selectedState).run();
        }
    });
}).catch(function(error) {
    console.error('Error loading chart specifications:', error);
});