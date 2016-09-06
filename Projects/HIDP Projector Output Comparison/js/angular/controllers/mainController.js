app.controller('mainController', ['$scope', '$stateParams', '$state', '$filter', '$location', 'projectorListSrvc', function ($scope, $stateParams, $state, $filter, $location, projectorListSrvc) {

    if ($state.includes('default')) {

        $scope.projector1 = $stateParams.projector1;
        $scope.projector2 = $stateParams.projector2;


        if ($stateParams.step) {
            $scope.step = $stateParams.step;
        } else {
            $scope.step = 1;
        }

        projectorListSrvc.getProjectorList().$promise.then(function (data) {
            $scope.list = data.items;
        });

        $scope.$watch('step', function () {
            $scope.refresh();
        });

    }

//    function init() {
//        if ($scope.projector1) {
//            $scope.load($scope.projector1, '1');
//        }
//
//        if ($scope.projector2) {
//            $scope.load($scope.projector2, '2');
//        }
//    }


    $scope.load = function (value, container) {

        var path = "/";
        var targetViewer;

        if (value) {
            //        var path = window.location.href + '/img/' + value + '/' + value + '-' + $scope.step + '.jpg'; //Server path. Uncomment before uploading.
            path = window.location.origin + '/img/' + value + '/' + value + '-' + $scope.step + '.jpg'; //Local path. Comment before uploading
        }

        if (container) {
            if (container == '1') {
                targetViewer = '#container1';
            } else if (container == '2') {
                targetViewer = '#container2';
            }
        }

        if (targetViewer) {
            if ($scope.verifyUrl(path)) {
                $(targetViewer).empty().css('background-image', 'url(' + path + ')');
            } else {
                $(targetViewer).css('background-image', 'none').html("<p>There's nothing here Jim.</p>");
            }
        } else {
            if ($scope.verifyUrl(path)) {
                $(targetViewer).empty().css('background-image', 'url(' + path + ')');
                setUrl(container, value);
            } else {
                $(targetViewer).css('background-image', 'none').html("<p>There's nothing here Jim.</p>");
            }
        }
    };


    //        $location.search({
    //            ['projector' + container]: value
    //        });


    $scope.refresh = function () {
        var selectArray = [];

        $.each($('select'), function () {
            selectArray.push(this);
        });

        $.each((selectArray), function (key, item) {
            $scope.load($(item).val(), key + 1)
        });
    }

    $scope.invert = function () {
        $('.image-container').toggleClass('invert');
    }

    $scope.verifyUrl = function (url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

}]);