presenters.directive('presenterItem', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            presenter: '='
        },
        templateUrl: location.protocol + '//' + location.hostname + baseUrl +'js/angular/directives/presenterItems.html',
        link: function (scope, element, attrs) {
            $timeout(function () {
                if (scope.$parent.$last === true) {
                    $('.people-profile-container').masonry({
                        itemSelector: '.profile.card',
                        isFitWidth: true,
                        gutter: 25
                    });
                }
            }, 0);

        }
    };
}])