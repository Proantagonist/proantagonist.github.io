angular.module('projectorList', ['ngResource']).factory('projectorListSrvc', ['$http', '$resource', function ($http, $resource) {

    return {

        getProjectorList: function () {

            var path = '../projectorList.json';

            return $resource(path, {}, {
                query: {
                    method: 'GET'
                },
                isArray: true
            }).query();
        }

    }
}]);