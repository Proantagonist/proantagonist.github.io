app.controller('mainController', ['$scope', 'events', 'tags', function ($scope, events, tags) {
    events.success(function (data) {

        var shouldFilterRSVP = false;

        $scope.events = data.items;

        $scope.eventIncludes = [];

        $scope.includeEvent = function (event) {
            var i = $.inArray(event, $scope.eventIncludes);
            if (i > -1) {
                $scope.eventIncludes.splice(i, 1);
            } else {
                $scope.eventIncludes.push(event);
            }
        }

        $scope.shouldFilterRSVP = function (element) {
            shouldFilterRSVP = !shouldFilterRSVP;

            $(event.currentTarget).toggleClass('active');
        }

        $scope.eventFilterExclusive = function (item) {
            // AND Filter
            if ($scope.eventIncludes.length > 0) {

                var eventTags = [];

                $(item.TagModules).each(function (key, val) {
                    eventTags.push(val.Tag);
                });

                var matchCounter = 0;

                $(eventTags).each(function (key, val) {

                    if ($.inArray(val, $scope.eventIncludes) > -1)
                        matchCounter++;
                });

                if (matchCounter !== $scope.eventIncludes.length)
                    return;
            }
            return item;
        }

        $scope.eventFilterInclusive = function (item) {
            // OR Filter
            if ($scope.eventIncludes.length > 0) {

                var eventTags = [];

                $(item.TagModules).each(function (key, val) {
                    eventTags.push(val.Tag);
                });

                var matchCounter = 0;

                $(eventTags).each(function (key, val) {

                    if ($.inArray(val, $scope.eventIncludes) > -1)
                        matchCounter++;
                });

                if (matchCounter === 0)
                    return;
            }
            return item;
        }

        $scope.eventFilterRSVPd = function (item) {
            if (shouldFilterRSVP === true) {

                if (item.UserRSVPed === "True") {
                    return item;
                }
            } else {
                return item;
            }
        }
        
        $scope.registrationStatusChange = function (status){
            console.log('changed');
        }

    });

    tags.success(function (data) {
        $scope.tags = data.items;
    });
}]);