'use strict';
var map;
require(['esri/map',
  "esri/graphic",
  "esri/geometry/Point",
  "esri/Color",
  "esri/layers/GraphicsLayer",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/InfoTemplate",
  "esri/layers/FeatureLayer",
  "esri/SpatialReference",
  "esri/geometry/Polyline",
  "esri/symbols/LineSymbol",
  "esri/geometry/Multipoint",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  'dojo/domReady!'], function(Map,
  Graphic,
  Point,
  Color,
  GraphicsLayer,
  ArcGISDynamicMapServiceLayer,
  InfoTemplate,
  FeatureLayer,
  SpatialReference,
  Polyline,
  LineSymbol,
  Multipoint,
  SimpleMarkerSymbol,
  SimpleLineSymbol
  ) {

    map = new Map('map', {
    basemap: 'topo', 
    center: [-100.21,40.92],
    zoom: 4
});
/* Graphic layer to points and line*/
var graphicLayer = new GraphicsLayer();
map.addLayer(graphicLayer);
var graphicLine = new GraphicsLayer();
map.addLayer(graphicLine);
var multP = new Multipoint();
multP.setSpatialReference(map.spatialReference);
/* each click make a point*/
map.on("click",function(point){
  /*the first line delet de line*/
  graphicLine.clear();
  var Puntox = point.mapPoint.x;
  var Puntoy = point.mapPoint.y;
  var Punto = [Puntox, Puntoy];
    var marker = new SimpleMarkerSymbol();
    marker.setStyle(SimpleMarkerSymbol.STYLE_CROSS);
   var p = new Point(Punto,map.spatialReference);
   var graP= new Graphic(p, marker);
    graphicLayer.add(graP);
    /*add the point in a array*/
    Puntos.push(Punto);
    console.log (Puntos);
});

var Puntos =[];
var Lin_gra
map.on("dbl-click",function(){
  map.disableDoubleClickZoom();
  var lineSymbol = new SimpleLineSymbol();
  lineSymbol.setColor(new Color([0, 169, 230, 1]));
  var Line = new Polyline();
  Line.addPath(Puntos)
  Line.setSpatialReference(map.spatialReference);
  Lin_gra= new Graphic(Line, lineSymbol);
  graphicLayer.clear();
  graphicLine.add(Lin_gra);
  /* Delete the values in an array*/
  Puntos.splice(0,Number.MAX_VALUE);
  });
});



