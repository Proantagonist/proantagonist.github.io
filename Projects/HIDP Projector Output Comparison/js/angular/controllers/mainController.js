app.controller('mainController', ['$scope', function ($scope) {

    $scope.verifyUrl = function (url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

    $scope.load = function (value, elem) {
                        var path = window.location.href + '/img/' + inputValue + '/' + inputValue + '-' + step + '.jpg'; //Server path. Uncomment before uploading.
//        var path = window.location.origin + '/img/' + value + '/' + value + '-' + $scope.step + '.jpg'; //Local path. Comment before uploading

        if (elem) {
            if ($scope.verifyUrl(path)) {
                $(elem).parent().find('.image-container').empty().css('background-image', 'url(' + path + ')');
            } else {
                $(elem).parent().find('.image-container').css('background-image', 'none').html("<p>There's nothing here Jim.</p>");
            }
        } else {
            if ($scope.verifyUrl(path)) {
                (angular.element(event.target)).parent().find('.image-container').empty().css('background-image', 'url(' + path + ')');
            } else {
                (angular.element(event.target)).parent().find('.image-container').css('background-image', 'none').html("<p>There's nothing here Jim.</p>");
            }
        }
    };

    $scope.refresh = function () {

        var selectArray = [];

        $.each($('select'), function () {
            selectArray.push(this);
        });

        $.each((selectArray), function (key, item) {
            $scope.load($(item).val(), item)
        });
    }

    $scope.$watch('step', function () {
        $scope.refresh();
    });

    $scope.invert = function () {
        $('.image-container').toggleClass('invert');
    }

    $scope.step = 1;
}]);