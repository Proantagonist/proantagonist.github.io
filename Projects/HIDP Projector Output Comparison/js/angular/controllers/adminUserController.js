adminUser.controller('adminUserController', ['$scope', '$filter', '$timeout', 'userListSrvc', function ($scope, $filter, $timeout, userListSrvc) {

    userListSrvc.then(function (data) {

        $scope.users = data.items;

        //************** SETUP **************

        $scope.filterKeys = ['Added', 'FirstName', 'LastName', 'Email']; // Filter library. Update with desired searchable properties
        $scope.currentPage = 1; // Sets the pagination page index
        $scope.numPerPage = 10; // Number of results per page
        $scope.maxSize = 5; // Number of selectable pages

        //************** END SETUP **************

        $scope.totalSize; // Total size of data set
        $scope.searchTerm = ''; // Filter term from the input on the HTML
        $scope.searchItems = []; // Array becomes populated when searchTerm is present
        $scope.reverse = false; // Defines whether column is sorted in reverse
        var timer;

        $scope.$watch('currentPage + numPerPage', function () {
            $scope.paginator();
        });

        $scope.$watch('searchTerm', function () {
            
            $timeout.cancel(timer);
            
            timer = $timeout(function () {
                if (!$scope.searchTerm == '') {
                    $scope.searchItems = [];

                    for (var i = 0; i < $scope.users.length; i++) {

                        var propertyValueString = "";

                        for (var e = 0; e < $scope.filterKeys.length; e++) {

                            var property = $scope.filterKeys[e];

                            propertyValueString += $scope.users[i][property].toLowerCase() + " ";
                        }

                        if (propertyValueString.includes($scope.searchTerm.toLowerCase())) {
                            $scope.searchItems.push($scope.users[i]);
                        }
                    }

                    $scope.paginator(true);
                } else {
                    $scope.searchItems = [];
                    $scope.paginator();
                }
            }, 350); //Timeout to prevent searching after every single keystroke
        });

        $scope.paginator = function (hasList) {
            if (hasList || $scope.searchItems.length > 0) {
                $scope.totalSize = $scope.searchItems.length;

                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;

                $scope.dataChunk = $scope.searchItems.slice(begin, end);

            } else {
                $scope.totalSize = $scope.users.length;

                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;

                $scope.dataChunk = $scope.users.slice(begin, end);
            }
        }

        $scope.resetAll = function () {
            $scope.Header = ['', '', ''];
        }

        $scope.sort = function (sortBy) {
            $scope.resetAll();

            $scope.columnToOrder = sortBy;

            if (!$scope.searchTerm == '') {
                //$Filter - Standard Service
                // If there are items in searchItems, indicates there is a searchTerm present. Sort only searchItems
                $scope.searchItems = $filter('orderBy')($scope.searchItems, $scope.columnToOrder, $scope.reverse);
            } else {
                //$Filter - Standard Service
                // If there no items in searchItems, there is no searchTerm present. Sort entire user data set
                $scope.users = $filter('orderBy')($scope.users, $scope.columnToOrder, $scope.reverse);
            }

            if ($scope.reverse)
                iconName = 'fa fa-arrow-up';
            else
                iconName = 'fa fa-arrow-down';

            if (sortBy === 'Added') {
                $scope.Header[0] = iconName;
            } else if (sortBy === 'LastName') {
                $scope.Header[1] = iconName;
            } else {
                $scope.Header[2] = iconName;
            }

            $scope.reverse = !$scope.reverse;

            $scope.paginator();
        };

        $scope.sort('LastName'); // Default sorting method

    });

}]);