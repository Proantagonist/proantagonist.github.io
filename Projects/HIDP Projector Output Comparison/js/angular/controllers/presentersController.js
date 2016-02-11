presenters.controller('presentersController', ['$scope', 'presenters', function ($scope, presenters) {
    presenters.success(function (data) {
        $scope.presenters = data.items;
    })

}]);