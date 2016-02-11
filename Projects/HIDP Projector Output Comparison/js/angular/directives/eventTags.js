app.directive('eventTag', function () {
    return {
        restrict: 'E',
        scope: {
            tag: '=',
            'itemClick': '&'
        },
        templateUrl: location.protocol + '//' + location.hostname + baseUrl + '/js/angular/directives/eventTags.html'
    };
});