//Angular module with methods relating to project listings not bound by userGuid

var baseUrl = 'http://www.supremeark.com';

angular.module('ArkData', ['ngResource']).factory('ArkDataSrvc', ['$http', '$resource', function ($http, $resource) {

    return {

        getOnline: function (port) {
            var path = baseUrl + ':' + port + '/online';

            return $resource(path, {}, {
                query: {
                    method: 'GET',
                    isArray: true
                },
                isArray: true
            }).query();
        },

        postDeleteProject: function (guid) { // Deletes project.

            var path = baseUrl + 'Rest/USerServices/Projects/Delete/';

            return $http({
                method: 'POST',
                url: path,
                params: data
            }).then(function (data) {
                if (data.data.Status == 'Success') {
                    notification("Project has been deleted.");
                } else {
                    notification(data.data.Status);
                }
            });
        }
    }
}]);

