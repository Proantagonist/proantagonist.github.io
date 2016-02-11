user.factory('userEvents', ['$http', function ($http) {
    return $http.get(baseUrl + 'Rest/UserServices/RSVPs/Get/')
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        })
}]);