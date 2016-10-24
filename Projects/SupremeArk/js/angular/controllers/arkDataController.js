arkData.controller('arkDataController', ['$scope', '$stateParams', '$state', '$filter', 'ArkDataSrvc', function ($scope, $stateParams, $state, $filter, ArkDataSrvc) {

    if ($state.includes('explorer.online')) {
        ArkDataSrvc.getOnline(81).$promise.then(function (data) {
            $scope.CenterPlayers = data;
        });

        ArkDataSrvc.getOnline(82).$promise.then(function (data) {
            $scope.ScorchedEarthPlayers = data;
        });
    }

    if ($state.includes('explorer.survivors')) {
        $scope.centerSurvivors = ArkDataSrvc.getAllSurvivors(81);
        $scope.scorchedEarthSurvivors = ArkDataSrvc.getAllSurvivors(82);
    }

}]);