//Returns all classes and their respective proessors, for professors who have added classes for this season
angular.module('profClass', []).factory('profClassSrvc', ['$http', function ($http) {

    return $http.get(baseUrl + 'Rest/Professors/GetBySeason/')
        .then(function (data) {
            var classData = [];
            $.each(data.data.items, function (i, item) {

                var classLink = baseUrl + 'Rest/Classes/GetForProfessor/?Guid=' + item.UserGuid;
                var userClassLink = baseUrl + 'Rest/UserServices/GetClasses/?professorGuid=' + item.UserGuid;

                //non-async ajax call.
                $.ajax({
                    url: classLink,
                    async: false,
                    type: 'GET',
                    dataType: 'json',
                    error: function (data, textStatus, jqXHR) {
                        console.log(textStatus);
                    },
                    success: function (data, textStatus, jqXHR) {
                        $.each(data.items, function (key, val) {
                            classData.push(val);
                        });
                    }
                });

            });

            return classData;
        }, function (data) {
            notification('Error ' + data.status + ' : ' + data.statusText)
            return err;
        })
}]);

//Returns all classes which the user is registered to
angular.module('userClasses', []).factory('userClassSrvc', ['$http', function ($http) {

    return $http.get(baseUrl + 'Rest/Professors/Get/')
        .then(function (data) {
            var userClasses = [];
            $.each(data.data.items, function (i, item) {

                var userClassLink = baseUrl + 'Rest/UserServices/GetClasses/?professorGuid=' + item.UserGuid;

                //non-async ajax call.
                $.ajax({
                    url: userClassLink,
                    async: false,
                    type: 'GET',
                    dataType: 'json',
                    error: function (data, textStatus, jqXHR) {
                        console.log(textStatus);
                    },
                    success: function (data, textStatus, jqXHR) {
                        $.each(data.items, function (key, val) {
                            if (data) {
                                userClasses.push(val);
                            }
                        });
                    }
                });
            });

            return userClasses;

        }, function (data) {
            notification('Error ' + data.status + ' : ' + data.statusText)
            return err;
        })
}]);

//Returns sessions user is RSVP'd to
angular.module('userRSVP', []).factory('userRSVPsrvc', ['$http', function ($http) {

    return $http.get(baseUrl + 'Rest/UserServices/RSVPs/Get/')
        .then(function (data) {

            return data.data;

        }, function (data) {
            notification('Error ' + data.status + ' : ' + data.statusText)
        })
}]);

//Returns a list of all the users basic tabular data
angular.module('userList', []).factory('userListSrvc', ['$http', function ($http) {

    return $http.get(baseUrl + 'Rest/Admin/Users/Get/')
        .then(function (data) {

            return data.data;

        }, function (data) {
            notification('Error ' + data.status + ' : ' + data.statusText)
        })
}]);

//User details service factory
angular.module('userDetail', ['ngResource']).factory('userDetailSrvc', ['$http', '$resource', function ($http, $resource) {

    return {
        getUserDetails: function (guid) {

            var path = baseUrl + 'Rest/Admin/Users/GetDetails/Default.aspx';

            return $resource(path, {}, {
                query: {
                    method: 'GET',
                    params: {
                        guid: guid
                    }
                },
                isArray: true
            }).query();
        }
    }
}]);

//Returns administration roles
angular.module('administration', ['ngResource']).factory('administrationSrvc', ['$http', '$resource', function ($http, $resource) {

    return {
        getRoles: function () {

            var path = baseUrl + 'Rest/Admin/Roles/Get/';

            return $resource(path, {}, {
                query: {
                    method: 'GET'
                },
                isArray: true
            }).query();
        },

        getLevels: function () {

            var path = baseUrl + 'Rest/Admin/Levels/Get';

            return $resource(path, {}, {
                query: {
                    method: 'GET'
                },
                isArray: true
            }).query();
        },

        getUserLevel: function (guid) {

            var path = baseUrl + 'Rest/Admin/Users/GetUserLevel/';

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
        
        getUserRoles: function (guid) {

            var path = baseUrl + 'Rest/Admin/Users/GetRoles/';

            return $resource(path, {}, {
                query: {
                    method: 'GET',
                    params: {
                        guid: guid
                    }
                },
                isArray: true
            }).query();
        }
    }

}]);