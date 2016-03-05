'use strict';
var map;
require(["esri/map",
"esri/dijit/Search",
"esri/layers/ArcGISDynamicMapServiceLayer",
"esri/dijit/LayerList",
"esri/arcgis/utils",
"esri/InfoTemplate",
"esri/layers/FeatureLayer",
"dijit/layout/BorderContainer",
"dijit/layout/ContentPane",
"dojo/domReady!"], function(Map,
Search,
ArcGISDynamicMapServiceLayer,
LayerList, 
arcgisUtils, 
InfoTemplate, 
FeatureLayer) {
map = new Map("map", {
    basemap: "topo", 
    center: [-100.21,40.92],
    zoom: 4
});

var UrlCapDina = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer";
var CapaDina = new ArcGISDynamicMapServiceLayer(UrlCapDina,{id: 0});
map.addLayer(CapaDina);
/* create the layer list widget*/
var myWidget = new LayerList({
    map: map,
    /*insert the layer to show*/
    layers:[{
        layer:CapaDina,
        showLegend: true,
        showSubLayers: true,
        showOpacitySlider: true,
        id: "USA" }] }, "layerList");
myWidget.startup();


/* create variables to searhc*/
var city, source_city, source_estate, estate 
var search = new Search({
    map: map,
    addLayersFromMap:true,
    enableButtonMode:true }, "search");
/* insert the sources for search*/
var sources = search.get("sources");
    
    city = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0")
    sources.push({
    featureLayer: city,
    searchFields: ["areaname"],
    displayField: "areaname",
    exactMatch: false,
    outFields: ["areaname", "pop2000"],
    name: "Capital",
    placeholder: "City Name",
    maxResults: 6,
    maxSuggestions: 6,
    //Create an InfoTemplate
    infoTemplate: new InfoTemplate("Capital", "Name: ${areaname}</br>Population: ${pop2000}"),
    enableSuggestions: true,
    minCharacters: 2
    });

    estate = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2")
    sources.push({
    featureLayer: estate,
    searchFields: ["state_name"],
    displayField: "state_name",
    exactMatch: false,
    outFields: ["state_name", "pop2000"],
    placeholder: "State Name",
    name: "State",
    maxResults: 6,
    maxSuggestions: 6,
    //Create an InfoTemplate 
    infoTemplate: new InfoTemplate("State", "Name ${state_name}</br>Population: ${pop2000}"),
    enableSuggestions: true,
    minCharacters: 2
    });

search.set("sources", sources);

         
search.startup();

});

