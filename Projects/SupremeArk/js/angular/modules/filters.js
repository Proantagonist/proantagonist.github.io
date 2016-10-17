//Contains a list of custom filters for cleaning up poorly formatted data strings returned from the database.

var dataFilters = angular.module('dataFilters', []);

dataFilters.filter('ampersand', function () {
    // filter that replaces all encoded HTML5 ampersands with a true '&'

    // USAGE: Use inside any angular view epxression to convert '&amp' to '&', such as 'Texas A&amp;M University' to 'Texas A&M University'
    // E.x. {{modelData | ampersand}}

    return function (input) {
        return input ? input.replace(/&amp;/g, '&') : '';
    }
});

dataFilters.filter('splitByCaps', function () {
    // filter that accepts a string input and adds spaces between capital letters.

    // USAGE: Use inside any angular view epxression to split any concatenated string where words are separated by caps, such as 'GraduateStudent'.
    // E.x. {{modelData | splitByCaps}}

    return function (input) {
        return input ? input.split(/(?=[A-Z])/).join(" ") : '';
    }
});

dataFilters.filter('toMiliSecs', function () {
    // Converts date to miliseconds for manipulation with angular's date filter

    // USAGE: Use inside any angular view expression to parse a time into Miliseconds. Can be stacked with other filters such as the date tiler (Search for angular date filter documentation) to generate many date formats
    // E.x. {{modelDate | toMiliSecs}}

    return function (date) {
        return Date.parse(date);
    }
});

dataFilters.filter('capitalizeFirst', function () {
    // Accepts a string and capitalizes the first letter while lowercasing the rest

    // USAGE: Use inside any angular view expression to convert an uppercased string to lowercase minus the first letter. Used in form templating where labels are uppercase and error messages are first cased such as, 'FIRST NAME' to 'First Name'
    // E.x. {{modelDate | toMiliSecs}}

    return function (data) {
        return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    }
});

dataFilters.filter('filterData', function () {
    // filter that is used to filter tabular data based on an input query
    //
    // EXPECTED INPUTS
    // [data] - data array containing objects sent by the filter
    // [searchTerm] - string used to return item if the comparison returns truthy
    // [searchKeys] - string array containing the property values of the keys to use in the search.

    // USAGE: Use in conjunction with the ng-repeat attribute directive. Can be stacked with filterTags filter to extend filtering to tags.
    // E.x. ng-repeat(item in items | filterData: searchTerm : ['Properties', 'To', 'Search'])
    // The filter will automatically pass the projects object. Only thing left to pass is the searchTerm and searchKeys properties to search.

    return function (data, searchTerm, searchKeys) {
        var resultItems;
        if (searchTerm) {
            var searchTerm = searchTerm.toLowerCase().split(' ');
        }

        if (!searchTerm == '') {
            var resultItems = [];
            for (var i = 0; i < data.length; i++) {
                var propertyValueString = "";
                for (var e = 0; e < searchKeys.length; e++) {
                    var property = searchKeys[e];
                    propertyValueString += data[i][property].toLowerCase() + " ";
                }
                var c = 0;
                for (j = 0; j < searchTerm.length; j++) {
                    if (propertyValueString.includes(searchTerm[j])) {
                        c++;
                    }
                }
                if (c == searchTerm.length) {
                    resultItems.push(data[i]);
                }
            }
            return resultItems;
        } else {
            return data;
        }

    }
});

dataFilters.filter('filterTags', function () {
    // filter that is used to filter tabular data.
    //
    // EXPECTED INPUTS
    // [projectTags] - data array containing objects sent by the filter
    // [searchTags] - Array containing tag labels to compare against project tags

    // USAGE: Use in conjunction with the ng-repeat attribute directive.  Can be stacked with filterData filter to extend filtering to custom text input.
    // E.x. ng-repeat(item in items | filterTags: searchtags)
    // The filter will automatically pass the projects. Only thing left to pass is the searchTags.

    return function (projects, searchTags) {
        var resultItems;

        if (searchTags.length > 0 && projects) {
            var resultItems = [];
            for (var i = 0; i < projects.length; i++) { //Loop through all of projects
                for (var e = 0; e < projects[i].TagModules.length; e++) { // Loop though all of tag modules within a project, if any.
                    for (var f = 0; f < searchTags.length; f++) { // Loop through all of searchTags and check for matches between the supplied list and the projects'
                        var matchCounter = 0; // Keeps track of the number of matches with the provided searchTags and the project TagModules.
                        if (searchTags[f] == projects[i].TagModules[e].Tag) {
                            matchCounter++;
                        }

                        if (matchCounter === searchTags.length) { //If the matchCounter and the number of searchTags is the same, then current project has met all provided Tags. AND filter.
                            resultItems.push(projects[i]);
                        }
                    }
                }
            }
            return resultItems;
        } else {
            return projects;
        }

    }
});

dataFilters.filter('paginate', function () {
    // filter that paginates data. Can be used in conjuction with filterData filter, but needs to be stacked after.
    //
    // EXPECTED INPUTS
    // [data] - data array containing objects sent by the filter
    // [currentPage] - integer determining the current page stored in the controller
    // [numPerPage] - integer determining the number of results per page as set by the controller

    return function (data, currentPage, numPerPage) {
        if (data) {
            var begin = ((currentPage - 1) * numPerPage),
                end = begin + numPerPage;
            return data.slice(begin, end);
        } else {
            return data;
        }
    }
});