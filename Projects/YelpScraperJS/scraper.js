var jsonString = [];
var stringData;
var startingPage = document.querySelectorAll(".pagination-links .current")[0].children[0].innerHTML;
var currentPage = startingPage;

//getBusinesses();
initialize();

function initialize() {
    var elemCheck = document.getElementById("scraper-gui");

    if (elemCheck === null) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://proantagonist.github.io/Projects/YelpScraperJS/styles.css';
        //        link.href = './styles.css';
        link.media = 'all';
        head.appendChild(link);

        loaded = true;

        createGUI();
    } else {
        setup();
    }

}

function createGUI() {
    $('body').append('<div id="scraper-gui"><div><p>Starting Page: <span id="page-tracker">' + startingPage + '</span></p><p>Current Page: <span id="page-tracker">' + currentPage + '</span></p><button id="start">Collect</button></div><div><p>Records collected:</p><p id="obj-counter">--</p><button id="export">Export</button></div></div>');

    setup();
}

function updateGUI() {
    $('#obj-counter').empty().html(jsonString.length);
}

function setup() {
    $('#start').click(function () {
        getBusinesses();
    });

    $('#export').click(function () {
        openNewWindow(stringData);
    });

    $('.pagination-links').click(function () {
        var current = $(this)
    });
}

function getBusinesses() {
    var businesses = [$('.regular-search-result')];
    getPropertiesForBusinesses(businesses);
}

function getPropertiesForBusinesses(data) {
    $.each(data[0], function (key, val) {
        var bizName = $(val).find('.biz-name span').text();
        var bizFullAddress = $(val).find('.secondary-attributes address').html();
        var bizRating = $(val).find('.rating-large i').attr('title').split(' ')[0];
        var bizReviewCount = $(val).find('.review-count').text().trim().split(" ")[0]
        var bizCost = $(val).find('.price-range').text().length;
        var bizType = $(val).find('.category-str-list').text().replace(/\s\s+/g, ' ').trim();

        //==================================================================================
        //==================================================================================
        var bizPopularity; // Some criteria we will have to develop to set a business radius
        //==================================================================================
        //==================================================================================

        var streetAddress = $.trim(bizFullAddress).split('<br>')[0];
        var city = $.trim(bizFullAddress).split('<br>')[1].split(',')[0];
        var state = $.trim(bizFullAddress).split('<br>')[1].split(',')[1].trim().split(" ")[0];
        var zip = $.trim(bizFullAddress).split('<br>')[1].split(',')[1].trim().split(" ")[1];

        //-------------------GEOCODE

        var newPathGeocode = "http://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?streetAddress=" + streetAddress.replace(/ /g, "%20") + "&city=" + city.replace(/ /g, "%20") + "&state=" + state.replace(/ /g, "%20") + "&zip=" + zip.replace(/ /g, "%20") + "&apikey=f4db442a16d44ab7b9acbff707340245&format=json&census=true&censusYear=2000|2010&notStore=false&version=4.01"

        $.ajax({
            url: newPathGeocode
            , type: "GET"
            , dataType: "json"
            , success: function (data, status, jqXHR) {
                var geocodeObject = data.OutputGeocodes[0].OutputGeocode;

                var lat = geocodeObject.Latitude;
                var long = geocodeObject.Longitude;

                addToJSONObject(bizName, streetAddress, city, state, zip, bizRating, bizReviewCount, bizCost, bizType, lat, long);

            }
        });

        //-------------------END GEOCODE

        //        addToJSONObject(bizName, streetAddress, city, state, zip, bizRating, bizReviewCount, bizCost, bizType);
    })

    //    stringData = JSON.stringify(jsonString);
}

function addToJSONObject(name, streetAddress, city, state, zip, rating, reviews, cost, type, lat, long) {
    jsonString.push({
        name: name
        , streetAddress: streetAddress
        , city: city
        , state: state
        , zip: zip
        , rating: rating
        , reviews: reviews
        , price: cost
        , type: type
        , lat: lat
        , long: long
    });

    stringData = JSON.stringify(jsonString);

    updateGUI();
}

function openNewWindow(json) {
    var blob = new Blob([json], {
        type: "application/json"
    });
    var url = URL.createObjectURL(blob);

    window.open(url);
}


//Bookmark Link - JS ONLY
//javascript:(function(){javascript:var s=document.createElement('script');s.setAttribute('src','URL_HERE');document.body.appendChild(s);})();