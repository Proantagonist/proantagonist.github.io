arkData.controller('arkDataController', ['$scope', '$stateParams', '$state', '$filter', 'ArkDataSrvc', function ($scope, $stateParams, $state, $filter, ArkDataSrvc) {

    if ($state.includes('default')) {
        ArkDataSrvc.getOnline(81).$promise.then(function (data) {
            $scope.CenterPlayers = data;
        });

        ArkDataSrvc.getOnline(82).$promise.then(function (data) {
            $scope.ScorchedEarthPlayers = data;
        });
    }

    if ($state.includes('details')) {
        projectsSrvc.getDetails($scope.projectGuid).$promise.then(function (data) {
            $scope.details = data;
        });
    }

    if ($state.includes('reserve')) {

        userDetailSrvc.getUserDetails($scope.userGuid).$promise.then(function (data) {
            $scope.userDetails = data;
        });

        $scope.postReservationRequest = function () {
            projectsSrvc.postReservationRequest((JSON.parse(JSON.stringify($scope.newReservationModel)))).then(function (data) {
                if (data) {
                    $state.go('default');
                }
            });
        }
    }

}]);