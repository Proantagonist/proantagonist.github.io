app.controller('mainController', ['$scope', '$stateParams', '$state', '$filter', '$location', 'projectorListSrvc', function ($scope, $stateParams, $state, $filter, $location, projectorListSrvc) {

    if ($state.includes('default')) {

        $scope.refresh = function () {
            var selectArray = [];

            $.each($('select'), function () {
                selectArray.push(this);
            });

            $.each((selectArray), function (key, item) {
                if ($(item).val() != "") {
                    $scope.load($(item).val(), key + 1);
                }
            });
        }

        $scope.invert = function ($event) {
            $('.image-container').toggleClass('invert');

            if ($event) {
                $scope.locationHashProperties.inverted = !$scope.locationHashProperties.inverted;
                $scope.generateHash();
            }
        }

        $scope.verifyUrl = function (url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            return http.status != 404;
        }

        $scope.init = function () {
            if ($scope.locationHashProperties.projector1) {
                $scope.load($scope.locationHashProperties.projector1, '1');
            }

            if ($scope.locationHashProperties.projector2) {
                $scope.load($scope.locationHashProperties.projector2, '2');
            }
        }

        $scope.load = function (value, container) {

            var path = "/";
            var targetViewer;

            $scope.generateHash();

            if (value) {
                        var path = 'http://proantagonist.github.io/Projects/HIDP%20Projector%20Output%20Comparison/' + 'img/' + value + '/' + value + '-' + $scope.locationHashProperties.step + '.jpg'; //Server path. Uncomment before uploading.
//                path = window.location.origin + '/img/' + value + '/' + value + '-' + $scope.locationHashProperties.step + '.jpg'; //Local path. Comment before uploading
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
        }

        $scope.locationHashProperties = {
            projector1: '',
            projector2: '',
            step: '',
            inverted: ''
        }

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        $scope.locationHashProperties.projector1 = $stateParams.projector1; // retrieves projector 1 url parameter if any
        $scope.locationHashProperties.projector2 = $stateParams.projector2; // retrieves projector 2 url parameter if any
        $scope.locationHashProperties.inverted = $stateParams.inverted == 'true'; // retrieves inverted state from url parameter if any, and evaluates the string boolean

        if ($stateParams.step) { // Checks if step url parameter. If none, set to 1
            $scope.locationHashProperties.step = $stateParams.step;
        } else {
            $scope.locationHashProperties.step = 1;
        }

        if ($scope.locationHashProperties.inverted) { // Checks if step url parameter. If none, set to 1
            $scope.invert();
        }

        projectorListSrvc.getProjectorList().$promise.then(function (data) { // Get projector list
            $scope.list = data.items;
        });

        $scope.$watch('locationHashProperties.step', function () { // Track changes on the image step model
            $scope.refresh();
        });



        $scope.generateHash = function () {
            var hash = "#/?";
            var keys = Object.keys($scope.locationHashProperties);
            for (i = 0; i < keys.length; i++) {
                if ($scope.locationHashProperties[keys[i]] != undefined && $scope.locationHashProperties[keys[i]] != "") {
                    hash += keys[i] + '=' + $scope.locationHashProperties[keys[i]]
                    if (i < keys.length - 1) {
                        hash += "&"
                    }
                }
            }
            location.hash = hash;
        }
    }



}]);