# leaflet-challenge

<img width="1440" alt="Earthquake Map"
src="https://github.com/Tarynfo1/leaflet-challenge/blob/9179e47c5bccd52e50196d285f637afba4f77215/Images/completed_code_image.png">

## Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualise their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualise USGS data that will allow them to better educate the public and other government organisations (and hopefully secure more funding) on issues facing our planet.

## Github page link
* https://Tarynfo1.github.io/leaflet-challenge

***
## Contents
- README
- index.html
- static -> js -> logic.js, css -> style.css
- Images

***
### - Step 1. Retrieve dataset:

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. 
When a dataset is selected from the website (such as "All Earthquakes from the Past 7 Days"), a JSON representation of that data will be displayed. the URL of this JSON is used to pull in the data for the visualisation.

### - Step 2 Import and visualise the data by doing the following:

A map was created using Leaflet that plots all the earthquakes from a dataset based on longitude and latitude.

Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in colour.

### - Step 3 Show the relationship between the seismic activity and the tectonic plates

A second dataset is plotted on the map to illustrate the relationship between tectonic plates and seismic activity. The following link is used to pull in the data https://github.com/fraxen/tectonicplatesLinks 
***

## Tools used
- JavaScript
- GeoJSON
- D3.js
- Leaflet libraries

***
## Acknowledgements
- The following resource: "https://plotly.com/javascript/getting-started/" assisted in creating the below code snippet
```
    let myMap = L.map("map", {
        center: [
            40.7, -94.5
    ],
        zoom: 3
});
```

- The following resource: "https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html" assisted in creating the below code snippet
```
L
    .control
    .layers(baseMaps, overlays, { collapsed: false })
    .addTo(myMap);
```

- The following resource: "https://plotly.com/javascript/getting-started/" assisted in creating the below code snippet
```
     opacity: 1,
            fillOpacity: 1,
            fillColor: mapColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: mapRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
```


The following resource: TA tutor Limei Hou assisted in creating the below code snippet

```
    for (let i = 0; i < depthRanges.length; i++) {
        div.innerHTML +=
            '<i style="background:' + mapColor(depthRanges[i] + 1) + '"></i> ' +
            depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+');
    }
    return div;
```
  
The following resource https://stackoverflow.com/questions/45518547/cant-get-leaflet-legend-to-display-properly assisted in creating the below code snippet:
```
/* Define box information to hold the colors in the legend */
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
}
```