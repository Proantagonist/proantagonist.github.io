var arkData = angular.module('arkDataApp', ['ui.router', 'angular.filter', 'ArkData']);

arkData.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('default', {
        url: '/',
        templateUrl: window.location.origin + '/mainPartial.html',
        controller: 'arkDataController'
    })


    .state('maps', {
        url: '/maps',
        templateUrl: window.location.origin + '/maps/mapsPartial.html',
        controller: 'arkDataController'
    })


    .state('mods', {
        url: '/mods',
        templateUrl: window.location.origin + '/mods/modsPartial.html',
        controller: 'arkDataController'
    })

    .state('explorer', {
        url: '/explorer',
        templateUrl: window.location.origin + '/players-and-tribes/explorerPartial.html',
        controller: 'arkDataController'
    })
    
    .state('explorer.online', {
        url: '/online',
        templateUrl: window.location.origin + '/players-and-tribes/onlinePlayersPartial.html',
        controller: 'arkDataController'
    })
    
    .state('explorer.survivors', {
        url: '/survivors',
        templateUrl: window.location.origin + '/players-and-tribes/survivorsPartial.html',
        controller: 'arkDataController'
    })
    
    .state('explorer.tribes', {
        url: '/tribes',
        templateUrl: window.location.origin + '/players-and-tribes/tribesPartial.html',
        controller: 'arkDataController'
    })
    
    .state('explorer.search', {
        url: '/search',
        templateUrl: window.location.origin + '/players-and-tribes/searchPartial.html',
        controller: 'arkDataController'
    })

    //    .state('reserve', {
    //        url: '/reserveProject/:guid',
    //        templateUrl: baseUrl + 'Projects/projectReservePartial.html',
    //        controller: 'projectsController'
    //    })

});