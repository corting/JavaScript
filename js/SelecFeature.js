'use strict';
var map;
var urlDynamic = 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer';
var urlCities = 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0';
require(['esri/map',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/graphic',
  'esri/geometry/Point',
  'esri/Color',
  'esri/layers/GraphicsLayer',
  'esri/tasks/QueryTask',
  'esri/tasks/query',
  'esri/layers/ArcGISDynamicMapServiceLayer',
  'esri/geometry/Circle',
  'esri/symbols/SimpleFillSymbol',
  'esri/layers/FeatureLayer',
  "esri/InfoTemplate",
  'dojo/domReady!'], function(Map,
  SimpleMarkerSymbol,
  Graphic,
  Point,
  Color,
  GraphicsLayer,
  QueryTask,
  Query,
  ArcGISDynamicMapServiceLayer,
  Circle,
  SimpleFillSymbol,
  FeatureLayer,
  InfoTemplate
  ) {

map = new Map('map', {
    basemap: 'topo', 
    center: [-100.21,40.92],
    zoom: 4,
});
var layer = new ArcGISDynamicMapServiceLayer(urlDynamic);
map.addLayer(layer);
var Template = new InfoTemplate('Population over 50.000', 'name: ${areaname}<br>Population: ${pop2000}');
var city = new FeatureLayer(urlCities,{
  /*with mode selection only can select the query infotemplate*/
  mode: FeatureLayer.MODE_SELECTION,
  outFields: ['areaname', 'pop2000'],
  infoTemplate:Template
});
map.addLayer(city);
var graphicLayer = new GraphicsLayer();
map.addLayer(graphicLayer);

var query = new Query();
query.where = 'pop2000 > 50000';
query.returnGeometry = true;
query.outFields = ['areaname', 'pop2000'];
query.outSpatialReference = map.spatialReference;
 
 /* con cir obtenemos todo lo que nos devuelve el evento click*/
 /* Make the var to create the radio*/
var x1;
var y1;
var center1;
var queryTask = new QueryTask(urlCities)
map.on('mouse-drag-start',function(cir){
      map.disablePan(cir);
      x1 = cir.mapPoint.x;
      y1 = cir.mapPoint.y;
      center1= cir.mapPoint;
      });
/*in the drag end draw the circle*/
map.on('mouse-drag-end',function(cir2){
    var x2 = cir2.mapPoint.x;
    var y2 = cir2.mapPoint.y;
    var dist = Math.pow((x2-x1),2) + Math.pow((y2-y1),2);
    var rad = Math.sqrt(dist);
    var circle = new Circle({
      center: center1,
      radius: rad
    });
    query.geometry = circle;
    query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;

    /* draw the circle*/
    var cirsymbol = new SimpleFillSymbol();
    cirsymbol.setStyle(SimpleFillSymbol.STYLE_SOLID);
    cirsymbol.setColor(new Color([255,255,0,0.2]));
    var gracir= new Graphic(circle, cirsymbol);
    graphicLayer.clear();
    graphicLayer.add(gracir);
    queryTask.execute(query, call); 
  }); 
/*the function of the callback*/
function call(FetuSet){
    var resultFeatures = FetuSet.features;
    map.graphics.clear();

    var symbo = new SimpleMarkerSymbol();
    /*anadimos al grafico el punto y su simbolo*/
    symbo.setSize(10);
    symbo.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
    symbo.setColor (new Color('blue'));

    for (var i = 0; i < resultFeatures.length; i++){      
        var graphic = resultFeatures[i];
        graphic.setSymbol(symbo);
        graphic.setInfoTemplate(Template);

    //Add graphic to the map graphics layer.
        map.graphics.add(graphic);
        };
      };
});