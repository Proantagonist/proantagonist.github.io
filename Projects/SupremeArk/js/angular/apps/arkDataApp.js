var arkData = angular.module('arkDataApp', ['ui.router', 'angular.filter', 'ArkData']);

arkData.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('default', {
            url: '/',
            templateUrl: window.location.origin + '/mainPartial.html',
            controller: 'arkDataController'
        })

//    .state('reserve', {
//        url: '/reserveProject/:guid',
//        templateUrl: baseUrl + 'Projects/projectReservePartial.html',
//        controller: 'projectsController'
//    })

});