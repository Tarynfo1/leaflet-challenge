//Create a record of your starting point
console.log("logic.js")
//Define a baseMaps object to hold the base
var theMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let myMap = L.map("map", {
    center: [
        40.7, -94.5
    ],
    zoom: 3
});

theMap.addTo(myMap);

let baseMaps = {
    "Light Global": theMap,
    "Topo": topo
};

let tectonicplates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

let overlays = {
    "Tectonic Plates": tectonicplates,
    "Earthquakes": earthquakes
};

L
    .control
    .layers(baseMaps, overlays, { collapsed: false })
    .addTo(myMap);


// Retrieve and add the earthquake data to the map
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: mapColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: mapRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };

    // Establish colors to show depth of magnitude
    }
    function mapColor(depth) {
        switch (true) {
            case depth > 90:
                return "#5f4e8a";
            case depth > 70:
                return "#865d8d";
            case depth > 50:
                return "#bb708d";
            case depth > 30:
                return "#d0868f";
            case depth > 10:
                return "#df9b91";
            case depth > -10:
                    return "#F7CD9F";
            default:
                return "#3776a1";
        }
    }
    // Establish magnitude size
    function mapRadius(mag) {
        if (mag === 0) {
            return 1;
        }

        return mag * 4;
    }

    // Add earthquake data to the map
    L.geoJson(data, {

        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        style: mapStyle,

        // Activate pop-up data when circles are clicked
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                Depth: <b>${feature.geometry.coordinates[2]} km</b><br>
                Location: <b>${feature.properties.place} </b><br>
                When: <b>${feature.properties.time/1000}</b>`)

        }
    }).addTo(myMap);

    let tectonicplates = new L.LayerGroup();
    let overlays = {
        "Tectonic Plates": tectonicplates
    };
    L.control    
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {
        // Adding our geoJSON data, along with style information, to the tectonicplates
        // layer.
        L.geoJson(platedata, {
          color: "orange",
          weight: 2
        })
          .addTo(tectonicplates);
    
        // Then add the tectonicplates layer to the map.
        tectonicplates.addTo(myMap);
    });

// Add the legend with colors to corrolate with depth

// Add the legend with colors to correlate with depth
var legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var depthRanges = [-10, 10, 30, 50, 70, 90];

    for (let i = 0; i < depthRanges.length; i++) {
        div.innerHTML +=
            '<i style="background:' + mapColor(depthRanges[i] + 1) + '"></i> ' +
            depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(myMap);


});
