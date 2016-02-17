app.controller('mainController', ['$scope', function ($scope) {
    $scope.step = 1;

    $scope.verifyUrl = function (url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

    $scope.load = function (value, elem) {
        //                var path = window.location.href + '/img/' + inputValue + '/' + inputValue + '-' + step + '.jpg'; //Server path. Uncomment before uploading.
        var path = window.location.origin + '/img/' + value + '/' + value + '-' + $scope.step + '.jpg'; //Local path. Comment before uploading

        if ($scope.verifyUrl(path)) {
            (angular.element(event.target)).parent().find('.image-container').empty().css('background-image', 'url(' + path + ')');
        } else {
            (angular.element(event.target)).parent().find('.image-container').html("<p>There's nothing here Jim.</p>");
        }
    };

    function controls() {
        $('#manual-exposure i').click(function () {
            if ($(this).attr('id') === 'plus') {
                step = step + 1;
            } else if ($(this).attr('id') === 'minus') {
                step = step - 1;
            }
        });
    }
    
    $scope.$watch('step', function(){
        console.log('changed');
    });
}]);