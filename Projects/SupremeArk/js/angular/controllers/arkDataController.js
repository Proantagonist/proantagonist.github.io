arkData.controller('arkDataController', ['$scope', '$stateParams', '$state', '$filter', 'ArkDataSrvc', function ($scope, $stateParams, $state, $filter, ArkDataSrvc) {

    if ($state.includes('default')) {
        ArkDataSrvc.getOnline(81).$promise.then(function (data) {
            $scope.CenterPlayers = data;
        });

        ArkDataSrvc.getOnline(82).$promise.then(function (data) {
            $scope.ScorchedEarthPlayers = data;
        });
    }

}]);