adminUser.controller('adminUserDetailsController', ['$scope', '$state', '$stateParams', 'userDetailSrvc', 'administrationSrvc', function ($scope, $state, $stateParams, userDetailSrvc, administrationSrvc) {

    $scope.guid = $stateParams.guid;

    $scope.userData = userDetailSrvc.getUserDetails($scope.guid);
    $scope.roles = administrationSrvc.getRoles();
    $scope.levels = administrationSrvc.getLevels();

    $scope.userData.$promise.then(function (data) {
        $scope.isActive = data.Active;
    });

    $scope.roles.$promise.then(function (data) {
        $scope.rolesList = data.items;
        $scope.userRoles = administrationSrvc.getUserRoles($scope.guid);

        $scope.userRoles.$promise.then(function () {

            $scope.test = function (item) {

                for (i = 0; i < $scope.userRoles.items.length; i++) {
                    var test = _.find($scope.rolesList, function (truth) {
                        return $scope.userRoles.items[i].Id == item.Id;
                    });

                    if (test !== undefined) {
                        return true;
                        break;
                    };
                };
            };

        });
    });

    $scope.setModel = function (data) {

        var objectArray = $scope.userRoles.items; // Parent data model (object array).
        var comparator = "Id"; // Property to make comparisons by.

        if (objectArray.length > 0) { // if object array is not empty begin testing.

            function test(input) { // Will return integer if rule is passed, else undefined.
                for (i = 0; i < objectArray.length; i++) { // Do for the number of current objects in the array.
                    if (objectArray[i][comparator] === input[comparator]) { // Do IF comparator property of the ith object in the array matches the comparator of the supplied object.
                        var index = i; // Store the index of the object in the parent data model that passed the above rule.
                        break; // Immediately leave for loop if match has been found.
                    }
                };
                return index; // Return the index.
            }

            var result = test(data); // Get index value of object bound to the clicked input in object array.

            if (result == undefined) { // if index is not undefined, the current object DOES NOT exist in the model so ADD.
                objectArray.push(data);
            };

            if (result !== undefined) { //if test is no undefined and returns integer, current object DOES exist in model so REMOVE.
                objectArray.splice(result, 1);
            };

        } else if (!objectArray.length > 0) { // if userRoles is empty, add the first role.
            objectArray.push(data);
        };

    };

    $scope.levels.$promise.then(function (data) {
        $scope.levelsList = data.items;
        $scope.userLevel = administrationSrvc.getUserLevel($scope.guid);

    });

            }]);