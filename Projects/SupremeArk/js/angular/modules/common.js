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

        getDetails: function (guid) {

            var path = baseUrl + 'Rest/Projects/GetDetails/';

            return $resource(path, {}, {
                query: {
                    method: 'GET',
                    params: {
                        guid: guid
                    }
                },
                isArray: true
            }).query();
        },

        getProjectDetailsAll: function (data) { //Returns all projects associated with a provided reservationl list object

            var path = baseUrl + 'Rest/Projects/GetDetails/';

            var projects = [];

            $.each(data, function (key, val) {
                $.ajax({
                    url: path,
                    async: false,
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        guid: val.ProjectGuid
                    },
                    error: function (data, textStatus, jqXHR) {
                        console.log(textStatus);
                    },
                    success: function (data, textStatus, jqXHR) {
                        projects.push(data);
                    }
                });
            });
            return projects;
        },

        postReservationRequest: function (data) {

            var path = baseUrl + 'Rest/UserServices/ReservationsStudent/Push/';

            return $http({
                method: 'POST',
                url: path,
                params: data
            }).then(function (data) {
                //                if (data.data.Status == 'Success') {
                if (data) { // Temporary Success. Email send error
                    notification("Successfully submitted reservation request.");
                    return true;
                } else {
                    notification(data.data.Status);
                }
            });
        },

        postAddProject: function (data) { // Adds project.

            var path = baseUrl + 'Rest/UserServices/Projects/Push/';

            return $http({
                method: 'POST',
                url: path,
                params: data
            }).then(function (data) {
                if (data.data.Status == 'Success') {
                    notification("Project has been created.");
                    return true;
                } else {
                    notification(data.data.Status);
                }
            });
        },

        postProjectDetails: function (data) { //Updates project details.

            var path = baseUrl + 'Rest/UserServices/Projects/Update/';

            return $http({
                method: 'POST',
                url: path,
                params: data
            }).then(function (data) {
                if (data.data.Status == 'Success') {
                    notification("Sucessfully updated project details.");
                    return true;
                } else {
                    notification(data.data.Status);
                }
            });
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

