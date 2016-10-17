var interactions = angular.module('interactions', []);

interactions.directive('scrollTop', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, control) {
            $(window).on('hashchange', function (e) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            });
        }
    }
}]);

interactions.directive('textareaAutosize', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, control) {

            $timeout(function () {
                $("textarea").textareaAutoSize()
            }, 800);

        }
    }
}]);