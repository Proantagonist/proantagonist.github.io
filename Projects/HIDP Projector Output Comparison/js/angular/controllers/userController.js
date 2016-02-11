user.controller('userController', ['$scope', 'userEvents', 'profClassSrvc', 'userClassSrvc', function ($scope, userEvents, profClassSrvc, userClassSrvc) {

    userEvents.success(function (data) {
        $scope.userEvents = data.items;
    });

    profClassSrvc.then(function (data) {
        $scope.classes = data;
    });

    userClassSrvc.then(function (data) {
        $scope.userClasses = data;

        $.each($scope.userClasses, function (key, val) {
            $('.content-block').find('div.row[guid="' + val.ClassGuid + '"] input').prop('checked', true);
        });

    });

}]);