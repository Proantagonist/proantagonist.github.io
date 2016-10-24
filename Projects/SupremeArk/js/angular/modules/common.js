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

        getAllSurvivors: function (port) {
            var path = baseUrl + ':' + port + '/search?type=player&q=';
            var dictionary = ['a', 'e', 'i', 'o', 'u'];

            var survivors = [];

            for (i = 0; i < dictionary.length; i++) {

                var fullPath = path + dictionary[i];

                $.ajax({
                    url: fullPath,
                    async: false,
                    type: 'GET',
                    dataType: 'json',
                    error: function (data, textStatus, jqXHR) {
                        console.log(textStatus);
                    },
                    success: function (data, textStatus, jqXHR) {
                        for (j = 0; j < data.length; j++) {
                            if (!doesObjectExist(survivors, 'Id', data[j].Id)) {
                                survivors.push(data[j]);
                            }
                        }
                    }
                });
            }

            return survivors;
        }

        //        postDeleteProject: function (guid) { // Deletes project.
        //
        //            var path = baseUrl + 'Rest/USerServices/Projects/Delete/';
        //
        //            return $http({
        //                method: 'POST',
        //                url: path,
        //                params: data
        //            }).then(function (data) {
        //                if (data.data.Status == 'Success') {
        //                    notification("Project has been deleted.");
        //                } else {
        //                    notification(data.data.Status);
        //                }
        //            });
        //        }
    }
}]);