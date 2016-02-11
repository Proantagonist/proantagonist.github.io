presenters.factory('presenters', ['$http', function ($http) {
    return $http.get(baseUrl + 'json/presenters.json')
        .success(function (data) {
            return data;
        })
        .error(function (err) {
            return err;
        })
}]);