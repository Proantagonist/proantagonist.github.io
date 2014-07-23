
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>BEGIN SMOOTH VERTICAL SCROLLING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    

//Snippet from "http://css-tricks.com/snippets/jquery/smooth-scrolling/"
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 500);
	        return false;
	      }
	    }
	  });
	});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<END SMOOTH VERTICAL SCROLLING<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>BEGIN ACTIVE NAVIGATION TRACKING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//$("nav a").click( function() {
//  $(".active").removeClass("active");
//  $(this).parent("").addClass("active");
//});
//    
//    
//$(document).ready(function () {
//    menutoggle();
//});
//
//$(document).scroll(function (){
//    menutoggle();
//});
//
//function menutoggle(){
//    if (document.body.scrollTop > 400)
//        $('#mainnav').stop().animate({"opacity": '1'});
//      else
//        $('#mainnav').stop().animate({"opacity": '0'});
//}
//
////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<END ACTIVE NAVIGATION TRACKING<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>BEGIN FLOATING LABELS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

$(function() {
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<END FLOATING LABELS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>BEGIN KISSINGBUG MAP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var map;
var max;
var info = L.control();
var gGroup = L.layerGroup();
var currentBug;

$(document).ready(initialize);

function initialize() {
    func();
    map = L.map('kissingbugmap');
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/atharmon91.il51emdn/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);
    map.setView([31.264, -99.152], 6);
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Kissing Bugs</h4></br><h4>by county</h4>';
    };

    info.addTo(map);
}

function getData(table) {
    var pathToREST = "REST/Shapes/GET/Default.aspx";
    $.getJSON(pathToREST, {"table" : table})
      .done(handleDone)
      .fail(handleFail)
}

function handleDone(data, textStatus, jqXHR) {
    var layer;
    gGroup.clearLayers();
    $.each(data.items, function (i, item) {
        max = data.Max;
        layer = omnivore.wkt.parse(item.WKT);
        layer["NAME"] = item.NAME;
        layer["Total"] = item.Total;
        layer.setStyle({
            color: setColor(layer, item.Total),
            //stroke: false, 
            fillOpacity: 0.4,
            weight: 2
        });

        gGroup.addLayer(layer);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: highlightFeature
        });
    });
    gGroup.addTo(map);
}

function handleFail(data, textStatus, jqXHR) {
    alert("Error loading WKT");
}

function setColor(layer, cases) {
    return cases > (max * 0.85) ? '#800026' :
            cases > (max * 0.60) ? '#BD0026' :
            cases > (max * 0.45) ? '#E31A1C' :
            cases > (max * 0.30) ? '#FC4E2A' :
            cases > (max * 0.15) ? '#FEB24C' : '#FFEDA0';
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 4,
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    $('.info').html("<h4>" + layer.NAME + "</h4></br><p>" + currentBug + ": " + layer.Total + "</p>");
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        fillOpacity: 0.4,
        weight: 2
    });
    $('.info').html("<h4>Kissing Bugs</h4></br><h4>by county</h4>");
}

function func() {
    $(".layerButton").click(function () {
        switch (this.id) {
            case "g":
                getData("GerstaeckeriTotal");
                currentBug = "Gerstaeckeri";
                break;
            case "i":
                getData("IndictivaTotal");
                currentBug = "Indictiva";
                break;
            case "l":
                getData("LecticulariaTotal");
                currentBug = "Lecticularia";
                break;
            case "s":
                getData("SanguisugaTotal");
                currentBug = "Sanguisuga";
                break;
            case "clear":
                currentBug = "No species selected";
                gGroup.clearLayers();
                break;
        }
    });
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<END KISSINGBUG MAP<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<