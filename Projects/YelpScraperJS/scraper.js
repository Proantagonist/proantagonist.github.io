getBusinesses();

var jsonString = [];

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
        var bizPopularity; // Some criteria we will have to develop to set a business radius

        var streetAddress = $.trim(bizFullAddress).split('<br>')[0];
        var city = $.trim(bizFullAddress).split('<br>')[1].split(',')[0];
        var state = $.trim(bizFullAddress).split('<br>')[1].split(',')[1].trim().split(" ")[0];
        var zip = $.trim(bizFullAddress).split('<br>')[1].split(',')[1].trim().split(" ")[1];

        addToJSONObject(bizName, streetAddress, city, state, zip, bizRating, bizReviewCount);
    })

    var stringData = JSON.stringify(jsonString);

    openNewWindow(stringData);
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
}

function openNewWindow(json) {
    var blob = new Blob([json], {
        type: "application/json"
    });
    var url = URL.createObjectURL(blob);

    window.open(url);
}


//Bookmark Link
//javascript:(function(){javascript:var s=document.createElement('script');s.setAttribute('src','URL_HERE');document.body.appendChild(s);})();
