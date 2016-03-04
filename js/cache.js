'use strict';

var map;
require(['esri/map',
        'esri/layers/ArcGISTiledMapServiceLayer',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/symbols/LineSymbol',
        'esri/layers/FeatureLayer',
        "esri/InfoTemplate",
        'esri/dijit/BasemapGallery',
        "esri/dijit/Basemap",
        "esri/arcgis/utils",
        "dojo/parser",
        "dijit/layout/BorderContainer", 
        "dijit/layout/ContentPane", 
        "dijit/TitlePane",
          'dojo/domReady!'], 

     function(Map,
      ArcGISTiledMapServiceLayer,
      ArcGISDynamicMapServiceLayer,
      LineSymbol,
      FeatureLayer,
      InfoTemplate,
      BasemapGallery,
      Basemap,
      arcgisUtils,
      parser
     ) {
    parser.parse();
     map = new Map('mapaCache',{
        center: [-56.049,38.485],
        zoom: 3,
        basemap: 'streets',
        
      }); 

    var btn2 = document.getElementById('btn2');
    var btn = document.getElementById('btn');
/*this botton add a base map and delete all layers*/
    btn.addEventListener('click', function(){
      var satellite = map.setBasemap('satellite');
      map.removeAllLayers()
    });

/*this other botton ad layer*/
    btn2.addEventListener('click', function(){
      
      var Urlfeature = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/PublicSafety/PublicSafetyFeedSample/MapServer/1';
      var Urlfeature1 = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/PublicSafety/PublicSafetyFeedSample/MapServer/0';
      var Urlfeature2 = 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/PublicSafety/PublicSafetyFeedSample/MapServer/2';
      

      var mapafeautre = new FeatureLayer(Urlfeature,{id:"feature",
        opacity: 0.5});
      map.addLayer(mapafeautre,1);
      var mapafeautre1 = new FeatureLayer(Urlfeature1,{id:"feature1",
        opacity: 1,
      });
      map.addLayer(mapafeautre1,0);
      var template = new InfoTemplate();
      template.setTitle("<b>Atributos</b>");
      template.setContent("dice: ${INC_DESC}");
      

      var mapafeautre2 = new FeatureLayer(Urlfeature2,{id:"feature2",
        opacity: 1,
        infoTemplate:template
      });
      map.addLayer(mapafeautre2,2);
      
      

      

    });



  });
