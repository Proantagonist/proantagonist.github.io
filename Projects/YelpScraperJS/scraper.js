var jsonString = [];
var stringData;
var startingPage = document.querySelectorAll(".pagination-links .current")[0].children[0].innerHTML;

//getBusinesses();
initialize();

function initialize() {
    var elemCheck = document.getElementById("scraper-gui");

    if (elemCheck === null) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'http://proantagonist.github.io/Projects/YelpScraperJS/styles.css';
        link.media = 'all';
        head.appendChild(link);

        loaded = true;

        createGUI();
    } else {
        setup();
    }

}


function createGUI() {
    $('body').append('<div id="scraper-gui"><p>Current Page: <span id="page-tracker">' + startingPage + '</span></p><p>Number of Pages to Scrape: <input type="text" id="page-target"/><button id="start">Start</button><button id="start">Stop</button><br><br><br><br><p>Objects collected: <span id="obj-counter">--</span></p><button id="export">Export</button></div>');

    setup();
}

function updateGUI(){
    $('#obj-counter').empty().html(jsonString.length);
}

function setup() {
    $('#start').click(function () {
        getBusinesses();
    });

    $('#export').click(function () {
        openNewWindow(stringData);
    });

    //    $('#start').click(function () {
    //
    //    });
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
            //        var bizType = $(val).find('.review-count').text().trim().split(" ")[0]

        //==================================================================================
        //==================================================================================
        var bizPopularity; // Some criteria we will have to develop to set a business radius
        //==================================================================================
        //==================================================================================

        var streetAddress = $.trim(bizFullAddress).split('<br>')[0];
        var city = $.trim(bizFullAddress).split('<br>')[1].split(',')[0];
        var state = $.trim(bizFullAddress).split('<br>')[1].split(',')[1].trim().split(" ")[0];
        var zip = $.trim(bizFullAddress).split('<br>')[1].split(',')[1].trim().split(" ")[1];

        addToJSONObject(bizName, streetAddress, city, state, zip, bizRating, bizReviewCount);
    })

    stringData = JSON.stringify(jsonString);
}

function addToJSONObject(name, streetAddress, city, state, zip, rating, reviews) {
    jsonString.push({
        name: name,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zip: zip,
        rating: rating,
        reviews: reviews
    });
    
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