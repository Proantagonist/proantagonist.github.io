app.factory('tags',['$http', function($http){
	return $http.get(location.protocol + '//' + location.hostname + baseUrl + '/Rest/Tags/Get/')
  	.success(function(data){
  		return data;
  	})
  	.error(function(err){
  		return err;
  	});
  
}]);