'use strict';
var map;
require(['esri/map',
  'esri/graphic',
  'esri/geometry/Point',
  'esri/Color',
  'esri/layers/GraphicsLayer',
  'esri/layers/ArcGISDynamicMapServiceLayer',
  'esri/InfoTemplate',
  'esri/layers/FeatureLayer',
  'esri/SpatialReference',
  'esri/geometry/Polygon',
  'esri/symbols/LineSymbol',
  'esri/geometry/Multipoint',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleFillSymbol',
  'dojo/domReady!'], function(Map,
  Graphic,
  Point,
  Color,
  GraphicsLayer,
  ArcGISDynamicMapServiceLayer,
  InfoTemplate,
  FeatureLayer,
  SpatialReference,
  Polygon,
  LineSymbol,
  Multipoint,
  SimpleMarkerSymbol,
  SimpleFillSymbol
  ) {

    map = new Map('map', {
    basemap: 'topo', 
    center: [-100.21,40.92],
    zoom: 4
});
/* Graphic layer to points and line*/
var graphicLayer = new GraphicsLayer();
map.addLayer(graphicLayer);
var graphicPol = new GraphicsLayer();
map.addLayer(graphicPol);
var multP = new Multipoint();
multP.setSpatialReference(map.spatialReference);
/* each click make a point*/
map.on('click',function(point){
  /*the first line delet de line*/
  graphicPol.clear();
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
var Pol_gra
map.on('dbl-click',function(){
  map.disableDoubleClickZoom();
  /*add the last point that is teh same the first*/
  Puntos.push(Puntos[0]);
  var fill = new SimpleFillSymbol();
  fill.setColor(new Color([230, 0, 0, 0.25]));
  var Poligon = new Polygon();
  Poligon.addRing(Puntos)
  Poligon.setSpatialReference(map.spatialReference);
  Pol_gra= new Graphic(Poligon, fill);
  graphicLayer.clear();
  graphicPol.add(Pol_gra);
  /* Delete the values in an array*/
  Puntos.splice(0,Number.MAX_VALUE);
  });
});



