app.factory('events',['$http', function($http){
    
    userGuid = $('#ctl00_ContentPlaceHolderBody_txtUserGuid').attr('value');
    
	return $http.get(location.protocol + '//' + location.hostname + baseUrl + '/Rest/Events/Get/?season=2015&userGuid=' + userGuid)
  	.success(function(data){
  		return data;
  	})
  	.error(function(err){
  		return err;
  	});
  
}]);