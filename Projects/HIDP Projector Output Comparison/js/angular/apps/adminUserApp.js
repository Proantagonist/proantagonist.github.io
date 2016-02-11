var adminUser = angular.module('adminUserApp', ['angular-loading-bar', 'userList', 'userDetail', 'administration', 'ui.bootstrap', 'ui.router', 'angular.filter']);

adminUser.config(function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider){
    
     cfpLoadingBarProvider.includeSpinner = false;
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    
    .state('otherwise', {
        url: '/',
        templateUrl: baseUrl + 'js/angular/partials/userList.html', 
        controller: 'adminUserController'
    })
    
    .state('details', {
        url: '/details?guid=',
        templateUrl: baseUrl + 'js/angular/partials/userDetails.html',
        controller: 'adminUserDetailsController'
    });
    
});