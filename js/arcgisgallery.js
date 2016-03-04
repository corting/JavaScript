'use strict';
/*this script create a gallery basemap*/
  var map;
  var basemapGallery;
  require(["esri/map",
          "esri/dijit/BasemapGallery",
          "esri/arcgis/utils",
          "dojo/parser",
          "dijit/layout/BorderContainer",
          "dijit/layout/ContentPane",
          "dijit/TitlePane",
          "esri/dijit/BasemapLayer",
          "esri/dijit/Basemap",
          "dojo/domReady!"
          ], function(
            Map, 
            BasemapGallery, 
            arcgisUtils,
            parser,
            BasemapLayer,
            Basemap
          ) {
            parser.parse();

            map = new Map("map", {
              basemap: "topo",
              center: [-105.255, 40.022],
              zoom: 13
            });
          /*whit this code add a own basemap*/
            var layer0 = new BasemapLayer({
            url:"http://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer"
            });

            var layer0map = new Basemap({
            layers: [layer0],
            title: "Land-Cover-2001 (USA)",
            id: 0,  
            thumbnailUrl:"http://s10.postimg.org/ffoih3k6h/USa_land.png"
            });
           
        

            //add the basemap gallery, 
            basemapGallery = new BasemapGallery({
              showArcGISBasemaps: true,
              map: map
            }, "basemapGallery");

            basemapGallery.startup();
            /*later basemap start to run we'll add our own basemap*/
            basemapGallery.add(layer0map);
            
            basemapGallery.on("error", function(msg) {
              console.log("basemap gallery error:  ", msg);


            });



    });
