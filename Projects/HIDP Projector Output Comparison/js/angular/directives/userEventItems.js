user.directive('eventItem', function () {
    return {
        restrict: 'E',
        scope: {
            event: '='
        },
        link: function (scope, element, attrs) {

            $(element).find('input').click(function () {
                if (userGuid !== undefined) {
                    //rest call to push to sessions here
                } else {
                    notification('Please log in to RSVP sessions.', 'LOGIN', baseUrl + 'Login/')
                }
            });


        },
        templateUrl: location.protocol + '//' + location.hostname + baseUrl + '/js/angular/directives/eventItems.html'
    };
});